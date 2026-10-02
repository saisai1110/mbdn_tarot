/**
 * ============================================
 *  SWIPE HANDLER
 * ============================================
 *  Handles touch & mouse swipe gestures.
 *
 *  Distinguishes between:
 *    - Tap (< tapThreshold movement) → onTap
 *    - Horizontal swipe (> threshold) → onSwipeLeft / onSwipeRight
 *    - Drag feedback → onMove / onRelease
 * ============================================
 */

var SwipeHandler = (function () {

  function SwipeHandler(element, options) {
    this.el = element;
    this.opts = {
      threshold: 80,
      tapThreshold: 10,
      onSwipeLeft: null,
      onSwipeRight: null,
      onTap: null,
      onMove: null,
      onRelease: null
    };

    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        this.opts[key] = options[key];
      }
    }

    this.startX = 0;
    this.startY = 0;
    this.deltaX = 0;
    this.isSwiping = false;
    this.isTracking = false;

    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);
    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);

    this.el.addEventListener('touchstart', this._onTouchStart, { passive: true });
    this.el.addEventListener('touchmove', this._onTouchMove, { passive: false });
    this.el.addEventListener('touchend', this._onTouchEnd);
    this.el.addEventListener('mousedown', this._onMouseDown);
  }

  // ── Touch Events ──

  SwipeHandler.prototype._onTouchStart = function (e) {
    var touch = e.touches[0];
    this.startX = touch.clientX;
    this.startY = touch.clientY;
    this.deltaX = 0;
    this.isSwiping = false;
    this.isTracking = true;
  };

  SwipeHandler.prototype._onTouchMove = function (e) {
    if (!this.isTracking) return;

    var touch = e.touches[0];
    this.deltaX = touch.clientX - this.startX;
    var deltaY = touch.clientY - this.startY;

    if (Math.abs(this.deltaX) > Math.abs(deltaY) &&
        Math.abs(this.deltaX) > this.opts.tapThreshold) {
      this.isSwiping = true;
      e.preventDefault();
      if (this.opts.onMove) {
        this.opts.onMove(this.deltaX);
      }
    }
  };

  SwipeHandler.prototype._onTouchEnd = function () {
    if (!this.isTracking) return;
    this.isTracking = false;

    if (this.opts.onRelease) {
      this.opts.onRelease();
    }

    if (this.isSwiping) {
      if (Math.abs(this.deltaX) > this.opts.threshold) {
        if (this.deltaX < 0 && this.opts.onSwipeLeft) {
          this.opts.onSwipeLeft();
        } else if (this.deltaX > 0 && this.opts.onSwipeRight) {
          this.opts.onSwipeRight();
        }
      }
    } else if (Math.abs(this.deltaX) < this.opts.tapThreshold) {
      if (this.opts.onTap) {
        this.opts.onTap();
      }
    }

    this.deltaX = 0;
    this.isSwiping = false;
  };

  // ── Mouse Events (Desktop Drag) ──

  SwipeHandler.prototype._onMouseDown = function (e) {
    e.preventDefault();
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.deltaX = 0;
    this.isSwiping = false;
    this.isTracking = true;

    document.addEventListener('mousemove', this._onMouseMove);
    document.addEventListener('mouseup', this._onMouseUp);
  };

  SwipeHandler.prototype._onMouseMove = function (e) {
    if (!this.isTracking) return;

    this.deltaX = e.clientX - this.startX;

    if (Math.abs(this.deltaX) > this.opts.tapThreshold) {
      this.isSwiping = true;
      if (this.opts.onMove) {
        this.opts.onMove(this.deltaX);
      }
    }
  };

  SwipeHandler.prototype._onMouseUp = function () {
    document.removeEventListener('mousemove', this._onMouseMove);
    document.removeEventListener('mouseup', this._onMouseUp);

    if (!this.isTracking) return;
    this.isTracking = false;

    if (this.opts.onRelease) {
      this.opts.onRelease();
    }

    if (this.isSwiping && Math.abs(this.deltaX) > this.opts.threshold) {
      if (this.deltaX < 0 && this.opts.onSwipeLeft) {
        this.opts.onSwipeLeft();
      } else if (this.deltaX > 0 && this.opts.onSwipeRight) {
        this.opts.onSwipeRight();
      }
    } else if (!this.isSwiping && Math.abs(this.deltaX) < this.opts.tapThreshold) {
      if (this.opts.onTap) {
        this.opts.onTap();
      }
    }

    this.deltaX = 0;
    this.isSwiping = false;
  };

  // ── Destroy ──

  SwipeHandler.prototype.destroy = function () {
    this.el.removeEventListener('touchstart', this._onTouchStart);
    this.el.removeEventListener('touchmove', this._onTouchMove);
    this.el.removeEventListener('touchend', this._onTouchEnd);
    this.el.removeEventListener('mousedown', this._onMouseDown);
    document.removeEventListener('mousemove', this._onMouseMove);
    document.removeEventListener('mouseup', this._onMouseUp);
  };

  return SwipeHandler;

})();
