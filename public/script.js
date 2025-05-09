const symbols = {
  'Fortuna Major': `
  ● ●
  ○ ●
  ● ●
  ○ ●`,
  'Fortuna Minor': `
  ○ ●
  ● ●
  ○ ●
  ● ●`,
  'Via': `
  ○ ○
  ○ ○
  ○ ○
  ○ ○`,
  'Populus': `
  ● ●
  ● ●
  ● ●
  ● ●`,
  'Puella': `
  ● ●
  ○ ●
  ● ●
  ○ ●`,
  'Puer': `
  ○ ●
  ● ●
  ○ ●
  ● ●`,
  'Tristitia': `
  ○ ○
  ● ●
  ○ ●
  ● ●`,
  'Albus': `
  ● ●
  ● ●
  ○ ○
  ○ ○`
};

fetch('/api/prediction')
  .then(res => res.json())
  .then(data => {
    document.getElementById('symbol').innerText = symbols[data.figure] || '?';
    document.getElementById('interpretation').innerText =
      `Figure: ${data.figure}\nPlanetary Hour: ${data.planetaryHour}`;
  })
  .catch(() => {
    document.getElementById('interpretation').innerText = "Failed to load prediction.";
  });

window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-audio");
  if (audio) {
    audio.volume = 0;
    audio.play().then(() => {
      let vol = 0;
      const fadeIn = setInterval(() => {
        if (vol < 0.3) {
          vol += 0.01;
          audio.volume = vol;
        } else {
          clearInterval(fadeIn);
        }
      }, 200);
    });
  }

  window.addEventListener("beforeunload", () => {
    let vol = audio.volume;
    const fadeOut = setInterval(() => {
      if (vol > 0) {
        vol -= 0.01;
        audio.volume = vol;
      } else {
        clearInterval(fadeOut);
        audio.pause();
      }
    }, 100);
  });
});
