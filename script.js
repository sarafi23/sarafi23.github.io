document.addEventListener('DOMContentLoaded', () => {
    
    /* --- REEMPLAZA EL BLOQUE DEL LOADER (Líneas 4-8) CON ESTO: --- */
    const loader = document.getElementById('loader');
    const textPercent = document.getElementById('loading-text');
    let progress = 0;

    // Esta función se repite cada 25 milisegundos para subir el número
    const interval = setInterval(() => {
        progress++;
        // Actualiza el texto en pantalla
        if (textPercent) {
            textPercent.textContent = `CARGANDO... ${progress}%`;
        }

        // Cuando llega a 100, detiene la cuenta y oculta la pantalla
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
            }, 500); // Espera medio segundo extra al llegar a 100%
        }
    }, 25); // Velocidad de carga (más bajo = más rápido)

    // --- 2. GENERAR PARTÍCULAS FLOTANTES ---
    const particlesContainer = document.getElementById('particles-background');
    const particleCount = 25; 

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('floating-particle');
        
        // Tamaño, posición y animación aleatoria
        const size = Math.random() * 5 + 2; 
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        const duration = Math.random() * 20 + 10; 
        particle.style.animationDuration = `${duration}s`;
        particle.style.opacity = Math.random() * 0.5 + 0.1;

        particlesContainer.appendChild(particle);
    }
    createSpinningTriangles();
    // --- 3. TYPEWRITER (Datos de Alberto) ---
    const textElement = document.getElementById('typing-text');
    const words = ["Desarrollador Full Stack", "Data Analyst", "Entusiasta de IA", "Safari23"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }
    type();

    // --- 4. SCROLL SPY (Menú activo) ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- 5. MODO OSCURO / CLARO ---
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeBtn.querySelector('i');

    // Recuperar preferencia guardada
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
});

function createSpinningTriangles() {
    const ids = ['triangles-background', 'loader-triangles']; // Los dos lugares

    ids.forEach(id => {
        const container = document.getElementById(id);
        if (container) {
            for (let i = 0; i < 15; i++) {
                const t = document.createElement('div');
                t.classList.add('spinning-triangle');
                // Aleatoriedad
                const size = Math.random() * 100 + 50; 
                t.style.width = `${size}px`; t.style.height = `${size}px`;
                t.style.left = `${Math.random() * 100}%`; t.style.top = `${Math.random() * 100}%`;
                t.style.animationDuration = `${Math.random() * 40 + 20}s`;
                t.style.animationDelay = `-${Math.random() * 40}s`;
                container.appendChild(t);
            }
        }
    });
}