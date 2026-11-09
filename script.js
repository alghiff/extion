// ==========================================
// 1. SISTEM COUNTDOWN
// ==========================================
const targetDate = new Date("2027-04-20T08:00:00+07:00").getTime();
let timeOffset = 0;

async function syncTimeWithServer() {
    try {
        const response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Jakarta');
        if (!response.ok) throw new Error("API Error");
        const data = await response.json();
        const serverTime = new Date(data.datetime).getTime();
        const clientTime = new Date().getTime();
        timeOffset = serverTime - clientTime;
    } catch (error) {
        timeOffset = 0; 
    }
}

function updateCountdown() {
    const now = new Date().getTime() + timeOffset;
    const distance = targetDate - now;

    if (distance < 0) {
        document.getElementById("countdown").innerHTML = "<span style='font-weight:bold; color:var(--red-accent); font-size: 1.2rem;'>Acara Sedang Berlangsung!</span>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (daysEl && hoursEl && minutesEl && secondsEl) {
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }
}

// ==========================================
// 2. FLOATING AD
// ==========================================
function showAd() {
    const promoPopup = document.getElementById('promo-popup');
    const closePopupBtn = document.getElementById('close-popup-btn');

    if(promoPopup) {
        setTimeout(() => { promoPopup.classList.remove('hidden'); }, 1500); 
    }

    if(closePopupBtn) {
        closePopupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            promoPopup.classList.add('hidden');
        });
    }
}

// ==========================================
// 3. FAQ ACCORDION
// ==========================================
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((details) => {
        const summary = details.querySelector('summary');
        
        summary.addEventListener('click', function(e) {
            e.preventDefault(); 
            
            if (details.classList.contains('is-active')) {
                details.classList.remove('is-active');
                setTimeout(() => { details.removeAttribute('open'); }, 400); 
            } else {
                faqItems.forEach((item) => {
                    if (item !== details && item.classList.contains('is-active')) {
                        item.classList.remove('is-active');
                        setTimeout(() => { item.removeAttribute('open'); }, 400);
                    }
                });
                
                details.setAttribute('open', '');
                requestAnimationFrame(() => {
                    details.classList.add('is-active');
                });
            }
        });
    });
}

// ==========================================
// 4. FLOATING MENU LOGIC
// ==========================================
function initFloatingMenu() {
    const btn = document.getElementById('floating-menu-btn');
    const menu = document.getElementById('floating-nav-menu');

    if(btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('active');
        });

        document.querySelectorAll('.floating-nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
            });
        });
    }
}

// ==========================================
// 5. JALANKAN FUNGSI DASAR
// ==========================================
function initBaseFeatures() {
    syncTimeWithServer();
    updateCountdown();
    setInterval(updateCountdown, 1000);
    initFaqAccordion();
    initFloatingMenu();
}

// ==========================================
// 6. SISTEM LINK RAHASIA
// ==========================================
const secureLinks = {
    'main_reg': 'aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZm9ybXMvZC9lLzFGQUlwUUxTY0QzdHdiM1J2MHMtcmRXRUZoM0VKX3A4YjU5T0ZScUx6MzhweWs3aXBkanlodHlRL3ZpZXdmb3Jt',
    'lcc_reg': 'aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZm9ybXMvZC9lLzFGQUlwUUxTY0QzdHdiM1J2MHMtcmRXRUZoM0VKX3A4YjU5T0ZScUx6MzhweWs3aXBkanlodHlRL3ZpZXdmb3Jt',
    'lcc_guide': 'aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2ZpbGUvZC8xNHR1MUt6TW5nalY2dUx3WENocmhQZlRxMWEzVHVEWS0vdmlldz91c3A9ZHJpdmVfbGluaw==',
    'kaligrafi_reg': 'aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZm9ybXMvZC9lLzFGQUlwUUxTZk1QS0UyZ2U3T0VEWjhGemlBYWZIdmlCQmprY0l1Q0NGVzdyck1GTWdIS0w1RzRnL3ZpZXdmb3JtP3VzcD1wdWJsaXNoLWVkaXRvcg==',
    'kaligrafi_guide': 'aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2ZpbGUvZC8xTVp5aEV5SEIzNjZrd1lVbDlSN3dEUUw1UjJqLW9lUmQvdmlldz91c3A9ZHJpdmVzZGs=',
    'storytelling_reg': 'aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZm9ybXMvZC9lLzFGQUlwUUxTZl93RE1udEJIQkhYSGhaekdUaTFrNl82UlBlSjFOMTNZLXN4UjU2U2JXZG5MVFhBL3ZpZXdmb3Jt',
    'storytelling_guide': 'aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2ZpbGUvZC8xVExJQzZ6em15aE1rOFhYZEYyR0dMdU1TOUtxdU5fZ2Evdmlldz91c3A9ZHJpdmVfbGluaw==',
    'speech_reg': 'aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZm9ybXMvZC9lLzFGQUlwUUxTY2Z6d2FieURGNGhoR0FLYzNWSXNsV2N1bXUzVmVzRmo0ZUpKQnpXdl9YTHEzdUdBL3ZpZXdmb3JtP3VzcD1wdWJsaXNoLWVkaXRvcg==',
    'speech_guide': 'aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2ZpbGUvZC8xOGxac3NMYVpzeHFkVlJJTnJ2UTRmMC0zWFdFQ29Ocnovdmlldz91c3A9ZHJpdmVfbGluaw==',
    'mhq_reg': 'aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZm9ybXMvZC9lLzFGQUlwUUxTY0dpVkRXdWxfck5fZHZwbU1abmJEcXlMZ2wya3d4QXp6eUFQMVBfT1Rra3ZIX3V3L3ZpZXdmb3JtP3VzcD1wdWJsaXNoLWVkaXRvcg==',
    'mhq_guide': 'aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2ZpbGUvZC8xOGNfbk5JREI1Q3hxRUpHc2Zfa3FuaDcyQVFGbHdraEYvdmlldz91c3A9ZHJpdmVfbGluaw==',
    'bizplan_reg': 'aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZm9ybXMvZC9lLzFGQUlwUUxTZjkxNTQydG5uNE9POEJ6akdUSG9oaUZFS1lFazI0TGMyalkwNTdSYVZtYUJsTk13L3ZpZXdmb3JtP3VzcD1wdWJsaXNoLWVkaXRvcg==',
    'bizplan_guide': 'aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2ZpbGUvZC8xeHh5bGZjODEzSnNiVTBMc3Y1azNqbE1RakV0WEpsOHovdmlldz91c3A9ZHJpdmVfbGluaw=='
};

