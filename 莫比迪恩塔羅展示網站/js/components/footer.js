/**
 * ============================================
 *  FOOTER COMPONENT
 * ============================================
 *  Minimal footer with auto-updating year.
 * ============================================
 */

var TarotFooter = {

  init: function () {
    var yearEl = document.getElementById('footer-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }
};
