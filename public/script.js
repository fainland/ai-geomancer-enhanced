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

document.addEventListener("DOMContentLoaded", function () {
  const audio = document.querySelector("audio");
  if (audio) audio.volume = 0.3; // Set volume to 30%
});

