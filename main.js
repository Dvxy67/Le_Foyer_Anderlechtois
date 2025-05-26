// Theme and language switcher

document.addEventListener('DOMContentLoaded', () => {
  const themeSwitch = document.getElementById('theme-switch');
  const langSwitch = document.getElementById('lang-switch');

  // Apply stored theme
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }

  themeSwitch && themeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
  });

  const translations = {
    fr: {
      nav_home: 'Accueil',
      nav_candidate: 'Je suis candidat',
      nav_inhabitant: 'Je suis habitant',
      nav_about: 'À propos',
      nav_contact: 'Contact',
      nav_districts: 'Nos quartiers'
    },
    en: {
      nav_home: 'Home',
      nav_candidate: 'Applicant',
      nav_inhabitant: 'Resident',
      nav_about: 'About',
      nav_contact: 'Contact',
      nav_districts: 'Districts'
    }
  };

  function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
    document.documentElement.lang = lang;
    if (langSwitch) {
      langSwitch.textContent = lang === 'fr' ? 'EN' : 'FR';
    }
    localStorage.setItem('lang', lang);
  }

  let currentLang = localStorage.getItem('lang') || 'fr';
  applyTranslations(currentLang);

  langSwitch && langSwitch.addEventListener('click', () => {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    applyTranslations(currentLang);
  });
});
