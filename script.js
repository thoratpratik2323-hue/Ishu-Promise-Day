document.addEventListener('DOMContentLoaded', () => {

    const promises = [
        {
            icon: "🌏",
            title: "Distance Means Nothing",
            text: "No matter how many miles separate us, you are always the closest person to my heart. My love travels faster than any flight! ✈️"
        },
        {
            icon: "📞",
            title: "One Call Away",
            text: "I promise to prioritize your calls (even when I'm sleepy or busy!). Hearing your voice is the best part of my day."
        },
        {
            icon: "💑",
            title: "Wait for You",
            text: "I promise that every second of waiting will be worth it when I finally get to hold you in my arms again. The hug will be magical! ✨"
        },
        {
            icon: "🤞",
            title: "Trust & Loyalty",
            text: "I promise to be faithful, honest, and completely yours, even when we are cities apart. You are my only one. 🔒"
        },
        {
            icon: "👑",
            title: "My Queen",
            text: "Even from afar, I promise to treat you like the Queen you are. You rule my world, my phone, and my heart! 💖"
        },
        {
            icon: "😂",
            title: "Silly Moments",
            text: "I promise to send you ugly snaps, funny reels, and bad jokes just to see that beautiful smile of yours."
        },
        {
            icon: "💍",
            title: "Forever Us",
            text: "This distance is temporary, but WE are permanent. I promise to make 'One Day' into 'Day One' of our life together."
        }
    ];

    let currentCardIndex = 0;
    const cardSlider = document.getElementById('cardSlider');
    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicBtn');
    let isPlaying = false;

    // --- Init Slider ---
    function renderCards() {
        cardSlider.innerHTML = '';
        promises.forEach((promise, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            // Set initial state based on index
            if (index === 0) {
                card.classList.add('active');
                card.style.transform = 'translate(-50%, -50%) scale(1)';
                card.style.opacity = '1';
                card.style.zIndex = '10';
            } else {
                card.style.transform = 'translate(100%, -50%) scale(0.8) rotate(10deg)';
                card.style.opacity = '0';
                card.style.zIndex = '5';
            }

            card.innerHTML = `
                <div class="card-icon">${promise.icon}</div>
                <h3>${promise.title}</h3>
                <p>“${promise.text}”</p>
                <div class="card-number">${index + 1} / ${promises.length}</div>
            `;
            cardSlider.appendChild(card);
        });
    }

    renderCards();

    // --- Navigation Logic ---
    function updateCards() {
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            if (index === currentCardIndex) {
                card.className = 'card active';
                card.style.transform = 'translate(-50%, -50%) scale(1)';
                card.style.opacity = '1';
                card.style.zIndex = '10';
            } else if (index < currentCardIndex) {
                card.className = 'card';
                card.style.transform = 'translate(-200%, -50%) scale(0.8) rotate(-10deg)';
                card.style.opacity = '0';
                card.style.zIndex = '5';
            } else {
                card.className = 'card';
                card.style.transform = 'translate(100%, -50%) scale(0.8) rotate(10deg)';
                card.style.opacity = '0';
                card.style.zIndex = '5';
            }
        });
    }

    document.getElementById('nextBtn').addEventListener('click', () => {
        if (currentCardIndex < promises.length - 1) {
            currentCardIndex++;
            updateCards();
        }
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentCardIndex > 0) {
            currentCardIndex--;
            updateCards();
        }
    });

    // --- Enter Button ---
    document.getElementById('enterBtn').addEventListener('click', () => {
        document.getElementById('overlay').style.opacity = '0';

        // Try Auto Play Music immediately on click
        bgMusic.play().then(() => {
            isPlaying = true;
            musicBtn.textContent = "⏸️ Pause Music";
            musicBtn.classList.add('playing');
        }).catch(e => console.log("Audio play blocked", e));

        setTimeout(() => {
            document.getElementById('overlay').style.display = 'none';
            document.getElementById('mainContainer').classList.remove('hidden-content');
            document.getElementById('mainContainer').classList.add('visible');
        }, 1000);
    });

    // --- Fingerprint Scanner Logic ---
    const scanner = document.getElementById('fingerprintBtn');
    const statusText = document.getElementById('scanStatus');
    const scanBeam = document.querySelector('.scan-beam');
    let scanTimer;
    let isScanned = false;

    function startScan(e) {
        if (isScanned) return;
        e.preventDefault(); // Prevent text selection or scrolling

        scanner.classList.add('scanning');
        scanBeam.style.animation = 'scanMove 1s linear infinite';
        statusText.textContent = "Scanning Biometrics... Hold Still...";
        statusText.style.color = "#00e676";

        // Hold for 2 seconds to verify
        scanTimer = setTimeout(() => {
            completeScan();
        }, 2000);
    }

    function stopScan() {
        if (isScanned) return;

        clearTimeout(scanTimer);
        scanner.classList.remove('scanning');
        scanBeam.style.animation = 'none';

        statusText.textContent = "Scan Failed. Keep holding to verify.";
        statusText.style.color = "#ff5252";

        setTimeout(() => {
            if (!isScanned) {
                statusText.textContent = "Waiting for finger...";
                statusText.style.color = "#aaa";
            }
        }, 1500);
    }

    function completeScan() {
        isScanned = true;
        scanner.classList.remove('scanning');
        scanner.style.borderColor = "#00e676";
        scanner.style.boxShadow = "0 0 30px #00e676";
        statusText.textContent = "Access Granted. Promise Sealed.";

        // Trigger Celebration
        for (let i = 0; i < 60; i++) {
            createSparkle();
        }

        setTimeout(() => {
            const finalMsg = document.getElementById('finalMessage');
            finalMsg.classList.remove('hidden');
            finalMsg.style.animation = 'scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        }, 800);
    }

    // Mouse Events
    scanner.addEventListener('mousedown', startScan);
    scanner.addEventListener('mouseup', stopScan);
    scanner.addEventListener('mouseleave', stopScan);

    // Touch Events (for Mobile)
    scanner.addEventListener('touchstart', startScan);
    scanner.addEventListener('touchend', stopScan);

    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = ['✨', '🔒', '💖', '⭐'][Math.floor(Math.random() * 4)];
        sparkle.style.position = 'fixed';
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = Math.random() * window.innerHeight + 'px';
        sparkle.style.fontSize = (Math.random() * 20 + 10) + 'px';
        sparkle.style.color = '#ffd700'; // Gold
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.textShadow = '0 0 10px #fff';

        // Random float up animation
        const duration = Math.random() * 2 + 1;
        sparkle.style.transition = `all ${duration}s ease-out`;
        sparkle.style.opacity = '0';
        sparkle.style.transform = `translateY(-100px) scale(0)`;

        document.body.appendChild(sparkle);

        // Trigger animation in next frame
        requestAnimationFrame(() => {
            sparkle.style.opacity = '1';
            sparkle.style.transform = `translateY(-${Math.random() * 200 + 50}px) scale(1.5)`;
            setTimeout(() => {
                sparkle.style.opacity = '0';
            }, duration * 1000 - 500);
        });

        setTimeout(() => {
            sparkle.remove();
        }, duration * 1000);
    }

    // Music Button Logic
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.textContent = "🎵 Play Music";
            musicBtn.classList.remove('playing');
            isPlaying = false;
        } else {
            bgMusic.play().then(() => {
                musicBtn.textContent = "⏸️ Pause Music";
                musicBtn.classList.add('playing');
                isPlaying = true;
            });
        }
    });

    // --- Virtual Hug Logic ---
    const hugBtn = document.getElementById('hugBtn');
    const hugOverlay = document.getElementById('hugOverlay');

    function hideHug() {
        hugOverlay.style.display = 'none';
        hugOverlay.classList.add('hidden');
        // Auto scroll to Contract section
        const contract = document.querySelector('.contract-container');
        if (contract) {
            contract.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    hugBtn.addEventListener('click', () => {
        hugOverlay.classList.remove('hidden');
        hugOverlay.style.display = 'flex';

        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200, 100, 500]);
        }

        // Auto-hide after 3 seconds
        setTimeout(hideHug, 3000);
    });

    // Click anywhere on overlay to close it
    hugOverlay.addEventListener('click', hideHug);

});
