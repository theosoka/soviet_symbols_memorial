// Language switcher
// de.js and en.js must be loaded before this script

const langs = { de, en };
let currentLang = 'de';

function applyLang(lang) {
  const strings = langs[lang];
  if (!strings) return;

  currentLang = lang;
  document.documentElement.lang = lang;

  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (strings[key] !== undefined) {
      el.textContent = strings[key];
    }
  });

  // Update page title
  if (strings.page_title) {
    document.title = strings.page_title;
  }

  // Update active button state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update photo hover captions for the active language
  applyPhotoCaptions(lang);

  // Persist choice
  try { localStorage.setItem('lang', lang); } catch(e) {}
}

// Photo grid hover captions — reads data-caption-de / data-caption-en from each cell
function applyPhotoCaptions(lang) {
  document.querySelectorAll('.photo-cell').forEach(cell => {
    const caption = cell.getAttribute('data-caption-' + lang)
                 || cell.getAttribute('data-caption-de')
                 || '';
    const source  = cell.getAttribute('data-source') || '';
    const textEl  = cell.querySelector('.photo-hover-text');
    const srcEl   = cell.querySelector('.photo-hover-source');
    if (textEl) textEl.textContent = caption;
    if (srcEl)  srcEl.textContent  = source ? '\u00a9 ' + source : '';
  });
}

// Wire up language buttons
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

// Load saved language or default to 'de'
(function init() {
  let saved = 'de';
  try { saved = localStorage.getItem('lang') || 'de'; } catch(e) {}
  applyLang(saved);
})();