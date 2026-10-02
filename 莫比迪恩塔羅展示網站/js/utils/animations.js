/**
 * ============================================
 *  ANIMATION UTILITIES
 * ============================================
 *  Shared animation helpers for text fade,
 *  section reveal, and transitions.
 * ============================================
 */

var TarotAnimations = {

  /**
   * Fade out an element (opacity → 0, translateY → 8px)
   * @param {HTMLElement} element
   * @param {Function} callback — called after fade-out completes
   */
  fadeOutText: function (element, callback) {
    if (!element) return;
    element.style.transition = 'opacity 180ms ease-out, transform 180ms ease-out';
    element.style.opacity = '0';
    element.style.transform = 'translateY(8px)';
    setTimeout(function () {
      if (callback) callback();
    }, 190);
  },

  /**
   * Fade in an element (opacity 0 → 1, translateY -8px → 0)
   * @param {HTMLElement} element
   */
  fadeInText: function (element) {
    if (!element) return;
    element.style.transition = 'none';
    element.style.opacity = '0';
    element.style.transform = 'translateY(-8px)';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        element.style.transition = 'opacity 280ms ease-out, transform 280ms ease-out';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      });
    });
  },

  /**
   * Observe sections for scroll-triggered fade-in
   * Uses IntersectionObserver to add 'visible' class
   */
  initScrollReveal: function () {
    var sections = document.querySelectorAll('.gallery, .about');

    if (!('IntersectionObserver' in window)) {
      // Fallback: show everything immediately
      sections.forEach(function (s) { s.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    sections.forEach(function (s) {
      observer.observe(s);
    });
  }
};
