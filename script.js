const config = {
  title: "Happy Birthday Bestie",
  subtitle: "A tiny little surprise made with love, just for you.",
  birthdayDate: "2026-05-11T00:00:00",
  birthDate: "2007-05-11",
  personalNote: `Hey sweet girl,

Happy Birthday.

You are kind, strong, and really special to me.
I hope your day is full of smiles, peace, and happiness.

Stay happy, keep shining, and never doubt yourself.

I love you so much.`,
  afterMessage: "Happy Birthday. Today is all yours.",
  beforeMessage: "Counting down to your special day."
};

const heroTitle = document.getElementById("heroTitle");
const heroText = document.getElementById("heroText");
const ageValue = document.getElementById("ageValue");
const countdownInline = document.getElementById("countdownInline");
const countNote = document.getElementById("countNote");
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const musicInput = document.getElementById("musicInput");
const photoInput = document.getElementById("photoInput");
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const problemText = document.getElementById("problemText");
const answerInput = document.getElementById("answerInput");
const checkBtn = document.getElementById("checkBtn");
const feedback = document.getElementById("feedback");
const noteCard = document.getElementById("noteCard");
const noteText = document.getElementById("noteText");
const balloonSky = document.getElementById("balloonSky");
const heartLayer = document.getElementById("heartLayer");
const popLayer = document.getElementById("popLayer");
const cake3d = document.getElementById("cake3d");
const cakePhoto = document.getElementById("cakePhoto");
const cakeSpecialNote = document.getElementById("cakeSpecialNote");

const birthdayMoment = new Date(config.birthdayDate);
const birthDate = new Date(config.birthDate);
let currentAnswer = 0;
const MUSIC_STORAGE_KEY = "birthday-bestie-music";

function setupCopy() {
  heroTitle.textContent = config.title;
  heroText.textContent = config.subtitle;
  noteText.textContent = config.personalNote;
  ageValue.textContent = String(getTurningAge());
  cakeSpecialNote.textContent = "Happy birthday. You deserve a day full of smiles, peace, and love.";
}

function restoreSavedMusic() {
  try {
    const savedMusic = localStorage.getItem(MUSIC_STORAGE_KEY);
    if (!savedMusic) {
      return;
    }

    bgMusic.src = savedMusic;
    bgMusic.load();
    musicBtn.textContent = "Play Music";
  } catch {
    // Ignore storage issues and keep the default source.
  }
}

