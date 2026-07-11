/**
 * Search.js - FlexSearch integration for Fish Audio Prompt Library
 * Handles indexing, search, filtering, and result rendering
 */

(function() {
  'use strict';

  let index = null;
  let allPrompts = [];
  let activeFilters = new Map(); // key -> Set of values

  // DOM refs
  const grid = document.getElementById('grid-container');
  const searchInput = document.getElementById('search-input');
  const emptyState = document.getElementById('empty-state');
  const resetSearchBtn = document.getElementById('reset-search');

  // Initialize from server-rendered cards (no JSON needed!)
  function init() {
    const cards = Array.from(document.querySelectorAll('.sample-card-container'));
    allPrompts = cards.map(card => ({
      id: card.dataset.id,
      title: card.dataset.title || '',
      model: card.dataset.model || '',
      language: card.dataset.language || '',
      tags: (card.dataset.tags || '').split(',').filter(Boolean),
      nsfw: card.dataset.nsfw === 'true',
      prompt: card.dataset.prompt || '',
      duration: card.dataset.duration || '',
      url: card.dataset.url || '',
      audio: card.dataset.audio || '',
      el: card
    }));

    buildIndex();
    bindEvents();
  }

  function buildIndex() {
    if (typeof FlexSearch === 'undefined') {
      console.warn('FlexSearch not loaded, using fallback filtering');
      return;
    }
    // Use flexsearch Index for fuzzy search on title + prompt
    index = new FlexSearch.Index({
      tokenize: 'forward',
      resolution: 9,
      minlength: 2
    });

    allPrompts.forEach((p, i) => {
      const text = [p.title, p.prompt, p.tags.join(' ')].join(' ');
      index.add(i, text);
    });
  }

  function bindEvents() {
    if (searchInput) {
      searchInput.addEventListener('input', debounce(() => render(), 150));
    }

    document.querySelectorAll('.filter-chip').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filter = e.currentTarget.dataset.filter;
        toggleFilter(filter);
        e.currentTarget.classList.toggle('active');
      });
    });

    if (resetSearchBtn) {
      resetSearchBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        clearAllFilters();
      });
    }

    // Nav favourites toggle (no-op for now, just visual feedback)
    const favBtn = document.getElementById('toggle-favorites');
    if (favBtn) {
      favBtn.addEventListener('click', () => {
        favBtn.classList.toggle('text-primary');
        const icon = favBtn.querySelector('svg');
        if (icon) {
          const isFav = favBtn.classList.contains('text-primary');
          icon.style.opacity = isFav ? '1' : '0.6';
        }
      });
    }
  }

  function toggleFilter(filterStr) {
    const [key, value] = filterStr.split(':');
    if (!activeFilters.has(key)) {
      activeFilters.set(key, new Set());
    }
    const set = activeFilters.get(key);
    if (set.has(value)) {
      set.delete(value);
      if (set.size === 0) activeFilters.delete(key);
    } else {
      set.add(value);
    }
    render();
  }

  function clearAllFilters() {
    activeFilters.clear();
    document.querySelectorAll('.filter-chip.active').forEach(c => c.classList.remove('active'));
    render();
  }

  function getVisibleIds() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    let ids = new Set(allPrompts.map((_, i) => i));

    // Text search
    if (query && index) {
      const results = index.search(query);
      ids = new Set(results);
    } else if (query) {
      // Fallback without flexsearch
      ids = new Set(allPrompts.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.prompt.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query))
      ).map((_, i) => i));
    }

    // Filter by taxonomies
    activeFilters.forEach((values, key) => {
      ids = new Set(Array.from(ids).filter(i => {
        const p = allPrompts[i];
        if (key === 'tag') return p.tags.some(t => values.has(t.toLowerCase()));
        if (key === 'model') return values.has(p.model);
        if (key === 'language') return values.has(p.language);
        if (key === 'nsfw') return p.nsfw;
        return false;
      }));
    });

    return ids;
  }

  function render() {
    const visible = getVisibleIds();
    let count = 0;

    allPrompts.forEach((p, i) => {
      const show = visible.has(i);
      p.el.style.display = show ? '' : 'none';
      if (show) count++;
    });

    if (emptyState) emptyState.classList.toggle('hidden', count > 0);
  }

  function debounce(fn, ms) {
    let t;
    return () => {
      clearTimeout(t);
      t = setTimeout(fn, ms);
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
