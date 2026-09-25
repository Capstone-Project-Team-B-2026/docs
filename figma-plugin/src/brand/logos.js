/**
 * Brand logo helpers for Figma plugin.
 * Fetches PNGs from the public docs mirror (after push to main).
 */
export const LOGO_URLS = {
  web: 'https://raw.githubusercontent.com/Capstone-Project-Team-B-2026/docs/main/static/img/brand/logo-web.png',
  webTransparent:
    'https://raw.githubusercontent.com/Capstone-Project-Team-B-2026/docs/main/static/img/brand/logo-web-transparent.png',
  mobileLight:
    'https://raw.githubusercontent.com/Capstone-Project-Team-B-2026/docs/main/static/img/brand/logo-mobile-light.png',
  mobileDark:
    'https://raw.githubusercontent.com/Capstone-Project-Team-B-2026/docs/main/static/img/brand/logo-mobile-dark.png',
  mark: 'https://raw.githubusercontent.com/Capstone-Project-Team-B-2026/docs/main/static/img/brand/logo-mark.png',
};

/**
 * @param {string} url
 * @returns {Promise<string|null>} imageHash
 */
export async function createImageHashFromUrl(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buf = new Uint8Array(await res.arrayBuffer());
    const image = figma.createImage(buf);
    return image.hash;
  } catch (e) {
    console.warn('logo fetch failed', url, e);
    return null;
  }
}

/**
 * @param {string} name
 * @param {number} w
 * @param {number} h
 * @param {string|null} hash
 * @param {{r:number,g:number,b:number}} fallbackFill
 */
export function imageOrRect(name, w, h, hash, fallbackFill) {
  const node = figma.createRectangle();
  node.name = name;
  node.resize(w, h);
  node.cornerRadius = Math.min(16, w * 0.12);
  if (hash) {
    node.fills = [{ type: 'IMAGE', scaleMode: 'FIT', imageHash: hash }];
  } else {
    node.fills = [{ type: 'SOLID', color: fallbackFill }];
  }
  return node;
}