function getTurningAge() {
  let age = birthdayMoment.getFullYear() - birthDate.getFullYear();
  const sameYearBirthday = new Date(birthdayMoment.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (birthdayMoment < sameYearBirthday) {
    age -= 1;
  }
  return age;
}

function updateCountdown() {
  const now = new Date();
  const diff = birthdayMoment - now;

  if (diff <= 0) {
    days.textContent = "00";
    hours.textContent = "00";
    minutes.textContent = "00";
    seconds.textContent = "00";
    countdownInline.textContent = "It is today";
    countNote.textContent = config.afterMessage;
    cake3d.classList.remove("hidden");
    launchCelebrationPops(3);
    return;
  }

  const dayMs = 1000 * 60 * 60 * 24;
  const hourMs = 1000 * 60 * 60;
  const minuteMs = 1000 * 60;

  const d = Math.floor(diff / dayMs);
  const h = Math.floor((diff % dayMs) / hourMs);
  const m = Math.floor((diff % hourMs) / minuteMs);
  const s = Math.floor((diff % minuteMs) / 1000);

  days.textContent = String(d).padStart(2, "0");
  hours.textContent = String(h).padStart(2, "0");
  minutes.textContent = String(m).padStart(2, "0");
  seconds.textContent = String(s).padStart(2, "0");
  countdownInline.textContent = `${String(d).padStart(2, "0")}d ${String(h).padStart(2, "0")}h`;
  countNote.textContent = config.beforeMessage;
  cake3d.classList.add("hidden");
}

function buildQuestion() {
  const mean = 18;
  const n = 5;
  const total = mean * n;
  const known = [15, 17, 18, 19];
  currentAnswer = total - known.reduce((sum, value) => sum + value, 0);
  problemText.textContent = `The average of 5 numbers is ${mean}. Four numbers are 15, 17, 18, and 19. What is the fifth number?`;
}

function openNote() {
  const guess = Number(answerInput.value);

  if (!Number.isFinite(guess)) {
    feedback.textContent = "Enter a number first.";
    return;
  }

  if (guess === currentAnswer) {
    noteCard.classList.remove("hidden");
    feedback.textContent = "Correct. Your note is open.";
    burstHearts();
    launchCelebrationPops(2);
    return;
  }

  feedback.textContent = "Not quite. Try again.";
}

function makeBalloon() {
  const balloon = document.createElement("span");
  const colors = [
    "linear-gradient(180deg, #ffb0d7, #ff72b7)",
    "linear-gradient(180deg, #d8c2ff, #a67aff)",
    "linear-gradient(180deg, #ffdceb, #ff9ec9)"
  ];

  balloon.className = "balloon";
  balloon.style.left = `${Math.random() * 100}%`;
  balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
  balloon.style.animationDuration = `${10 + Math.random() * 8}s`;
  balloon.style.setProperty("--drift", `${-80 + Math.random() * 160}px`);
  balloonSky.appendChild(balloon);

  setTimeout(() => balloon.remove(), 18000);
}

function makeHeart() {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.5 ? "\u2665" : "\u2661";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${0.9 + Math.random() * 1.2}rem`;
  heart.style.setProperty("--drift", `${-60 + Math.random() * 120}px`);
  heart.style.animationDuration = `${8 + Math.random() * 6}s`;
  heartLayer.appendChild(heart);

  setTimeout(() => heart.remove(), 15000);
}

function burstHearts() {
  for (let i = 0; i < 12; i += 1) {
    setTimeout(makeHeart, i * 120);
  }
}

function makePopBurst(x, y) {
  const colors = ["#ff77b9", "#ffd76e", "#bb95ff", "#8ff0d3", "#ffffff"];

  for (let i = 0; i < 18; i += 1) {
    const pop = document.createElement("span");
    pop.className = "pop";
    pop.style.left = `${x}px`;
    pop.style.top = `${y}px`;
    pop.style.background = colors[Math.floor(Math.random() * colors.length)];
    pop.style.setProperty("--x", `${-90 + Math.random() * 180}px`);
    pop.style.setProperty("--y", `${-110 + Math.random() * 160}px`);
    pop.style.setProperty("--r", `${-180 + Math.random() * 360}deg`);
    popLayer.appendChild(pop);
    setTimeout(() => pop.remove(), 1000);
  }
}

function launchCelebrationPops(rounds = 1) {
  for (let i = 0; i < rounds; i += 1) {
    setTimeout(() => {
      makePopBurst(
        window.innerWidth * (0.25 + Math.random() * 0.5),
        window.innerHeight * (0.2 + Math.random() * 0.35)
      );
    }, i * 260);
  }
}

function addTilt() {
  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

async function toggleMusic() {
  if (bgMusic.paused) {
    try {
      await bgMusic.play();
      musicBtn.textContent = "Pause Music";
    } catch {
      musicBtn.textContent = "Tap Again For Music";
    }
    return;
  }

  bgMusic.pause();
  musicBtn.textContent = "Play Music";
}

function handleMusicUpload(event) {
  const [file] = event.target.files || [];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const result = typeof reader.result === "string" ? reader.result : "";
    if (!result) {
      return;
    }

    bgMusic.src = result;
    bgMusic.load();
    musicBtn.textContent = "Play Music";

    try {
      localStorage.setItem(MUSIC_STORAGE_KEY, result);
    } catch {
      // If storage is unavailable, the music still works for this session.
    }
  };
  reader.readAsDataURL(file);
}

function handlePhotoUpload(event) {
  const [file] = event.target.files || [];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    cakePhoto.src = reader.result;
  };
  reader.readAsDataURL(file);
}

checkBtn.addEventListener("click", openNote);
answerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    openNote();
  }
});
musicBtn.addEventListener("click", toggleMusic);
musicInput.addEventListener("change", handleMusicUpload);
photoInput.addEventListener("change", handlePhotoUpload);

setupCopy();
restoreSavedMusic();
buildQuestion();
updateCountdown();
addTilt();
setInterval(updateCountdown, 1000);
setInterval(makeBalloon, 1700);
setInterval(makeHeart, 1200);
setInterval(() => launchCelebrationPops(1), 5000);
for (let i = 0; i < 6; i += 1) {
  setTimeout(makeBalloon, i * 250);
}
