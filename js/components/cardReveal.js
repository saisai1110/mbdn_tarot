/**
 * ============================================
 *  CARD REVEAL COMPONENT
 * ============================================
 *  Typewriter text reveal transition between
 *  the draw animation and the Detail View.
 *
 *  Flow:
 *    Draw (Card Back)
 *    → Hidden Reveal State (Floating Card Back in darkness)
 *    → Typewriter text (Fixed left-aligned, Unicode-safe)
 *    → Pause (700~1200ms)
 *    → Fade out
 *    → Official reveal in Tarot Detail View
 * ============================================
 */

var CardReveal = {

  state: {
    isActive: false,
    typewriterTimer: null,
    skipPhase: 0  // 0 = typing, 1 = showing full text, 2 = done
  },

  /**
   * Extract the English sentence matching card and orientation.
   * Cleans any unintended U+FFFD characters and preserves exact original text.
   */
  extractEnglishLine: function (card, isReversed) {
    if (!card) return '';

    var line = '';

    // Check orientation-specific sentence or text if present
    if (isReversed) {
      if (card.reversedSentence) line = card.reversedSentence.trim();
      else if (card.reversedText) {
        var rev = this._parseSpanContent(card.reversedText);
        if (rev) line = rev;
      }
    } else {
      if (card.uprightSentence) line = card.uprightSentence.trim();
      else if (card.uprightText) {
        var up = this._parseSpanContent(card.uprightText);
        if (up) line = up;
      }
    }

    // Default shared text
    if (!line && card.text) {
      line = this._parseSpanContent(card.text);
    }

    // Fallback: uprightText or reversedText
    if (!line) {
      var fallback = card.uprightText || card.reversedText || '';
      line = this._parseSpanContent(fallback);
    }

    // Defensively filter out any U+FFFD (Unicode replacement character)
    return line ? line.replace(/\uFFFD/g, '').trim() : '';
  },

  _parseSpanContent: function (html) {
    if (!html) return '';
    var temp = document.createElement('div');
    temp.innerHTML = html;
    var span = temp.querySelector('span');
    if (span) {
      return span.textContent.trim();
    }
    // If no span, return the first line of text
    var text = temp.textContent.trim();
    var firstLine = text.split('\n')[0].split('「')[0].trim();
    return firstLine || text;
  },

  /**
   * Start the reveal sequence.
   * @param {number} cardIndex - Index in TarotData.cards
   * @param {boolean} isReversed - Whether the card is reversed
   * @param {HTMLElement} sourceEl - The draw fan element (for reset)
   */
  start: function (cardIndex, isReversed, sourceEl) {
    if (this.state.isActive) return;
    this.state.isActive = true;
    this.state.skipPhase = 0;

    var self = this;
    var card = TarotData.cards[cardIndex];
    if (!card) {
      this.state.isActive = false;
      return;
    }

    var englishLine = this.extractEnglishLine(card, isReversed);
    if (!englishLine) {
      // No English line found, skip directly to Detail View
      this._openDetail(cardIndex, isReversed, sourceEl);
      return;
    }

    var overlay = document.getElementById('card-reveal-overlay');
    var textEl = document.getElementById('card-reveal-text');
    var cursorEl = document.getElementById('card-reveal-cursor');

    if (!overlay || !textEl) {
      this._openDetail(cardIndex, isReversed, sourceEl);
      return;
    }

    // Reset text & cursor
    textEl.textContent = '';
    if (cursorEl) cursorEl.classList.remove('hidden');
    overlay.classList.remove('visible');

    // Show overlay
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Phase 1: Fade in overlay (Hidden Reveal State: Card Back floating in darkness)
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        overlay.classList.add('visible');

        // Phase 2: Start typewriter after quiet contemplation (~450ms)
        setTimeout(function () {
          self._typewrite(textEl, englishLine, function () {
            // Typing complete: hide cursor, pause for reading (950ms)
            self.state.skipPhase = 1;
            if (cursorEl) cursorEl.classList.add('hidden');

            setTimeout(function () {
              if (!self.state.isActive) return;
              self._fadeOutAndReveal(cardIndex, isReversed, sourceEl);
            }, 950);
          });
        }, 450);
      });
    });

    // Keyboard skip support (Space / Enter)
    this._skipHandler = function (e) {
      if (!self.state.isActive) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        self._handleSkip(textEl, cursorEl, englishLine, cardIndex, isReversed, sourceEl);
      }
    };
    document.addEventListener('keydown', this._skipHandler);

    // Tap / click anywhere on reveal overlay to skip smoothly
    this._clickHandler = function () {
      if (!self.state.isActive) return;
      self._handleSkip(textEl, cursorEl, englishLine, cardIndex, isReversed, sourceEl);
    };
    overlay.addEventListener('click', this._clickHandler);
  },

  /**
   * Handle skip (Space / Enter / Click)
   */
  _handleSkip: function (textEl, cursorEl, englishLine, cardIndex, isReversed, sourceEl) {
    var cleanLine = (englishLine || '').replace(/\uFFFD/g, '');

    if (this.state.skipPhase === 0) {
      // Currently typing → immediately show full text
      if (this.state.typewriterTimer) {
        clearTimeout(this.state.typewriterTimer);
        this.state.typewriterTimer = null;
      }
      textEl.textContent = cleanLine;
      if (cursorEl) cursorEl.classList.add('hidden');
      this.state.skipPhase = 1;

      var self = this;
      setTimeout(function () {
        if (!self.state.isActive) return;
        self._fadeOutAndReveal(cardIndex, isReversed, sourceEl);
      }, 500);
    } else if (this.state.skipPhase === 1) {
      // Full text shown → proceed immediately to Detail View
      this._fadeOutAndReveal(cardIndex, isReversed, sourceEl);
    }
  },

  /**
   * Typewriter effect: reveal text character by character using Unicode code points.
   * Uses Array.from() to safely treat 4-byte surrogate pairs (e.g. 𝑀, 𝑎, 𝑦) as single characters,
   * completely preventing lone surrogate characters (U+FFFD ) from ever rendering.
   */
  _typewrite: function (element, text, callback) {
    var self = this;

    // Clean text defensively against any existing U+FFFD
    var cleanText = (text || '').replace(/\uFFFD/g, '');

    // Convert string to Unicode code-point array (safe for surrogate pairs)
    var chars = Array.from(cleanText);
    var index = 0;
    var length = chars.length;

    // Adaptive speed: 38~48ms per character (calm, ritualistic pace)
    var baseSpeed = length > 50 ? 40 : 46;

    function type() {
      if (!self.state.isActive) return;
      if (index <= length) {
        // Slice code points and join into a fully valid string at every frame
        element.textContent = chars.slice(0, index).join('');
        index++;
        self.state.typewriterTimer = setTimeout(type, baseSpeed);
      } else {
        self.state.typewriterTimer = null;
        if (callback) callback();
      }
    }

    type();
  },

  /**
   * Fade out the text & overlay, then officially open Detail View.
   */
  _fadeOutAndReveal: function (cardIndex, isReversed, sourceEl) {
    if (this.state.skipPhase === 2) return;
    this.state.skipPhase = 2;

    var self = this;
    var overlay = document.getElementById('card-reveal-overlay');
    var textEl = document.getElementById('card-reveal-text');
    var cursorEl = document.getElementById('card-reveal-cursor');

    if (this.state.typewriterTimer) {
      clearTimeout(this.state.typewriterTimer);
      this.state.typewriterTimer = null;
    }

    if (cursorEl) cursorEl.classList.add('hidden');

    // Fade out overlay smoothly (400ms)
    if (overlay) {
      overlay.style.transition = 'opacity 400ms ease-out';
      overlay.classList.remove('visible');
    }

    setTimeout(function () {
      // Clean up
      if (overlay) {
        overlay.style.display = 'none';
        overlay.style.transition = '';
        if (self._clickHandler) {
          overlay.removeEventListener('click', self._clickHandler);
          self._clickHandler = null;
        }
      }
      if (textEl) {
        textEl.textContent = '';
      }
      document.body.style.overflow = '';

      // Remove skip listener
      if (self._skipHandler) {
        document.removeEventListener('keydown', self._skipHandler);
        self._skipHandler = null;
      }

      self.state.isActive = false;
      self.state.skipPhase = 0;

      // Official Reveal: Open existing Detail View
      self._openDetail(cardIndex, isReversed, sourceEl);
    }, 420);
  },

  /**
   * Open the existing Detail View.
   */
  _openDetail: function (cardIndex, isReversed, sourceEl) {
    if (typeof TarotDetail !== 'undefined') {
      var forcedState = isReversed ? 'reversed' : 'upright';
      TarotDetail.open(cardIndex, sourceEl, forcedState, true);
    }
  }
};
