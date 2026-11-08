// ==========================================
// 1. SISTEM COUNTDOWN (FIX TAHUN 2027)
// ==========================================
// Format ISO: YYYY-MM-DDThh:mm:ss+07:00 (WIB)
// DIPERBAIKI: Tahun menjadi 2027
const targetDate = new Date("2027-04-20T08:00:00+07:00").getTime();

let timeOffset = 0;

// Fungsi sinkronisasi jam dengan server
async function syncTimeWithServer() {
    try {
        const response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Jakarta');
        if (!response.ok) throw new Error("API Error");
        
        const data = await response.json();
        const serverTime = new Date(data.datetime).getTime();
        const clientTime = new Date().getTime();
        
        timeOffset = serverTime - clientTime;
        console.log("✅ Waktu sinkron dengan server. Offset:", timeOffset, "ms");
    } catch (error) {
        console.warn("⚠️ Gagal sinkron waktu server (API down). Menggunakan waktu lokal browser.");
        timeOffset = 0; // Fallback ke waktu lokal jika API mati
    }
}

// Fungsi Update Tampilan Countdown
function updateCountdown() {
    const now = new Date().getTime() + timeOffset;
    const distance = targetDate - now;

    // Jika waktu sudah lewat
    if (distance < 0) {
        document.getElementById("countdown").innerHTML = "<span style='font-weight:bold; color:var(--red-accent); font-size: 1.2rem;'>Acara Sedang Berlangsung!</span>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Pastikan element HTML-nya ada sebelum diubah (mencegah error)
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
// 2. FLOATING AD LOGIC
// ==========================================
function initFloatingAd() {
    const adOverlay = document.getElementById('floating-ad-overlay');
    const closeAdBtn = document.getElementById('close-ad-btn');

    if(adOverlay) {
        adOverlay.classList.remove('hidden');
    }

    if(closeAdBtn) {
        closeAdBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            adOverlay.classList.add('hidden');
        });
    }
}


// ==========================================
// 3. FAQ ACCORDION LOGIC (BARU)
// ==========================================
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((targetDetail) => {
        // Tambahkan event listener saat judul FAQ diklik
        targetDetail.querySelector('summary').addEventListener('click', function() {
            // Looping semua FAQ
            faqItems.forEach((detail) => {
                // Jika FAQ yang diklik BUKAN FAQ ini, maka tutup paksa
                if (detail !== targetDetail) {
                    detail.removeAttribute('open');
                }
            });
        });
    });
}


// ==========================================
// 4. JALANKAN SEMUA FUNGSI SAAT WEB DIMUAT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Jalankan sinkronisasi waktu
    syncTimeWithServer();
    
    // Jalankan Countdown langsung saat dimuat, lalu ulangi tiap 1 detik
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Inisialisasi Iklan & FAQ
    initFloatingAd();
    initFaqAccordion();
});


// ==========================================
// 5. SISTEM LINK RAHASIA (BASE64)
// ==========================================
const secureLinks = {
    'main_reg': 'aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZm9ybXMvZC9lLzFGQUlwUUxTY0QzdHdiM1J2MHMtcmRXRUZoM0VKX3A4YjU5T0ZScUx6MzhweWs3aXBkanlodHlRL3ZpZXdmb3Jt', // Sementara gua arahin ke LCC dulu buat tombol pop-up utama
    
    'lcc_reg': 'aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZm9ybXMvZC9lLzFGQUlwUUxTY0QzdHdiM1J2MHMtcmRXRUZoM0VKX3A4YjU5T0ZScUx6MzhweWs3aXBkanlodHlRL3ZpZXdmb3Jt',
    'lcc_guide': 'aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2ZpbGUvZC8xNHR1MUt6TW5nalY2dUx3WENocmhQZlRxMWEzVHVEWS0vdmlldz91c3A9ZHJpdmVfbGluaw==',
    
    'kaligrafi_reg': 'aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZm9ybXMvZC9lLzFGQUlwUUxTZk1QS0UyZ2U3T0VEWjhGemlBYWZIdmlCQmprY0l1Q0NGVzdyck1GTWdIS0w1RzRnL3ZpZXdmb3JtP3VzcD1wdWJsaXNoLWVkaXRvcg==',
    'kaligrafi_guide': 'aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2ZpbGUvZC8xTVp5aEV5SEIzNjZrd1lVbDlSN3dEUUw1UjJqLW9lUmQvdmlldz91c3A9ZHJpdmVzZGs=',
    
    'storytelling_reg': 'aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZm9ybXMvZC9lLzFGQUlwUUxTZl93RE1udEJIQkhYSGhaekdUaTFrNl82UlBlSjFOMTNZLXN4UjU2U2JXZG5MVFhBL3ZpZXdmb3Jt',
    'storytelling_guide': 'aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2ZpbGUvZC8xVExJQzZ6em15aE1rOFhYZEYyR0dMdU1TOUtxdU5fZ2Evdmlldz91c3A9ZHJpdmVfbGluaw==',
    
    'speech_reg': 'aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZm9ybXMvZC9lLzFGQUlwUUxTY2Z6d2FieURGNGhoR0FLYzNWSXNsV2N1bXUzVmVzRmo0ZUpKQnpXdl9YTHEzdUdBL3ZpZXdmb3JtP3VzcD1wdWJsaXNoLWVkaXRvcg==',
    'speech_guide': 'aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2ZpbGUvZC8xOGxac3NMYVpzeHFkVlJJTnJ2UTRmMC0zWFdFQ29Ocnovdmlldz91c3A9ZHJpdmVfbGluaw==',

    // LINK MHQ (Baru ditambahkan)
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
// 6. PWA SERVICE WORKER
// ==========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => console.log('ServiceWorker berhasil:', registration.scope))
            .catch(err => console.log('ServiceWorker gagal:', err));
    });
}