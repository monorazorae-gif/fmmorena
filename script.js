// ====================== REPRODUCTOR DE RADIO (NO TOCAR) ======================
const player = document.getElementById('radioPlayer');
const playBtn = document.getElementById('playBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const volumeBar = document.getElementById('volumeBar');
const muteBtn = document.getElementById('muteBtn');
const trackTitleEl = document.getElementById('trackTitle');
const artistNameEl = document.getElementById('artistName');

// Metadata simulada
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
        playBtn.textContent = '⏸ Pausa';
        playBtn.style.background = '#00ff00';
    } else {
        player.pause();
        playBtn.textContent = '▸ Play';
        playBtn.style.background = '#ff3366';
    }
});

// Progreso y tiempo
player.addEventListener('loadedmetadata', () => {
    if (durationEl) durationEl.textContent = formatTime(player.duration);
    if (progressBar) progressBar.max = player.duration;
});

player.addEventListener('timeupdate', () => {
    if (!player.paused && currentTimeEl && progressBar) {
        currentTimeEl.textContent = formatTime(player.currentTime);
        progressBar.value = player.currentTime;
    }
});

if (progressBar) {
    progressBar.addEventListener('input', () => {
        player.currentTime = progressBar.value;
    });
}

// Volumen
if (volumeBar) {
    volumeBar.addEventListener('input', () => {
        player.volume = volumeBar.value / 100;
        if (muteBtn) muteBtn.textContent = player.volume === 0 ? '🔇' : '🔊';
    });
}

if (muteBtn) {
    muteBtn.addEventListener('click', () => {
        player.volume = player.volume > 0 ? 0 : 1;
        if (volumeBar) volumeBar.value = player.volume * 100;
        muteBtn.textContent = player.volume === 0 ? '🔇' : '🔊';
    });
}

// Formato de tiempo
function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Cambiar metadata cada 30 segundos
setInterval(() => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    const track = tracks[currentTrackIndex];
    if (trackTitleEl) trackTitleEl.textContent = track.title;
    if (artistNameEl) artistNameEl.textContent = track.artist;
}, 30000);

// Smooth scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ====================== PROGRAMACIÓN FM MORENA ======================

const programacionPorDia = {
    1: [ // Lunes
        { time: "06:00", end: "08:00", title: "El Despertador", conductor: "Nicky Mamaní", desc: "Despertate con la mejor música y la energía que necesitás para arrancar el día.", img: "images/despertador.jpeg" },
        { time: "09:00", end: "12:30", title: "La Mañana de Todos", conductor: "Carlos Melick Mattar", desc: "Música, noticias, información y toda la buena onda de la mañana.", img: "images/mañanadetodos.jpeg" },
        { time: "13:00", end: "14:00", title: "Folkloreando a lo Grande", conductor: "Patricio González", desc: "Lo mejor del folklore nacional.", img: "images/folkloreando.jpeg" },
        { time: "14:20", end: "17:00", title: "Los Favoritos de la Tarde", conductor: "Juan Rolando Chaile", desc: "Cumbia, cuarteto y los grandes éxitos de siempre.", img: "images/favoritos.jpeg" },
        { time: "17:00", end: "19:00", title: "Sin Límite", conductor: "Tatiana Vacaflor", desc: "Música, noticias y curiosidades sin límites.", img: "images/sinlimites.jpeg" },
        { time: "19:20", end: "21:00", title: "Eureka", conductor: "Andrea Cruz", desc: "Programa especial de lunes a miércoles.", img: "images/eureka2.jpg" },
        { time: "21:20", end: "23:00", title: "La Noche en la 100", conductor: "Lirolay Gerónimo", desc: "La mejor compañía para cerrar el día.", img: "images/noche100.jpeg" },
       ],
    2: [], // Martes
    3: [], // Miércoles
    4: [], // Jueves
    5: [], // Viernes
    6: [], // Sábado
    0: []  // Domingo
};

// Completar días repetidos
programacionPorDia[2] = [...programacionPorDia[1]];
programacionPorDia[3] = [...programacionPorDia[1]];

// Jueves
programacionPorDia[4] = [
    ...programacionPorDia[1].slice(0, 5),
    { time: "19:00", end: "21:00", title: "La Tarde Urbana", conductor: "Bettina Saso y Roberto Pastrana", desc: "La mejor tarde urbana de la semana.", img: "images/tarde urbana.jpg" },
    { time: "21:20", end: "23:00", title: "La Noche en la 100", conductor: "Lirolay Gerónimo", desc: "La mejor compañía para la noche.", img: "images/noche100.jpeg" }
];

// Viernes
programacionPorDia[5] = [
    ...programacionPorDia[1].slice(0, 5),
    { time: "19:00", end: "21:00", title: "La Tarde Urbana", conductor: "Bettina Saso y Roberto Pastrana", desc: "La mejor tarde urbana.", img: "images/morena_noche.jpeg" },
    { time: "21:00", end: "23:00", title: "El Show de la 100", conductor: "Dany Mendez", desc: "El mejor show para cerrar la semana.", img: "images/show100.jpg" },
];

