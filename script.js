// Elementos del DOM
const player = document.getElementById('radioPlayer');
const playBtn = document.getElementById('playBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const volumeBar = document.getElementById('volumeBar');
const muteBtn = document.getElementById('muteBtn');
const trackTitleEl = document.getElementById('trackTitle');
const artistNameEl = document.getElementById('artistName');

// Metadata simulada (cambia cada 30s)
const tracks = [
    { title: 'Hit del Verano', artist: 'Artista Invitado' },
    { title: 'Clásico FM', artist: 'DJ Local' },
    { title: 'Baila Conmigo', artist: 'Grupo Estelar' },
    { title: 'Noche de Pasión', artist: 'Vocalista Pro' }
];
let currentTrackIndex = 0;

// Controles del reproductor
playBtn.addEventListener('click', () => {
    if (player.paused) {
        player.play();
        playBtn.textContent = '⏸️ Pause';
        playBtn.classList.add('playing');
    } else {
        player.pause();
        playBtn.textContent = '▶️ Play';
        playBtn.classList.remove('playing');
    }
});

// Progreso
player.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(player.duration);
    progressBar.max = player.duration;
});

player.addEventListener('timeupdate', () => {
    if (!player.paused) {
        currentTimeEl.textContent = formatTime(player.currentTime);
        progressBar.value = player.currentTime;
    }
});

progressBar.addEventListener('input', () => {
    player.currentTime = progressBar.value;
});

// Volumen
volumeBar.addEventListener('input', () => {
    player.volume = volumeBar.value / 100;
    muteBtn.textContent = player.volume === 0 ? '🔇' : '🔊';
});

muteBtn.addEventListener('click', () => {
    player.volume = player.volume > 0 ? 0 : 1;
    volumeBar.value = player.volume * 100;
    muteBtn.textContent = player.volume === 0 ? '🔇' : '🔊';
});

// Formato de tiempo
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Cambiar metadata cada 30s
setInterval(() => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    const track = tracks[currentTrackIndex];
    trackTitleEl.textContent = track.title;
    artistNameEl.textContent = track.artist;
}, 30000);

// Smooth scroll para nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Formulario contacto (simulado)
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Mensaje enviado! Te contactaremos pronto. 📧');
});

// Botón Play/Pause con cambio de color a VERDE
playBtn.addEventListener('click', () => {
    if (player.paused) {
        player.play();
        playBtn.textContent = '⏸ Pausa';
        playBtn.style.background = '#00ff00';  // Verde fuerte
        playBtn.style.border = 'none';
    } else {
        player.pause();
        playBtn.textContent = '▸ Play';
        playBtn.style.background = '#ff3366';  // Rosa original
    }
});