document.addEventListener('DOMContentLoaded', () => {
    const empanada = document.getElementById('empanada');
    const clickCounter = document.getElementById('clickCounter');
    const eventMessage = document.getElementById('eventMessage');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const alarmSound = document.getElementById('alarmSound');
    const tntSound = document.getElementById('tntSound');
    const toggleImage = document.getElementById('toggleImage');
    const amongUsContainer = document.getElementById('amongUsContainer');
    const sounds = Array.from({ length: 16 }, (_, i) => `s${i + 1}.mp3`);
    let clicks = 0;
    let eventActive = false;
    let empanadaImage = true;
    let doublePoints = false;

    backgroundMusic.play();

    empanada.addEventListener('click', () => {
        clicks += doublePoints ? 2 : 1;
        clickCounter.textContent = clicks;
        const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
        new Audio(randomSound).play();

        if (!eventActive && Math.random() < 0.1) { // 10% chance to trigger an event
            triggerEvent();
        }
    });

    toggleImage.addEventListener('click', () => {
        empanada.src = empanadaImage ? 'remove.png' : 'empanada.png';
        empanadaImage = !empanadaImage;
    });

    function triggerEvent() {
        eventActive = true;
        alarmSound.play();
        const eventType = Math.random();
        if (eventType < 0.33) {
            quickClickEvent();
        } else if (eventType < 0.66) {
            mineEvent();
        } else {
            doublePointsEvent();
        }
        showAmongUs();
    }

    function quickClickEvent() {
        eventMessage.textContent = '¡Haz click 10 veces en 3 segundos!';
        let quickClicks = 0;
        const quickClickListener = () => {
            quickClicks++;
            if (quickClicks >= 10) {
                eventMessage.textContent = '¡Evento completado!';
                empanada.removeEventListener('click', quickClickListener);
                eventActive = false;
            }
        };
        empanada.addEventListener('click', quickClickListener);
        setTimeout(() => {
            if (quickClicks < 10) {
                eventMessage.textContent = '¡No lo lograste! Reiniciando contador...';
                clicks = 0;
                clickCounter.textContent = clicks;
            }
            empanada.removeEventListener('click', quickClickListener);
            eventActive = false;
        }, 3000);
    }

    function mineEvent() {
        eventMessage.textContent = '¡No hagas click en 3 segundos!';
        const mineTimeout = setTimeout(() => {
            eventMessage.textContent = '¡Evento completado!';
            eventActive = false;
        }, 3000);

        const mineClickListener = () => {
            if (eventActive) {
                eventMessage.textContent = '¡Perdiste! Reiniciando contador...';
                tntSound.play();
                clicks = 0;
                clickCounter.textContent = clicks;
                clearTimeout(mineTimeout);
                empanada.removeEventListener('click', mineClickListener);
                eventActive = false;
            }
        };
        empanada.addEventListener('click', mineClickListener);
        setTimeout(() => {
            empanada.removeEventListener('click', mineClickListener);
            eventActive = false;
        }, 3000);
    }

    function doublePointsEvent() {
        eventMessage.textContent = '¡Puntos dobles por 5 segundos!';
        doublePoints = true;
        const doublePointsSound = new Audio('x2.mp3');
        doublePointsSound.play();
        setTimeout(() => {
            doublePoints = false;
            eventMessage.textContent = '¡Evento completado!';
            eventActive = false;
        }, 5000);
    }

    function showAmongUs() {
        const amongUs = document.createElement('img');
        amongUs.src = 'poto.gif';
        amongUs.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
        amongUs.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
        amongUsContainer.appendChild(amongUs);
        setTimeout(() => amongUs.remove(), 3000);
    }
});

