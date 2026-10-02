/**
 * ============================================
 *  GALLERY COMPONENT
 * ============================================
 *  Responsive grid of tarot cards.
 *  Each card has hover effects and click-to-detail.
 * ============================================
 */

var TarotGallery = {

  init: function () {
    var grid = document.getElementById('gallery-grid');
    if (!grid) return;

    TarotData.cards.forEach(function (card, index) {
      var cardEl = TarotGallery.createCard(card, index);
      grid.appendChild(cardEl);
    });
  },

  /**
   * Creates a gallery card DOM element
   */
  createCard: function (card, index) {
    var el = document.createElement('article');
    el.className = 'gallery-card';
    el.setAttribute('data-index', index);
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-label', 'View ' + card.name);
    el.id = 'gallery-card-' + card.id;

    el.innerHTML =
      '<div class="gallery-card__image-wrapper">' +
        '<img class="gallery-card__image" ' +
          'src="' + card.uprightImage + '" ' +
          'alt="' + card.name + '" ' +
          'loading="lazy" />' +
        '<div class="gallery-card__cursor-hint">VIEW</div>' +
      '</div>' +
      '<div class="gallery-card__info">' +
        '<span class="gallery-card__number">' + card.number + '</span>' +
        '<h3 class="gallery-card__name">' + card.name + '</h3>' +
        '<span class="gallery-card__status">UPRIGHT</span>' +
      '</div>';

    // ── Image load fade-in ──
    var img = el.querySelector('.gallery-card__image');
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', function () {
        img.classList.add('loaded');
      });
    }

    // ── Click → open detail ──
    el.addEventListener('click', function () {
      if (typeof TarotDetail !== 'undefined') {
        TarotDetail.open(index, el);
      }
    });

    // ── Keyboard accessibility ──
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (typeof TarotDetail !== 'undefined') {
          TarotDetail.open(index, el);
        }
      }
    });

    return el;
  }
};
