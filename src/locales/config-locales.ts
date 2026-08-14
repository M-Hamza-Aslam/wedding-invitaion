export const fallbackLng = 'en';
export const languages = ['id', 'en'];
export const defaultNS = 'common';
export const cookieName = 'i18next';

// ----------------------------------------------------------------------

export function i18nOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    lng,
    fallbackLng,
    ns,
    defaultNS,
    fallbackNS: defaultNS,
    supportedLngs: languages,
    // React already escapes interpolated values when rendering JSX text,
    // so i18next's own HTML-escaping (which turns "&" into "&amp;") would
    // otherwise double-encode and show up literally in the UI.
    interpolation: { escapeValue: false },
  };
}

// ----------------------------------------------------------------------

export const changeLangMessages = {
  id: {
    success: 'Bahasa telah diubah!',
    error: 'Kesalahan saat mengubah bahasa!',
    loading: 'Memuat...',
  },
  en: {
    success: 'Language has been changed!',
    error: 'Error changing language!',
    loading: 'Loading...',
  },
};
