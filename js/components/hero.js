/**
 * ============================================
 *  HERO COMPONENT
 * ============================================
 *  Central tarot card with floating animation,
 *  mouse-tracking light effect, and click-to-open.
 * ============================================
 */

var TarotHero = {

  init: function () {
    var heroCard = document.getElementById('hero-card');
    var heroSection = document.getElementById('hero');

    if (!heroCard || !heroSection) return;

    // ── Set hero card image from first card ──
    if (TarotData.cards.length > 0) {
      var firstCard = TarotData.cards[0];
      var img = heroCard.querySelector('.hero-card__image');
      if (img) {
        img.src = firstCard.uprightImage;
        img.alt = firstCard.name;
        img.addEventListener('load', function () {
          img.style.opacity = '1';
        });
      }
    }

    // ── Mouse tracking for subtle light effect ──
    var cardWrapper = heroCard.closest('.hero__card-wrapper');
    if (cardWrapper) {
      heroSection.addEventListener('mousemove', function (e) {
        var rect = cardWrapper.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width) * 100;
        var y = ((e.clientY - rect.top) / rect.height) * 100;
        heroCard.style.setProperty('--mouse-x', x + '%');
        heroCard.style.setProperty('--mouse-y', y + '%');
      });

      // ── Click hero card → open detail view ──
      cardWrapper.addEventListener('click', function () {
        if (typeof TarotDetail !== 'undefined') {
          TarotDetail.open(0, cardWrapper);
        }
      });
    }
  }
};