// Sábado
programacionPorDia[6] = [
    { time: "07:00", end: "10:00", title: "Vale La Pena", conductor: "Roque Yapura", desc: "Programa especial de sábado.", img: "images/despertador.jpeg" },
    { time: "10:00", end: "13:00", title: "El Cuartetazo", conductor: "Marcelo Suarez", desc: "Pura fiesta cuartetera.", img: "images/favoritos.jpeg" },
    { time: "13:00", end: "15:00", title: "Veteranos en Acción", conductor: "Agustín Vargas", desc: "toda la informacion del futbol de veteranos.", img: "images/veteranos.jpg" },
    { time: "15:00", end: "19:00", title: "Nostalgiamania", conductor: "Romina y Ramon Lagoria", desc: "Los grandes éxitos de siempre.", img: "images/nostalgiamania.jpeg" },
    { time: "19:00", end: "21:00", title: "La Tarde Urbana", conductor: "Bettina Saso y Roberto Pastrana", desc: "La mejor tarde urbana.", img: "images/tarde urbana.jpg" },
    { time: "21:00", end: "23:00", title: "El Show de la 100", conductor: "Dany Mendez", desc: "El show del fin de semana.", img: "images/show100.jpg" }
];

// Domingo
programacionPorDia[0] = [
    { time: "08:00", end: "11:00", title: "Buenas Ondas", conductor: "Silvia Aguirre", desc: "Buena música y buena onda para el domingo.", img: "images/buenas ondas.jpeg" },
    { time: "11:00", end: "13:00", title: "Folklore de Alto Vuelo", conductor: "Adolfo y Heber Villagran", desc: "Folklore de primer nivel.", img: "images/alto vuelo.jpeg" }
];

// ====================== FUNCIONES DE PROGRAMACIÓN ======================

function showTab(tabIndex) {
    document.querySelectorAll('.tab-content').forEach((el, i) => {
        el.style.display = (i === tabIndex) ? 'block' : 'none';
    });
    document.querySelectorAll('.tab-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === tabIndex);
    });

    if (tabIndex === 1) renderHoy();
    if (tabIndex === 2) renderSemanal();
}

function renderHoy() {
    const hoy = new Date();
    const diaSemana = hoy.getDay();

    document.getElementById('current-date').textContent = 
        hoy.toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

    const programas = programacionPorDia[diaSemana] || programacionPorDia[1];
    const container = document.getElementById('daily-schedule');
    container.innerHTML = '';

    programas.forEach(p => {
        const div = document.createElement('div');
        div.className = 'schedule-item';
        div.style = `
            display: flex; 
            align-items: center; 
            gap: 20px; 
            background: #111; 
            padding: 18px; 
            margin-bottom: 12px; 
            border-radius: 14px; 
            border-left: 6px solid #00ff00;
        `;
        div.innerHTML = `
            <div style="min-width: 110px; font-weight: bold; color: #00ff00; text-align: center;">
                ${p.time} - ${p.end}
            </div>
            <div style="flex: 1;">
                <h4 style="margin: 0 0 6px;">${p.title}</h4>
                <p style="margin: 0; color: #ccc;">Con ${p.conductor}</p>
            </div>
        `;
        container.appendChild(div);
    });

    updateNowPlaying(programas);
}

function updateNowPlaying(programas) {
    const horaActual = new Date().getHours();
    let actual = programas[0];

    for (let p of programas) {
        const horaInicio = parseInt(p.time.split(':')[0]);
        if (horaActual >= horaInicio) {
            actual = p;
        }
    }

    // Actualizar textos
    document.getElementById('now-title').textContent = actual.title;
    document.getElementById('now-conductor').textContent = `Con ${actual.conductor}`;
    document.getElementById('now-desc').textContent = actual.desc;
    document.getElementById('now-time').textContent = `${actual.time} - ${actual.end}`;

    // Actualizar imagen
    const imgEl = document.getElementById('now-image');
    if (imgEl) {
        imgEl.src = actual.img;
    }
}

function renderSemanal() {
    const container = document.getElementById('weekly-grid');
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    
    let html = '<h3 style="text-align:center; color:#00ff00; margin-bottom:30px;">Programación Semanal</h3>';
    html += '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">';

    for (let i = 0; i < 7; i++) {
        const programas = programacionPorDia[i] || [];
        html += `
            <div style="background:#111; padding:20px; border-radius:16px;">
                <h4 style="color:#00ff00; margin-bottom:15px; text-align:center;">${dias[i]}</h4>
                ${programas.map(p => `
                    <div style="margin-bottom:15px; padding-bottom:12px; border-bottom:1px solid #333;">
                        <strong>${p.time} - ${p.end}</strong><br>
                        <span style="color:#ddd;">${p.title}</span><br>
                        <small style="color:#aaa;">Con ${p.conductor}</small>
                    </div>
                `).join('')}
            </div>`;
    }
    html += '</div>';
    container.innerHTML = html;
}

