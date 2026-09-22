import { layoutProgressBars } from './ui/primitives.js';
import { generateTokens, generateMetricsBoard } from './screens/tokens-board.js';
import {
  generateMobileAuthHome,
  generateMobileAttendance,
  generateMobileLeaveOtProfile,
} from './screens/mobile/auth-attendance-leave.js';
import { generateWebAll } from './screens/web/dashboard-admin.js';
import { MOBILE_SCREENS, WEB_SCREENS, ALL_SCREEN_IDS } from './catalog/ids.js';

const MOBILE_COL_W = 420;
const WEB_COL_W = 1320;
const COLS_MOBILE = 6;
const COLS_WEB = 2;
const ROW_GUTTER = 64;
const SECTION_GAP = 200;

function makePositions(startY) {
  let mIndex = 0;
  let wIndex = 0;

  let mobileY = startY;
  let mobileCol = 0;
  let mobileRowMaxH = 0;
  let mobileFinished = false;

  let webY = startY;
  let webCol = 0;
  let webRowMaxH = 0;

  function advanceMobileRow() {
    if (mobileCol === 0 && mobileRowMaxH === 0) return;
    mobileY += mobileRowMaxH + ROW_GUTTER;
    mobileCol = 0;
    mobileRowMaxH = 0;
  }

  function advanceWebRow() {
    if (webCol === 0 && webRowMaxH === 0) return;
    webY += webRowMaxH + ROW_GUTTER;
    webCol = 0;
    webRowMaxH = 0;
  }

  return {
    placeMobile(wrap) {
      wrap.x = mobileCol * MOBILE_COL_W;
      wrap.y = mobileY;
      const h = Math.max(wrap.height || 0, 1);
      mobileRowMaxH = Math.max(mobileRowMaxH, h);
      mobileCol += 1;
      mIndex += 1;
      if (mobileCol >= COLS_MOBILE) advanceMobileRow();
    },
    placeWeb(wrap) {
      if (!mobileFinished) this.finishMobile();
      wrap.x = webCol * WEB_COL_W;
      wrap.y = webY;
      const h = Math.max(wrap.height || 0, 1);
      webRowMaxH = Math.max(webRowMaxH, h);
      webCol += 1;
      wIndex += 1;
      if (webCol >= COLS_WEB) advanceWebRow();
    },
    finishMobile() {
      if (mobileFinished) return;
      advanceMobileRow();
      webY = mobileY + SECTION_GAP;
      webCol = 0;
      webRowMaxH = 0;
      mobileFinished = true;
    },
    counts() {
      return { mobile: mIndex, web: wIndex };
    },
  };
}

function clearGenerated(page) {
  const doomed = page.children.filter((n) => {
    const name = n.name || '';
    return (
      name.startsWith('DS ·') ||
      name.startsWith('PRD ·') ||
      name.startsWith('M-') ||
      name.startsWith('W-') ||
      name.startsWith('Design Tokens') ||
      name.startsWith('Mobile ·') ||
      name.startsWith('Web ·')
    );
  });
  doomed.forEach((n) => n.remove());
}

export function findCanvasOverlaps(nodes, gutter) {
  const g = gutter == null ? 0 : gutter;
  const frames = nodes.filter((n) => n && typeof n.x === 'number');
  const hits = [];
  for (let i = 0; i < frames.length; i++) {
    for (let j = i + 1; j < frames.length; j++) {
      const a = frames[i];
      const b = frames[j];
      const ax2 = a.x + a.width;
      const ay2 = a.y + a.height;
      const bx2 = b.x + b.width;
      const by2 = b.y + b.height;
      const overlapX = a.x < bx2 + g && b.x < ax2 + g;
      const overlapY = a.y < by2 + g && b.y < ay2 + g;
      if (overlapX && overlapY) hits.push([a.name, b.name]);
    }
  }
  return hits;
}

export async function generate(page, scope) {
  clearGenerated(page);

  let boardsBottom = 0;
  if (scope === 'all' || scope === 'tokens' || scope === 'components') {
    const tokens = await generateTokens(page, 0, 0);
    const metrics = await generateMetricsBoard(page, 1520, 0);
    boardsBottom = Math.max(tokens.height || 0, metrics.height || 0) + SECTION_GAP;
  }

  if (scope === 'tokens') {
    layoutProgressBars(page);
    return {
      mobile: 0,
      web: 0,
      totalIds: ALL_SCREEN_IDS.length,
      overlapMobile: 0,
      overlapWeb: 0,
    };
  }

  const positions = makePositions(boardsBottom || 0);
  const mobileWraps = [];
  const webWraps = [];

  const basePlaceMobile = positions.placeMobile.bind(positions);
  const basePlaceWeb = positions.placeWeb.bind(positions);
  positions.placeMobile = (wrap) => {
    basePlaceMobile(wrap);
    mobileWraps.push(wrap);
  };
  positions.placeWeb = (wrap) => {
    basePlaceWeb(wrap);
    webWraps.push(wrap);
  };

  if (scope === 'all' || scope === 'mobile' || scope === 'components') {
    generateMobileAuthHome(page, positions);
    generateMobileAttendance(page, positions);
    generateMobileLeaveOtProfile(page, positions);
    positions.finishMobile();
  } else {
    positions.finishMobile();
  }

  if (scope === 'all' || scope === 'web' || scope === 'components') {
    generateWebAll(page, positions);
  }

  layoutProgressBars(page);

  const counts = positions.counts();
  const expectedMobile = scope === 'web' || scope === 'tokens' ? 0 : MOBILE_SCREENS.length;
  const expectedWeb = scope === 'mobile' || scope === 'tokens' ? 0 : WEB_SCREENS.length;

  if (scope === 'all' || scope === 'components') {
    if (counts.mobile !== MOBILE_SCREENS.length) {
      throw new Error('Mobile screen count mismatch: got ' + counts.mobile + ' expected ' + MOBILE_SCREENS.length);
    }
    if (counts.web !== WEB_SCREENS.length) {
      throw new Error('Web screen count mismatch: got ' + counts.web + ' expected ' + WEB_SCREENS.length);
    }
  } else if (scope === 'mobile' && counts.mobile !== expectedMobile) {
    throw new Error('Mobile screen count mismatch: got ' + counts.mobile + ' expected ' + expectedMobile);
  } else if (scope === 'web' && counts.web !== expectedWeb) {
    throw new Error('Web screen count mismatch: got ' + counts.web + ' expected ' + expectedWeb);
  }

  const mobileHits = findCanvasOverlaps(mobileWraps, 0);
  const webHits = findCanvasOverlaps(webWraps, 0);
  if (mobileHits.length || webHits.length) {
    const sample = (mobileHits[0] || webHits[0]).join(' ∩ ');
    throw new Error(
      'Canvas overlap detected: ' +
        sample +
        ' (mobile=' +
        mobileHits.length +
        ', web=' +
        webHits.length +
        ')'
    );
  }

  return {
    mobile: counts.mobile,
    web: counts.web,
    totalIds: ALL_SCREEN_IDS.length,
    overlapMobile: mobileHits.length,
    overlapWeb: webHits.length,
  };
}
