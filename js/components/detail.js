/**
 * ============================================
 *  DETAIL VIEW COMPONENT
 * ============================================
 *  Full-screen overlay for viewing a tarot card.
 *
 *  Features:
 *    - 3D card flip animation (two-phase rotateY)
 *    - Swipe navigation (left/right → prev/next card)
 *    - Tap to flip
 *    - Keyboard shortcuts (← → Space Esc)
 *    - Toggle control (UPRIGHT / REVERSED)
 *    - Slide transition between cards
 *    - Text fade micro-animation
 * ============================================
 */

var TarotDetail = {

  state: {
    isOpen: false,
    currentIndex: 0,
    isReversed: false,
    isFlipping: false,
    isNavigating: false,
    swipeHandler: null
  },

  // ── Initialize ──

  init: function () {
    var self = this;
    var overlay = document.getElementById('detail-overlay');
    if (!overlay) return;

    // Close button
    var backBtn = document.getElementById('detail-back');
    if (backBtn) {
      backBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        self.close();
      });
    }

    // Draw Again button
    var drawAgainBtn = document.getElementById('detail-draw-again');
    if (drawAgainBtn) {
      drawAgainBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        self.close();
        if (typeof TarotHero !== 'undefined') {
          // Wait for overlay to close before triggering draw
          setTimeout(function() {
            TarotHero.drawCard();
          }, 400);
        }
      });
    }

    // Toggle control
    var toggleUpright = document.getElementById('toggle-upright');
    var toggleReversed = document.getElementById('toggle-reversed');

    if (toggleUpright) {
      toggleUpright.addEventListener('click', function (e) {
        e.stopPropagation();
        if (self.state.isReversed) self.flip();
      });
    }
    if (toggleReversed) {
      toggleReversed.addEventListener('click', function (e) {
        e.stopPropagation();
        if (!self.state.isReversed) self.flip();
      });
    }

    // Nav arrows
    var prevBtn = document.getElementById('detail-prev');
    var nextBtn = document.getElementById('detail-next');
    if (prevBtn) {
      prevBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        self.navigate(-1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        self.navigate(1);
      });
    }

    // Keyboard
    document.addEventListener('keydown', function (e) {
      if (!self.state.isOpen) return;

      switch (e.key) {
        case 'Escape':
          self.close();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          self.navigate(-1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          self.navigate(1);
          break;
        case ' ':
          e.preventDefault();
          self.flip();
          break;
      }
    });

    // Swipe on card area
    var cardArea = document.getElementById('detail-card-area');
    if (cardArea) {
      this.state.swipeHandler = new SwipeHandler(cardArea, {
        threshold: 80,
        tapThreshold: 10,
        onSwipeLeft: function () { self.navigate(1); },
        onSwipeRight: function () { self.navigate(-1); },
        onTap: function () { self.flip(); },
        onMove: function (deltaX) {
          if (self.state.isFlipping || self.state.isNavigating) return;
          var flipEl = document.getElementById('detail-card-flip');
          if (flipEl) {
            flipEl.style.transition = 'none';
            flipEl.style.transform = 'translateX(' + (deltaX * 0.4) + 'px) rotate(' + (deltaX * 0.015) + 'deg)';
          }
        },
        onRelease: function () {
          var flipEl = document.getElementById('detail-card-flip');
          if (flipEl) {
            flipEl.style.transition = 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)';
            flipEl.style.transform = '';
          }
        }
      });
    }

    // Click backdrop to close
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target.classList.contains('detail-overlay__backdrop')) {
        self.close();
      }
    });
  },


  // ── Open Detail View ──

  open: function (index, sourceEl, forcedState) {
    var overlay = document.getElementById('detail-overlay');
    var drawAgainBtn = document.getElementById('detail-draw-again');
    if (!overlay) return;

    this.state.isOpen = true;
    this.state.currentIndex = index;
    
    if (forcedState) {
      this.state.isReversed = (forcedState === 'reversed');
      if (drawAgainBtn) drawAgainBtn.style.display = 'flex';
    } else {
      this.state.isReversed = false;
      if (drawAgainBtn) drawAgainBtn.style.display = 'none';
    }
    
    this.state.isFlipping = false;
    this.state.isNavigating = false;

    this.updateContent();

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Show overlay
    overlay.classList.add('active');

    // Trigger animation on next frame
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        overlay.classList.add('visible');
      });
    });
  },


  // ── Close Detail View ──

  close: function () {
    var overlay = document.getElementById('detail-overlay');
    if (!overlay) return;

    this.state.isOpen = false;

    overlay.classList.remove('visible');
    document.body.style.overflow = '';

    // Wait for transition to finish before hiding
    setTimeout(function () {
      overlay.classList.remove('active');
    }, 550);
  },


  // ── Update Content ──

  updateContent: function () {
    var card = TarotData.cards[this.state.currentIndex];
    if (!card) return;

    var img = document.getElementById('detail-card-image');
    var name = document.getElementById('detail-card-name');
    var number = document.getElementById('detail-card-number');
    var status = document.getElementById('detail-card-status');
    var text = document.getElementById('detail-card-text');
    var author = document.getElementById('detail-card-author');
    var counter = document.getElementById('detail-counter');
    var toggleUpright = document.getElementById('toggle-upright');
    var toggleReversed = document.getElementById('toggle-reversed');
    var toggleTrack = document.querySelector('.detail-toggle');

    // Image
    if (img) {
      img.src = this.state.isReversed ? card.reversedImage : card.uprightImage;
      img.alt = card.name + (this.state.isReversed ? ' — Reversed' : ' — Upright');
    }

    // Text content
    if (name) name.textContent = card.name;
    if (number) number.textContent = card.number;
    
    if (text) {
      text.innerHTML = card.text || (this.state.isReversed ? card.reversedText : card.uprightText);
    }
    if (author) {
      if (card.text) {
        author.innerHTML = this.state.isReversed ? card.reversedAuthor : card.uprightAuthor;
        author.style.display = 'block';
      } else {
        author.innerHTML = '';
        author.style.display = 'none';
      }
    }

    // Counter
    if (counter) {
      var current = String(this.state.currentIndex + 1).padStart(2, '0');
      var total = String(TarotData.cards.length).padStart(2, '0');
      counter.textContent = current + ' / ' + total;
    }

    // Toggle state
    if (toggleUpright) toggleUpright.classList.toggle('active', !this.state.isReversed);
    if (toggleReversed) toggleReversed.classList.toggle('active', this.state.isReversed);
    if (toggleTrack) toggleTrack.classList.toggle('detail-toggle--reversed', this.state.isReversed);

    // Reset card transform
    var flipEl = document.getElementById('detail-card-flip');
    if (flipEl) {
      flipEl.style.transition = 'none';
      flipEl.style.transform = '';
    }
  },


  // ── Flip Card (3D two-phase rotation) ──

  flip: function () {
    if (this.state.isFlipping || this.state.isNavigating) return;
    this.state.isFlipping = true;

    var self = this;
    var flipEl = document.getElementById('detail-card-flip');
    var img = document.getElementById('detail-card-image');
    var textEl = document.getElementById('detail-card-text');
    var authorEl = document.getElementById('detail-card-author');
    var statusEl = document.getElementById('detail-card-status');
    var toggleUpright = document.getElementById('toggle-upright');
    var toggleReversed = document.getElementById('toggle-reversed');
    var toggleTrack = document.querySelector('.detail-toggle');

    if (!flipEl || !img) {
      this.state.isFlipping = false;
      return;
    }

    // Toggle state
    this.state.isReversed = !this.state.isReversed;
    var card = TarotData.cards[this.state.currentIndex];
    
    var isSplit = !!card.text;
    var fadeEl = isSplit ? authorEl : textEl;

    // Fade out text simultaneously
    if (fadeEl) TarotAnimations.fadeOutText(fadeEl);

    // ── Phase 1: Rotate 0° → 90° ──
    flipEl.style.transition = 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)';
    flipEl.style.transform = 'rotateY(90deg)';

    var onPhase1End = function (e) {
      if (e.propertyName !== 'transform') return;
      flipEl.removeEventListener('transitionend', onPhase1End);

      // ── Swap image at 90° ──
      img.src = self.state.isReversed ? card.reversedImage : card.uprightImage;
      img.alt = card.name + (self.state.isReversed ? ' — Reversed' : ' — Upright');

      // Update text content & fade in
      if (isSplit) {
        if (authorEl) {
          authorEl.innerHTML = self.state.isReversed ? card.reversedAuthor : card.uprightAuthor;
          TarotAnimations.fadeInText(authorEl);
        }
      } else {
        if (textEl) {
          textEl.innerHTML = self.state.isReversed ? card.reversedText : card.uprightText;
          TarotAnimations.fadeInText(textEl);
        }
      }

      // Update toggle
      if (toggleUpright) toggleUpright.classList.toggle('active', !self.state.isReversed);
      if (toggleReversed) toggleReversed.classList.toggle('active', self.state.isReversed);
      if (toggleTrack) toggleTrack.classList.toggle('detail-toggle--reversed', self.state.isReversed);

      // ── Phase 2: -90° → 0° ──
      flipEl.style.transition = 'none';
      flipEl.style.transform = 'rotateY(-90deg)';

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          flipEl.style.transition = 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)';
          flipEl.style.transform = 'rotateY(0deg)';

          var onPhase2End = function (e2) {
            if (e2.propertyName !== 'transform') return;
            flipEl.removeEventListener('transitionend', onPhase2End);
            self.state.isFlipping = false;
          };
          flipEl.addEventListener('transitionend', onPhase2End);
        });
      });
    };

    flipEl.addEventListener('transitionend', onPhase1End);
  },


  // ── Navigate to Previous / Next Card ──

  navigate: function (direction) {
    if (this.state.isFlipping || this.state.isNavigating) return;
    this.state.isNavigating = true;

    var self = this;
    var newIndex = this.state.currentIndex + direction;

    // Wrap around
    if (newIndex < 0) newIndex = TarotData.cards.length - 1;
    if (newIndex >= TarotData.cards.length) newIndex = 0;

    this.state.currentIndex = newIndex;
    this.state.isReversed = false;

    var cardArea = document.getElementById('detail-card-area');
    var infoArea = document.getElementById('detail-info');
    var slideDir = direction > 0 ? -1 : 1;

    if (cardArea) {
      // ── Slide out current card ──
      cardArea.style.transition = 'transform 220ms ease-in, opacity 220ms ease-in';
      cardArea.style.transform = 'translateX(' + (slideDir * 50) + 'px)';
      cardArea.style.opacity = '0';

      if (infoArea) {
        infoArea.style.transition = 'opacity 180ms ease-in';
        infoArea.style.opacity = '0';
      }

      setTimeout(function () {
        // ── Update content ──
        self.updateContent();

        // ── Slide in new card from opposite side ──
        cardArea.style.transition = 'none';
        cardArea.style.transform = 'translateX(' + (-slideDir * 50) + 'px)';

        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            cardArea.style.transition = 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1), opacity 450ms ease-out';
            cardArea.style.transform = 'translateX(0)';
            cardArea.style.opacity = '1';

            if (infoArea) {
              infoArea.style.transition = 'opacity 450ms ease-out 80ms';
              infoArea.style.opacity = '1';
            }

            setTimeout(function () {
              self.state.isNavigating = false;
            }, 460);
          });
        });
      }, 230);
    } else {
      this.updateContent();
      this.state.isNavigating = false;
    }
  }
};
