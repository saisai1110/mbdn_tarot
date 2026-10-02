/**
 * ============================================
 *  HEADER COMPONENT
 * ============================================
 *  Minimal header with scroll-triggered blur.
 *  Links: GALLERY (scroll), ABOUT (scroll).
 * ============================================
 */

var TarotHeader = {

  init: function () {
    var header = document.getElementById('site-header');
    if (!header) return;

    // ── Scroll effect: add blur background ──
    var ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          if (window.scrollY > 60) {
            header.classList.add('site-header--scrolled');
          } else {
            header.classList.remove('site-header--scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    });

    // ── Navigation links ──
    var galleryLink = document.getElementById('nav-gallery');
    if (galleryLink) {
      galleryLink.addEventListener('click', function (e) {
        e.preventDefault();
        var gallery = document.getElementById('gallery');
        if (gallery) {
          gallery.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    var aboutLink = document.getElementById('nav-about');
    if (aboutLink) {
      aboutLink.addEventListener('click', function (e) {
        e.preventDefault();
        var about = document.getElementById('about');
        if (about) {
          about.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // ── Logo click → scroll to top ──
    var logo = document.getElementById('header-logo');
    if (logo) {
      logo.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }
};
