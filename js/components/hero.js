/**
 * ============================================
 *  HERO COMPONENT (DRAW A CARD)
 * ============================================
 *  Manages the Tarot card drawing feature.
 * ============================================
 */

var TarotHero = {

  init: function () {
    var fanContainer = document.getElementById('draw-fan-container');
    var fan = document.getElementById('draw-fan');

    if (!fanContainer || !fan) return;

    var self = this;
    fanContainer.addEventListener('click', function () {
      if (fan.classList.contains('is-drawing')) return;
      self.drawCard();
    });
  },

  drawCard: function () {
    var fan = document.getElementById('draw-fan');
    var drawnImg = document.getElementById('drawn-card-img');
    
    if (!fan || !drawnImg || TarotData.cards.length === 0) return;
    if (typeof CardReveal !== 'undefined' && CardReveal.state.isActive) return;

    // 1. Randomize Result (22 cards * 2 states)
    var maxIndex = TarotData.cards.length - 1;
    var randomIndex = Math.floor(Math.random() * (maxIndex + 1));
    var card = TarotData.cards[randomIndex];
    
    var isReversedResult = Math.random() > 0.5;
    
    // 2. Animation Sequence: Extract card as Card Back (do NOT show card face!)
    fan.classList.remove('is-flipping');
    fan.classList.add('is-drawing');

    // Wait for card extraction to complete (~650ms), then start mysterious reveal sequence
    setTimeout(function () {
      // Route through CardReveal typewriter transition
      if (typeof CardReveal !== 'undefined') {
        CardReveal.start(randomIndex, isReversedResult, fan);
      } else if (typeof TarotDetail !== 'undefined') {
        // Fallback: open Detail directly if CardReveal not loaded
        var forcedState = isReversedResult ? 'reversed' : 'upright';
        TarotDetail.open(randomIndex, fan, forcedState, true);
      }

      // Reset fan silently after reveal overlay covers it
      setTimeout(function() {
        fan.classList.remove('is-drawing', 'is-flipping');
        if (drawnImg) drawnImg.src = "";
      }, 450);
    }, 650);
  }
};
