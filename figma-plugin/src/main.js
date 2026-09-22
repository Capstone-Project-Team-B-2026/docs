import { loadFonts } from './fonts.js';
import { generate } from './generate.js';

figma.showUI(__html__, { width: 340, height: 400 });

figma.ui.onmessage = async (msg) => {
  if (!msg || msg.type !== 'generate') return;
  figma.ui.postMessage({ status: 'Menggambar ulang dari docs v0.1…' });

  try {
    await loadFonts();
    const page = figma.currentPage;
    page.name = 'Nexus Ops — Screens v0.1';
    const result = await generate(page, msg.scope);
    const nodes = page.children.slice(-Math.min(12, page.children.length));
    if (nodes.length) figma.viewport.scrollAndZoomIntoView(nodes);
    figma.ui.postMessage({
      status:
        'Selesai. ' +
        result.mobile +
        ' M-* + ' +
        result.web +
        ' W-* (katalog ' +
        result.totalIds +
        '). Overlaps=' +
        (result.overlapMobile + result.overlapWeb) +
        '.',
    });
  } catch (e) {
    figma.ui.postMessage({ status: 'Error: ' + (e.message || String(e)) });
    console.error(e);
  }
};
