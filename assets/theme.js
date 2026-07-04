/* theme.js — dark/light mode. Loaded in <head> (synchronously, before paint)
   so the saved theme applies with no flash. Preference cached in localStorage;
   first visit follows the OS setting. */
(function () {
  var KEY = 'jhub.theme';
  var t = null;
  try { t = localStorage.getItem(KEY); } catch (e) {}
  if (t !== 'dark' && t !== 'light') {
    t = (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }
  document.documentElement.dataset.theme = t;

  function paintBtns() {
    document.querySelectorAll('.theme-toggle').forEach(function (b) {
      b.textContent = t === 'dark' ? '☀️' : '🌙';
      b.title = t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      b.setAttribute('aria-label', b.title);
    });
  }
  function apply(nt) {
    t = nt;
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem(KEY, t); } catch (e) {}
    paintBtns();
  }

  document.addEventListener('DOMContentLoaded', function () {
    var nav = document.querySelector('.topnav-inner');
    if (!nav) return;
    var btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.type = 'button';
    btn.addEventListener('click', function () { apply(t === 'dark' ? 'light' : 'dark'); });
    // sits right before the Anki pill at the end of the nav
    nav.insertBefore(btn, document.getElementById('migContainer'));
    paintBtns();
  });
})();
