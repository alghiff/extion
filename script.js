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
function initFloatingAd() {
    const promoPopup = document.getElementById('promo-popup');
    const closePopupBtn = document.getElementById('close-popup-btn');

    if(promoPopup) {
        setTimeout(() => { promoPopup.classList.remove('hidden'); }, 1000); 
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
// 3. LOGIKA NAVBAR MOBILE
// ==========================================
function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if(menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// ==========================================
// 4. FAQ ACCORDION
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
// 5. JALANKAN SEMUA FUNGSI
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    syncTimeWithServer();
    updateCountdown();
    setInterval(updateCountdown, 1000);
    initFloatingAd();
    initFaqAccordion();
    initMobileMenu();
});

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
// 7. PWA SERVICE WORKER
// ==========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => console.log('ServiceWorker berhasil:', registration.scope))
            .catch(err => console.log('ServiceWorker gagal:', err));
    });
}