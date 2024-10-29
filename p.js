document.addEventListener('DOMContentLoaded', () => {
    const empanada = document.getElementById('empanada');
    const clickCounter = document.getElementById('clickCounter');
    const eventMessage = document.getElementById('eventMessage');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const sounds = ['s1.mp3', 's2.mp3', 's3.mp3', 's4.mp3', 's5.mp3', 's14.mp3', 's7.mp3', 's8.mp3', 's9.mp3', 's10.mp3', 's11.mp3', 's12.mp3', 's13.mp3', 's14.mp3'];
    let clicks = 0;
    let eventActive = false;

    backgroundMusic.play();

    empanada.addEventListener('click', () => {
        clicks++;
        clickCounter.textContent = clicks;
        const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
        new Audio(randomSound).play();

        if (!eventActive && Math.random() < 0.1) { // 10% chance to trigger an event
            triggerEvent();
        }
    });

    function triggerEvent() {
        eventActive = true;
        const eventType = Math.random() < 0.5 ? 'quickClicks' : 'greenLight';
        if (eventType === 'quickClicks') {
            eventMessage.textContent = '¡Da 15 clicks en 5 segundos!';
            let quickClicks = 0;
            const quickClickListener = () => {
                quickClicks++;
                if (quickClicks >= 15) {
                    eventMessage.textContent = '¡Evento completado!';
                    empanada.removeEventListener('click', quickClickListener);
                    eventActive = false;
                }
            };
            empanada.addEventListener('click', quickClickListener);
            setTimeout(() => {
                if (quickClicks < 15) {
                    eventMessage.textContent = '¡No lo lograste! Reiniciando contador...';
                    clicks = 0;
                    clickCounter.textContent = clicks;
                }
                empanada.removeEventListener('click', quickClickListener);
                eventActive = false;
            }, 5000);
        } else {
            eventMessage.textContent = '¡Da click si la luz es verde!';
            const greenLight = document.createElement('div');
            greenLight.style.width = '50px';
            greenLight.style.height = '50px';
            greenLight.style.backgroundColor = 'red';
            greenLight.style.margin = '10px auto';
            greenLight.style.borderRadius = '50%';
            document.getElementById('game').appendChild(greenLight);

            setTimeout(() => {
                greenLight.style.backgroundColor = 'green';
                const greenClickListener = () => {
                    eventMessage.textContent = '¡Evento completado!';
                    greenLight.remove();
                    empanada.removeEventListener('click', greenClickListener);
                    eventActive = false;
                };
                empanada.addEventListener('click', greenClickListener);
                setTimeout(() => {
                    if (greenLight && greenLight.style.backgroundColor === 'green') {
                        eventMessage.textContent = '¡No lo lograste! Reiniciando contador...';
                        clicks = 0;
                        clickCounter.textContent = clicks;
                        greenLight.remove();
                        empanada.removeEventListener('click', greenClickListener);
                        eventActive = false;
                    }
                }, 1000);
            }, Math.random() * 3000 + 2000); // Random delay between 2-5 seconds
        }
    }
});