// ====================== INICIALIZACIÓN ======================
document.addEventListener('DOMContentLoaded', () => {
    showTab(0);   // Abre por defecto la pestaña "Programación Habitual"
});

// Datos detallados para el modal (puedes agregar más imágenes por programa)
const programDetails = [
    { 
        title: "El Despertador", 
        conductor: "Nicky Mamaní", 
        time: "06:00 - 08:00", 
        desc: "Despertate con la mejor música y la energía que necesitás para arrancar el día.",
        images: ["images/despertador.jpeg"] 
    },
    { 
        title: "La Mañana de Todos", 
        conductor: "Carlos Melick Mattar", 
        time: "09:00 - 12:30", 
        desc: "Música, noticias, información y toda la buena onda de la mañana.",
        images: ["images/mañanadetodos.jpeg"] 
    },
    { 
        title: "Folkloreando a lo Grande", 
        conductor: "Patricio González", 
        time: "13:00 - 14:00", 
        desc: "Lo mejor del folklore nacional.",
        images: ["images/folkloreando.jpeg"] 
    },
    { 
        title: "Los Favoritos de la Tarde", 
        conductor: "Juan Rolando Chaile", 
        time: "14:20 - 17:00", 
        desc: "Cumbia, cuarteto y los grandes éxitos de siempre.",
        images: ["images/favoritos.jpeg"] 
    },
    { 
        title: "Sin Límite", 
        conductor: "Tatiana Vacaflor", 
        time: "17:00 - 19:00", 
        desc: "Música, noticias y curiosidades .",
        images: ["images/sinlimites.jpeg" , "images/sinlimiteslogo.jpeg"] 
    },
    { 
        title: "Eureka", 
        conductor: "Andrea Cruz", 
        time: "19:00 - 21:00", 
        desc: "Eureka con Andrea Cruz ",
        images: ["images/eureka1.jpeg", "images/eureka2.jpg"] 
    },
    { 
        title: "La noche en la 100", 
        conductor: "Lirolay Geronimo", 
        time: "21:00 - 23:00", 
        desc: "La mejor compañía para la noche",
        images: ["images/noche100.jpeg"] 
    },
    { 
        title: "Nostalgiamania", 
        conductor: "Romina Lagoria y el Doctor Amor", 
        time: "15:00 - 19:00", 
        desc: "La mejor musica del recuerdo, Los grandes éxitos de siempre",
        images: ["images/nostalgiamania1.jpg", "images/nostalgiamania2.jpeg"] 
    },
    { 
        title: "Tarde Urbana", 
        conductor: "Bettina Saso y Roberto Pastrana", 
        time: "19:00 - 21:00", 
        desc: "La mejor de la tarde urbana, muy buena musica",
        images: ["images/tarde urbana1.jpg", "images/tarde urbana2.jpg"] 
    },
    { 
        title: "Veteranos en Accion", 
        conductor: "Agustín Vargas ", 
        time: "13:00 - 15:00", 
        desc: "toda la informacion de la liga de veteranos, muy buena musica",
        images: ["images/veteranos.jpg"] 
    },
{ 
        title: "Buenas Ondas", 
        conductor: "Silvia Aguirre", 
        time: "08:00 - 11:00", 
        desc: "Buena música y buenas ondas para el domingo",
        images: ["images/buenas ondas.jpeg"] 
    },
{ 
        title: "Folklore de alto Vuelo", 
        conductor: "Adolfo y Heber Villagran", 
        time: "11:00 - 13:00", 
        desc: "Folklore de primer nivel.",
        images: ["images/alto vuelo.jpeg"] 
    },
];

// Función para abrir el modal
function showProgramModal(index) {
    const prog = programDetails[index];
    if (!prog) return;

    document.getElementById('modal-title').textContent = prog.title;
    document.getElementById('modal-conductor').textContent = `Con ${prog.conductor}`;
    document.getElementById('modal-time').textContent = prog.time;
    document.getElementById('modal-desc').textContent = prog.desc;

    // Mostrar imágenes (soporta múltiples)
    const imagesContainer = document.getElementById('modal-images');
    imagesContainer.innerHTML = '';
    
    prog.images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.style = "max-width:250px; height:auto; border-radius:12px; margin:5px; box-shadow:0 8px 25px rgba(0,0,0,0.5);";
        imagesContainer.appendChild(img);
    });

    document.getElementById('programModal').style.display = 'flex';
}

// Cerrar modal
function closeModal() {
    document.getElementById('programModal').style.display = 'none';
}

// Cerrar modal al hacer clic fuera
document.getElementById('programModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});