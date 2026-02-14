/* --- Animación de Fondo: Orbes Flotantes (Aurora Effect) --- */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let orbs = [];
const numOrbs = 15; // Número de luces

// Configuración de colores (Cyan, Purple, Deep Blue)
const colors = [
    'rgba(0, 212, 255, 0.4)', // Cyan
    'rgba(174, 0, 255, 0.4)', // Violeta
    'rgba(10, 132, 255, 0.3)', // Azul iOS
    'rgba(255, 0, 85, 0.2)'   // Un toque sutil de rojo/rosa
];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Orb {
    constructor() {
        this.reset();
    }

    reset() {
        this.radius = Math.random() * 150 + 100; // Orbes grandes
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5; // Velocidad muy lenta
        this.vy = (Math.random() - 0.5) * 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.blur = Math.random() * 20 + 10;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Rebote suave
        if (this.x < -100 || this.x > canvas.width + 100) this.vx *= -1;
        if (this.y < -100 || this.y > canvas.height + 100) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        // Crear gradiente radial para suavidad
        let g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        g.addColorStop(0, this.color);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.fillStyle = g;
        // Global Composite Operation para mezclar colores bonito
        ctx.globalCompositeOperation = 'screen'; 
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over'; // Reset
    }
}

function initAnimation() {
    orbs = [];
    for (let i = 0; i < numOrbs; i++) {
        orbs.push(new Orb());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Fondo negro base
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    orbs.forEach(orb => {
        orb.update();
        orb.draw();
    });

    requestAnimationFrame(animate);
}

initAnimation();
animate();

/* --- Slider del Teléfono --- */
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
let currentSlide = 0;
let slideInterval;

function updateSlides() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentSlide) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides();
}

// Botones Manuales
nextBtn.addEventListener('click', () => {
    nextSlide();
    resetTimer();
});
prevBtn.addEventListener('click', () => {
    prevSlide();
    resetTimer();
});

// Auto Play
function startTimer() {
    slideInterval = setInterval(nextSlide, 5000);
}
function resetTimer() {
    clearInterval(slideInterval);
    startTimer();
}

startTimer();
