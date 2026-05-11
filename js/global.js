// global.js - universal functions untuk Lyskal (dengan cursor trail)

(function() {
    // 1. Partikel emas statis + interaksi repel mouse
    function initParticles() {
        const particleCount = 80;
        const body = document.body;
        const particles = [];
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('dust-particle');
            const size = Math.random() * 6 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = Math.random() * 14 + 7 + 's';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationTimingFunction = 'cubic-bezier(0.4, 0, 0.6, 1)';
            body.appendChild(particle);
            particles.push(particle);
        }

        let mouseX = 0, mouseY = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            particles.forEach(p => {
                if (!p.dataset.originX) {
                    const rect = p.getBoundingClientRect();
                    p.dataset.originX = rect.left + rect.width / 2;
                    p.dataset.originY = rect.top + rect.height / 2;
                }
                let origX = parseFloat(p.dataset.originX);
                let origY = parseFloat(p.dataset.originY);
                let dx = mouseX - origX;
                let dy = mouseY - origY;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 300) {
                    let force = (1 - dist / 300) * 12;
                    let angle = Math.atan2(dy, dx);
                    let moveX = Math.cos(angle) * force;
                    let moveY = Math.sin(angle) * force;
                    p.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
                } else {
                    p.style.transform = '';
                }
            });
        });
    }

    // 2. Kursor kustom (daun maple)
    function initCursor() {
        const cursorDiv = document.createElement('div');
        cursorDiv.className = 'custom-cursor';
        cursorDiv.innerHTML = '<i class="fas fa-leaf"></i>';
        document.body.appendChild(cursorDiv);
        document.addEventListener('mousemove', (e) => {
            cursorDiv.style.left = e.clientX + 'px';
            cursorDiv.style.top = e.clientY + 'px';
        });
    }

    // 3. Trail partikel emas di belakang kursor
    function initCursorTrail() {
        const trailLength = 15;      // jumlah titik jejak
        const trailElements = [];
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '9997';
        document.body.appendChild(container);

        for (let i = 0; i < trailLength; i++) {
            const dot = document.createElement('div');
            dot.style.position = 'absolute';
            dot.style.width = '5px';
            dot.style.height = '5px';
            dot.style.backgroundColor = '#ffd966';
            dot.style.borderRadius = '50%';
            dot.style.opacity = '0';
            dot.style.transition = 'opacity 0.15s ease-out';
            dot.style.filter = 'blur(1px)';
            dot.style.boxShadow = '0 0 4px gold';
            container.appendChild(dot);
            trailElements.push({ element: dot, active: false });
        }

        let index = 0;
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            const trail = trailElements[index];
            trail.element.style.left = (x - 2.5) + 'px';
            trail.element.style.top = (y - 2.5) + 'px';
            trail.element.style.opacity = '0.8';
            trail.active = true;
            setTimeout(() => {
                if (trail.active) {
                    trail.element.style.opacity = '0';
                    trail.active = false;
                }
            }, 150);
            index = (index + 1) % trailLength;
        });
    }

    // 4. Progress bar scroll (dengan persentase)
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
        
        const percentDiv = document.createElement('div');
        percentDiv.className = 'scroll-percent';
        percentDiv.innerText = '0%';
        document.body.appendChild(percentDiv);
        
        window.addEventListener('scroll', () => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = height ? (winScroll / height) * 100 : 0;
            progressBar.style.width = scrolled + '%';
            percentDiv.innerText = Math.floor(scrolled) + '%';
        });
    }

    // 5. Tombol kembali ke atas
    function initScrollTopButton() {
        const btn = document.createElement('div');
        btn.className = 'scroll-top-btn';
        btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(btn);
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btn.classList.add('show');
            } else {
                btn.classList.remove('show');
            }
        });
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 6. Observasi fade-scroll (Bisa dua arah, bisa permanen)
    function initFadeScroll() {
        const fadeElements = document.querySelectorAll('.fade-scroll');
        if (fadeElements.length) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Jika masuk layar, munculkan!
                        entry.target.classList.add('visible');
                    } else {
                        // Jika keluar layar, hilangkan... KECUALI dia punya class 'stay-visible'
                        if (!entry.target.classList.contains('stay-visible')) {
                            entry.target.classList.remove('visible');
                        }
                    }
                });
            }, { threshold: 0.1 }); 
            
            fadeElements.forEach(el => observer.observe(el));
        }
    }

    // Jalankan semua saat DOM siap
    document.addEventListener('DOMContentLoaded', () => {
        initParticles();
        initCursor();
        initCursorTrail();   // trail aktif
        initScrollProgress();
        initScrollTopButton();
        initFadeScroll();
    });
})();