function openSecureLink(key) {
    const encodedUrl = secureLinks[key];
    if (encodedUrl) {
        try {
            const realUrl = atob(encodedUrl);
            window.open(realUrl, '_blank', 'noopener,noreferrer');
        } catch (e) {
            alert("Format link error!");
        }
    } else {
        alert("Link belum tersedia bro!");
    }
}

// ==========================================
// 7. CINEMATIC ANIMATION (GSAP + LENIS)
// ==========================================
function initCinematicAnimation() {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    gsap.registerPlugin(ScrollTrigger);

    gsap.set(".card", { opacity: 0, y: 50 });

    gsap.to(".card", {
        scrollTrigger: {
            trigger: ".competitions-section",
            start: "top 85%",
            toggleActions: "play none none none" 
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        onComplete: () => {
            // OPTIMASI: Vanilla Tilt cuma jalan di Desktop (layar > 768px)
            if (window.innerWidth > 768 && typeof VanillaTilt !== 'undefined') {
                VanillaTilt.init(document.querySelectorAll(".card"), {
                    max: 10,
                    speed: 400,
                    glare: true,
                    "max-glare": 0.2,
                    scale: 1.02
                });
            }
        }
    });

    gsap.from(".about-section img", {
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 85%",
        },
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out"
    });

    gsap.from(".timeline-section img", {
        scrollTrigger: {
            trigger: ".timeline-section",
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });

    // OPTIMASI: Parallax cuma jalan di Desktop
    if (window.innerWidth > 768) {
        gsap.fromTo(".timeline-section .section-image", 
            { y: 30 },
            {
                y: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: ".timeline-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            }
        );
    }

    gsap.from(".faq-item", {
        scrollTrigger: {
            trigger: ".faq-section",
            start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
    });

    // Paksa refresh setelah semuanya beres (termasuk Lazy Load Images)
    setTimeout(() => {
        ScrollTrigger.refresh();
        console.log("ScrollTrigger Refreshed!");
    }, 800);
}

// ==========================================
// 8. CINEMATIC INTRO LOGIC
// ==========================================
function animateHero() {
    gsap.from(".hero h1", { y: 50, opacity: 0, duration: 1, delay: 0.2, ease: "power3.out" });
    gsap.from(".hero p", { y: 30, opacity: 0, duration: 1, delay: 0.4, ease: "power3.out" });
    gsap.from(".countdown-container", { scale: 0.8, opacity: 0, duration: 1, delay: 0.6, ease: "back.out(1.7)" });
}

function initCinematicIntro() {
    const intro = document.getElementById('cinematic-intro');
    
    // Logika sessionStorage (Hapus komentar untuk production)
    /*
    if (sessionStorage.getItem('introPlayed')) {
        intro.style.display = 'none';
        document.body.classList.remove('intro-active');
        animateHero(); 
        showAd(); 
        return;
    }
    */

    document.body.classList.add('intro-active');

    const tl = gsap.timeline({
        onComplete: () => {
            intro.style.display = 'none';
            document.body.classList.remove('intro-active');
            
            // sessionStorage.setItem('introPlayed', 'true');
            
            animateHero();
            showAd(); 
            
            ScrollTrigger.refresh(); 
        }
    });

    tl.to("#intro-welcome", { opacity: 1, duration: 1.5, ease: "power2.inOut" })
      .to("#intro-welcome", { opacity: 0, duration: 1, delay: 1 })
      .to("#intro-to", { opacity: 1, duration: 1, ease: "power2.inOut" })
      .to("#intro-to", { opacity: 0, duration: 1, delay: 1 })
      .fromTo("#intro-logo", 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 2, ease: "power3.out" }
      )
      .to("#cinematic-intro", { opacity: 0, duration: 1.5, delay: 2, ease: "power2.inOut" });

    document.getElementById('skip-intro').addEventListener('click', () => {
        tl.progress(1); 
    });
}

// ==========================================
// 9. JALANKAN SEMUA SAAT SEMUA GAMBAR SELESAI DIMUAT
// ==========================================
window.addEventListener('load', () => {
    initBaseFeatures();
    initCinematicAnimation();
    initCinematicIntro();
});