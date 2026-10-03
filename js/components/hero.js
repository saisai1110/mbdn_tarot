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

    // 1. Randomize Result (22 cards * 2 states)
    var maxIndex = TarotData.cards.length - 1;
    var randomIndex = Math.floor(Math.random() * (maxIndex + 1));
    var card = TarotData.cards[randomIndex];
    
    var isReversedResult = Math.random() > 0.5;
    
    // Set image before flipping
    drawnImg.src = isReversedResult ? card.reversedImage : card.uprightImage;
    drawnImg.alt = card.name + (isReversedResult ? " Reversed" : "");

    // 2. Animation Sequence
    fan.classList.remove('is-flipping');
    fan.classList.add('is-drawing');

    // Wait for extraction animation, then flip
    setTimeout(function () {
      fan.classList.add('is-flipping');
      
      // Wait for flip to complete, then open Detail View
      setTimeout(function () {
        if (typeof TarotDetail !== 'undefined') {
          var forcedState = isReversedResult ? 'reversed' : 'upright';
          TarotDetail.open(randomIndex, fan, forcedState);
        }
        
        // Reset fan silently after detail overlay covers it
        setTimeout(function() {
          fan.classList.remove('is-drawing', 'is-flipping');
          drawnImg.src = "";
        }, 500);
      }, 700); 
    }, 500);
  }
};
