/**
 * ============================================
 *  TAROT EXHIBITION — Main Application
 * ============================================
 *  Initializes all components after DOM ready.
 * ============================================
 */

(function () {

  function init() {
    TarotHeader.init();
    TarotHero.init();
    TarotGallery.init();
    TarotDetail.init();
    TarotFooter.init();
    TarotAnimations.initScrollReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
