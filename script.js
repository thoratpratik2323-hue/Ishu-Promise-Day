document.addEventListener('DOMContentLoaded', () => {

    const promises = [
        { title: "Promise #1", text: "I promise to prioritize your smile in every situation." },
        { title: "Promise #2", text: "I promise to listen to your silence when words aren't enough." },
        { title: "Promise #3", text: "I promise to be your biggest cheerleader in all your dreams." },
        { title: "Promise #4", text: "I promise to hug you tight even when we are arguing." },
        { title: "Promise #5", text: "I promise to never let you feel alone, even for a second." },
        { title: "Promise #6", text: "I promise to respect your choices and support your freedom." },
        { title: "Promise #7", text: "I promise, above all, to love you more each and every day... Forever." },
        // A silly one for fun?
        { title: "Bonus Promise", text: "I promise to share my chocolates (sometimes). 😉" }
    ];

    const container = document.getElementById('promise-container');
    const stack = document.querySelector('.card-stack');
    const startScreen = document.getElementById('start-screen');
    const finalScreen = document.getElementById('final-screen');
    const bgm = document.getElementById('bgm');

    let currentIndex = 0;

    // --- Create Cards ---
    // Create them in reverse order so the first is on top (z-index)
    // Actually in DOM, last is on top unless z-index specified.
    // Let's create normally and manage z-index or reverse rendering.
    // Better: Render ALL, giving decreasing z-index.

    promises.forEach((p, i) => {
        const card = document.createElement('div');
        card.classList.add('p-card');
        card.style.zIndex = promises.length - i;
        card.innerHTML = `
            <h2>${p.title}</h2>
            <div class="emoji">🤞</div>
            <p>${p.text}</p>
        `;
        // Add click listener
        card.addEventListener('click', () => {
            if (i === currentIndex) {
                swipeCard(card);
            }
        });
        stack.appendChild(card);
    });

    window.startPromises = function () {
        startScreen.classList.add('hidden');
        container.classList.remove('hidden');
        bgm.play().catch(e => console.log("Audio needs interaction"));

        // Intro animation
        const cards = document.querySelectorAll('.p-card');
        cards.forEach((c, i) => {
            c.style.transform = `rotate(${(Math.random() * 10) - 5}deg) translateY(100vh)`;
            setTimeout(() => {
                c.style.transform = `rotate(${(Math.random() * 6) - 3}deg) translateY(0)`;
            }, i * 200);
        });
    }

    function swipeCard(card) {
        // Random direction swipe
        const dir = Math.random() > 0.5 ? 'swiped-right' : 'swiped-left';
        card.classList.add(dir);

        // Sound effect (optional)

        currentIndex++;

        // Check if last
        if (currentIndex >= promises.length) {
            setTimeout(() => {
                container.classList.add('hidden');
                finalScreen.classList.remove('hidden');
                launchConfetti();
            }, 600);
        }
    }

    function launchConfetti() {
        var duration = 3 * 1000;
        var end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }

});
