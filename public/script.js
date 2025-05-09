const questions = [
  {
    text: "Which of these draws your attention most today?",
    options: ["A flame", "A stream", "A wall", "A shadow"]
  },
  {
    text: "What tone are you carrying?",
    options: ["Reaching", "Anchored", "Circling", "Watching"]
  },
  {
    text: "Which path would you take?",
    options: ["Through the thorns", "Into the mist", "Beside the fire", "Over the stone"]
  },
  {
    text: "Choose the shape that feels like you today:",
    options: ["▲", "◯", "☰", "✕"]
  }
];

let currentQuestion = 0;
let answersChosen = [];

function showNextQuestion() {
  if (currentQuestion >= questions.length) return computePrediction();
  const q = questions[currentQuestion];
  document.getElementById('question-text').innerText = q.text;
  const answerBox = document.getElementById('answers');
  answerBox.innerHTML = '';
  q.options.forEach(option => {
    const btn = document.createElement('button');
    btn.innerText = option;
    btn.onclick = () => {
      answersChosen.push(option);
      currentQuestion++;
      showNextQuestion();
    };
    answerBox.appendChild(btn);
  });
}

function computePrediction() {
  document.getElementById('question-box').style.display = 'none';
  fetch('/api/prediction')
    .then(res => res.json())
    .then(data => {
      const combined = answersChosen.join(', ');
      document.getElementById('symbol').innerText = symbols[data.figure] || '?';
      document.getElementById('interpretation').innerText =
        `Figure: ${data.figure}\nPlanetary Hour: ${data.planetaryHour}\nYou answered: ${combined}`;
    });
}

document.addEventListener('DOMContentLoaded', showNextQuestion);


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

function spawnSprite() {
  const sprite = document.createElement("div");
  sprite.className = "sprite";
  sprite.innerText = getRandomSprite();
  sprite.style.left = Math.random() * 90 + "%";
  sprite.style.top = Math.random() * 80 + "%";
  document.getElementById("sprite-layer").appendChild(sprite);
  setTimeout(() => sprite.remove(), 8000);
}

function getRandomSprite() {
  const options = [
    '∆\n░',       // tree-like
    '█\n█\n●',     // creature
    '☽☉',        // orbit
    '♃♄\n♂'       // astral cluster
  ];
  return options[Math.floor(Math.random() * options.length)];
}

setInterval(spawnSprite, 10000);


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
