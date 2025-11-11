document.addEventListener('DOMContentLoaded', function() {
    const voicesContainer = document.getElementById('voices-container');
    if (!voicesContainer) {
        return;
    }

    const voices = Array.from(voicesContainer.querySelectorAll('.voice-item'));
    const initialDividers = document.querySelectorAll('#initial-dividers hr');

    if (voices.length === 0) {
        return;
    }

    function updateHighlight() {
        const screenCenter = window.innerHeight / 2;
        let activeIndex = -1;

        voices.forEach((voice, index) => {
            const rect = voice.getBoundingClientRect();
            if (rect.top < screenCenter && rect.bottom > screenCenter) {
                activeIndex = index;
            }
        });

        voices.forEach((voice, index) => {
            if (index === activeIndex) {
                voice.classList.add('voices-scroll-highlight');
            } else {
                voice.classList.remove('voices-scroll-highlight');
            }
        });

        const allDividersInItems = voicesContainer.querySelectorAll('.voice-item hr');
        allDividersInItems.forEach(hr => hr.classList.remove('hr-highlight'));
        initialDividers.forEach(hr => hr.classList.remove('hr-highlight'));

        if (activeIndex !== -1) {
            const dividersBelow = voices[activeIndex].querySelectorAll('hr');
            dividersBelow.forEach(hr => hr.classList.add('hr-highlight'));

            if (activeIndex === 0) {
                initialDividers.forEach(hr => hr.classList.add('hr-highlight'));
            } else {
                const dividersAbove = voices[activeIndex - 1].querySelectorAll('hr');
                dividersAbove.forEach(hr => hr.classList.add('hr-highlight'));
            }
        }
    }

    window.addEventListener('scroll', updateHighlight);
    updateHighlight();
});