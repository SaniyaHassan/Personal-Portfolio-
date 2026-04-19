(function () {
  try {
    var mode = localStorage.getItem('theme-mode');
    if (mode !== 'light' && mode !== 'dark') {
      mode = window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    var motif = localStorage.getItem('theme-motif');
    if (motif !== 'constellation' && motif !== 'floral') {
      motif = 'constellation';
    }
    document.documentElement.dataset.themeMode = mode;
    document.documentElement.dataset.themeMotif = motif;

    var reduce = localStorage.getItem('reduce-motion');
    if (reduce === 'true') {
      document.documentElement.dataset.forceReduce = 'true';
    }
  } catch (e) {
    /* storage disabled — leave defaults via CSS */
  }
})();
