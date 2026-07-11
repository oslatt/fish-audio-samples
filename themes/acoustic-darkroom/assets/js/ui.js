/**
 * ui.js - Card click interactions with inline detail card expansion
 * Exact replica of the reference interaction model:
 * - Click card body -> toggle .active on .sample-card-container + body.dimmed
 * - Click play button -> plays audio, does NOT toggle detail
 * - Click close button or outside -> close all active cards
 */

(function() {
  'use strict';

  const body = document.body;

  function init() {
    const containers = document.querySelectorAll('.sample-card-container');

    containers.forEach(container => {
      const originalCard = container.querySelector('.original-card');
      const detailCard = container.querySelector('.detail-card');
      const closeBtn = container.querySelector('.close-card-btn');

      if (originalCard) {
        originalCard.addEventListener('click', (e) => {
          if (e.target.closest('.play-toggle') || e.target.closest('.waveform-canvas')) return;
          e.stopPropagation();
          const isActive = container.classList.contains('active');
          closeAllCards();
          if (!isActive) {
            container.classList.add('active');
            body.classList.add('dimmed');
          }
        });
      }

      // Prevent clicks inside detail card from closing
      if (detailCard) {
        detailCard.addEventListener('click', (e) => {
          e.stopPropagation();
        });
      }

      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          closeAllCards();
        });
      }

      // Click to copy prompt text
      const promptText = container.querySelector('.prompt-text');
      if (promptText) {
        promptText.addEventListener('click', (e) => {
          e.stopPropagation();
          navigator.clipboard.writeText(promptText.textContent.trim());
          showCopiedToast(e.target);
        });
      }
    });

    // Click outside closes
    document.addEventListener('click', (e) => {
      if (body.classList.contains('dimmed')) {
        closeAllCards();
      }
    });
  }

  function closeAllCards() {
    document.querySelectorAll('.sample-card-container.active').forEach(c => {
      c.classList.remove('active');
      // Reset prompt animation spans
      const spans = c.querySelectorAll('.prompt-text span');
      spans.forEach(span => {
        span.style.animationName = 'none';
        setTimeout(() => span.style.animationName = '', 50);
      });
    });
    body.classList.remove('dimmed');
  }

  function showCopiedToast(anchor) {
    var existing = document.querySelector('.copied-toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'copied-toast';
    toast.textContent = 'Copied!';
    document.body.appendChild(toast);

    var rect = anchor.getBoundingClientRect();
    var tw = toast.offsetWidth;
    toast.style.left = Math.round(rect.left + rect.width / 2 - tw / 2) + 'px';
    toast.style.top = Math.round(rect.top - 28) + 'px';

    setTimeout(function() {
      toast.classList.add('fade-out');
      setTimeout(function() { toast.remove(); }, 300);
    }, 800);
  }

  window.showCopiedToast = showCopiedToast;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
