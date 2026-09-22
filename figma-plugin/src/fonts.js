export const fontState = {
  family: 'Inter',
  styles: { Regular: 'Regular', Medium: 'Medium', SemiBold: 'SemiBold', Bold: 'Bold' },
};

async function tryLoad(family, style) {
  try {
    await figma.loadFontAsync({ family, style });
    return true;
  } catch (e) {
    return false;
  }
}

export async function loadFonts() {
  const families = ['Inter', 'Roboto'];
  const wanted = ['Regular', 'Medium', 'SemiBold', 'Bold'];
  let chosen = null;
  let available = [];

  for (const family of families) {
    const loaded = [];
    for (const style of wanted) {
      if (await tryLoad(family, style)) loaded.push(style);
    }
    if (loaded.includes('Regular')) {
      chosen = family;
      available = loaded;
      break;
    }
  }

  if (!chosen) {
    chosen = 'Inter';
    await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
    available = ['Regular'];
  }

  const pick = (preferred) => {
    if (available.includes(preferred)) return preferred;
    if (preferred === 'Bold' && available.includes('SemiBold')) return 'SemiBold';
    if (preferred === 'SemiBold' && available.includes('Medium')) return 'Medium';
    return available[0];
  };

  fontState.family = chosen;
  fontState.styles = {
    Regular: pick('Regular'),
    Medium: pick('Medium'),
    SemiBold: pick('SemiBold'),
    Bold: pick('Bold'),
  };
}
