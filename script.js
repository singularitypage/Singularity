// === ТАЙМЕР ===
function updateTimer() {
  const targetDate = new Date("2025-06-30T15:00:00Z");
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) return;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const updateCircle = (id, value, max) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.querySelector(".number").textContent = value;
    const offset = 283 - (value / max) * 283;
    el.querySelector(".progress").style.strokeDashoffset = offset;
  };

  updateCircle("days", days, 30);
  updateCircle("hours", hours, 24);
  updateCircle("minutes", minutes, 60);
  updateCircle("seconds", seconds, 60);
}

setInterval(updateTimer, 1000);
updateTimer();


// === ФОН (GIF) ===
const bgImages = [
  'assets/1.gif',
  'assets/2.gif',
  'assets/3.gif',
  'assets/4.gif',
  'assets/5.gif',
  'assets/6.gif'
];

let bgIndex = 0;
const body = document.getElementById('pageBody');

function rotateBackground() {
  if (!body) return;
  bgIndex = (bgIndex + 1) % bgImages.length;
  body.style.opacity = 0;
  setTimeout(() => {
    body.style.backgroundImage = `url('${bgImages[bgIndex]}')`;
    body.style.opacity = 1;
  }, 500);
}

window.addEventListener("load", () => {
  const intro = document.getElementById("intro-overlay");
  if (intro) {
    setTimeout(() => intro.classList.add("hidden"), 1000);
  }

  setTimeout(() => {
    rotateBackground();
    setInterval(rotateBackground, 5000);
  }, 3000);
});


// === МУЗЫКА ===
const audio = document.getElementById('bg-music');
let isPlaying = false;

function playMusic() {
  if (!audio) return;

  if (isPlaying) {
    audio.pause();
  } else {
    audio.play().catch(() => {});
  }
  isPlaying = !isPlaying;
}

// Инициализация музыки и громкости
document.addEventListener('DOMContentLoaded', () => {
  const volumeSlider = document.getElementById('volume-control');

  if (audio && volumeSlider) {
    audio.volume = 0.20;
    volumeSlider.value = 0.20;

    volumeSlider.addEventListener('input', () => {
      audio.volume = volumeSlider.value;
    });
  }

  // Пытаемся запустить музыку после взаимодействия пользователя
  const tryPlayMusic = () => {
    if (audio && !isPlaying) {
      audio.play().then(() => {
        isPlaying = true;
        const btn = document.querySelector('.music-button');
        if (btn) btn.classList.remove('pulsing');
      }).catch(() => {});
    }
    document.removeEventListener('click', tryPlayMusic);
  };

  // Показываем кнопку музыки через 4 секунды
  setTimeout(() => {
    const musicButton = document.querySelector('.music-button');
    const musicContainer = document.querySelector('.music-container');

    if (musicButton) musicButton.classList.add('visible');
    if (musicContainer) musicContainer.classList.add('visible');
  }, 4000);

  // Показываем контейнер громкости через 6 секунд
  setTimeout(() => {
    const musicContainer = document.querySelector('.music-container');
    if (musicContainer) musicContainer.classList.add('visible');
  }, 6000);

  // Пытаемся запустить музыку при первом клике
  document.addEventListener('click', tryPlayMusic, { once: true });
});


// === ПАРАЛЛАКС ЭФФЕКТ ===
let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', function(e) {
  targetX = (e.clientX - window.innerWidth / 2) * 0.02;
  targetY = (e.clientY - window.innerHeight / 2) * 0.02;
});

function animateParallax() {
  currentX += (targetX - currentX) * 0.05;
  currentY += (targetY - currentY) * 0.05;

  document.body.style.setProperty('--bg-x', `${currentX}px`);
  document.body.style.setProperty('--bg-y', `${currentY}px`);

  requestAnimationFrame(animateParallax);
}

animateParallax();


// === СЛУЧАЙНЫЙ ПЕРЕХОД ПО СТРАНИЦАМ ===
function goToRandomTab() {
  const pages = [
    'index.html',
    'anya.html',
    'darya.html',
    'syn2.html',
    'contacts.html'
  ];

  const currentPage = location.pathname.split('/').pop();
  const otherPages = pages.filter(p => p !== currentPage);
  const randomPage = otherPages[Math.floor(Math.random() * otherPages.length)];
  location.href = randomPage;
}