function updateTimer() {
  const targetDate = new Date("2025-05-30T00:00:00");
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) return;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const updateCircle = (id, value, max) => {
    const el = document.getElementById(id);
    el.querySelector(".number").textContent = value;
    const offset = 283 - (value / max) * 283;
    el.querySelector(".progress").style.strokeDashoffset = offset;
  };

  updateCircle("days", days, 30);
  updateCircle("hours", hours, 24);
  updateCircle("minutes", minutes, 60);
  updateCircle("seconds", seconds, 60);
}

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
  bgIndex = (bgIndex + 1) % bgImages.length;
  body.style.opacity = 0;
  setTimeout(() => {
    body.style.backgroundImage = `url('${bgImages[bgIndex]}')`;
    body.style.opacity = 1;
  }, 500);
}

window.addEventListener("load", () => {
  const intro = document.getElementById("intro-overlay");
  setTimeout(() => {
    intro.classList.add("hidden");
  }, 1000);

  setTimeout(() => {
    rotateBackground();
    setInterval(rotateBackground, 5000);
  }, 3000);
});

const audio = document.getElementById('bg-music');
let isPlaying = false;

function playMusic() {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
  isPlaying = !isPlaying;
}

document.addEventListener('DOMContentLoaded', () => {
  const volumeSlider = document.getElementById('volume-control');
  volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
  });
  audio.volume = 1;
  audio.play().then(() => { isPlaying = true; }).catch(() => {
    const btn = document.querySelector('.music-button');
    if (btn) btn.classList.add('pulsing');
    document.addEventListener('click', () => {
      if (!isPlaying) {
        audio.play();
        isPlaying = true;
        if (btn) btn.classList.remove('pulsing');
      }
    }, { once: true });
  });
});

setInterval(updateTimer, 1000);
updateTimer();


// Показать кнопку громкости через 6 секунд после загрузки
window.addEventListener('load', () => {
  setTimeout(() => {
    const musicContainer = document.querySelector('.music-container');
    if (musicContainer) {
      musicContainer.classList.add('visible');
    }
  }, 6000);
});


// Плавное появление только кнопки звука через 4 секунды
window.addEventListener('load', () => {
  setTimeout(() => {
    const musicButton = document.querySelector('.music-button');
    if (musicButton) {
      musicButton.classList.add('visible');
    }
  }, 4000);
});


// Плавное появление иконки громкости через 4 секунды после загрузки
window.addEventListener('load', () => {
  setTimeout(() => {
    const icon = document.querySelector('.music-button');
    if (icon) {
      icon.classList.add('visible');
    }
  }, 4000);
});


// Включить музыку через 4 секунды после загрузки страницы
window.addEventListener('load', () => {
  setTimeout(() => {
    const music = document.getElementById('bg-music');
    if (music) {
      music.play().catch((e) => {
        console.warn('Autoplay failed:', e);
      });
    }
  }, 4000);
});


// Установим громкость 25% при загрузке
window.addEventListener('load', () => {
  const audio = document.getElementById('bg-music');
  const volume = document.getElementById('volume-control');
  if (audio && volume) {
    audio.volume = 0.25;
    volume.value = 0.25;
  }
});


// Установим громкость 25% при загрузке
window.addEventListener('load', () => {
  const audio = document.getElementById('bg-music');
  const volume = document.getElementById('volume-control');
  if (audio && volume) {
    audio.volume = 0.25;
    volume.value = 0.25;
  }
});

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