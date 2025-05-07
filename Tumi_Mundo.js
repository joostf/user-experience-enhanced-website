type="module">
  document.querySelector('track').addEventListener('cuechange', function(ev) {
    document.querySelector('p').textContent = ev.target.track.activeCues[0].text
  })