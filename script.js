const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => observer.observe(el));

const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const mql = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeToggle?.setAttribute('aria-pressed', String(theme === 'dark'));
}

themeToggle?.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try {
    localStorage.setItem('theme', next);
  } catch (e) {}
});

mql.addEventListener?.('change', (e) => {
  try {
    if (localStorage.getItem('theme')) return;
  } catch (err) {}
  applyTheme(e.matches ? 'dark' : 'light');
});

applyTheme(root.getAttribute('data-theme') || 'light');
