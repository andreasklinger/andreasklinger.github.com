document.addEventListener('DOMContentLoaded', function() {

    // --- KONFIGURATION ---
    const imageCount = 100;
    const imagePath = 'https://feliperude.github.io/prototype/HeaderVideo/';
    const imagePrefix = 'Medusa_7_';
    const imageExtension = 'webp';

    // --- ELEMENTE HOLEN ---
    const canvas = document.getElementById('scroll-canvas');
    const context = canvas.getContext('2d');
    const scrollContainer = document.querySelector('.video-scroll-container');
    const preloader = document.getElementById('preloader');

    if (!canvas || !scrollContainer || !preloader) {
        console.error('Ein benötigtes Element (Canvas, Scroll-Container oder Preloader) wurde nicht gefunden!');
        return;
    }       

    // Scrollen blockieren, bis alles geladen ist
    document.body.classList.add('no-scroll');
    window.scrollTo(0, 0);

    const preloadedImages = [];
    let loadedImages = 0;

    function preloadImages() {
        for (let i = 1; i <= imageCount; i++) {
            const img = new Image();
            img.src = `${imagePath}${imagePrefix}${i}.${imageExtension}`;
            
            img.onload = () => {
                loadedImages++;
                if (loadedImages === imageCount) {
                    initializeApp();
                }
            };

            img.onerror = () => {
                console.error(`Fehler beim Laden von Bild: ${img.src}`);
            };

            preloadedImages[i - 1] = img;
        }
    }
    
    function initializeApp() {
        hidePreloader();
        // Die Canvas-Größe initial setzen und bei Fensteränderung anpassen
        resizeCanvas();
        initializeScrollAnimation();
    }

    function hidePreloader() {
        document.body.classList.remove('no-scroll');
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 750);
    }
    
    function drawImageToCover(img) {
        if (!img || !img.naturalWidth || img.naturalWidth === 0) return;
        
        context.clearRect(0, 0, canvas.width, canvas.height);

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgWidth = img.naturalWidth;
        const imgHeight = img.naturalHeight;
        const canvasAspect = canvasWidth / canvasHeight;
        const imgAspect = imgWidth / imgHeight;
        
        let sx, sy, sWidth, sHeight;

        if (imgAspect > canvasAspect) {
            sHeight = imgHeight;
            sWidth = sHeight * canvasAspect;
            sx = (imgWidth - sWidth) / 2;
            sy = 0;
        } else {
            sWidth = imgWidth;
            sHeight = sWidth / canvasAspect;
            sx = 0;
            sy = (imgHeight - sHeight) / 2;
        }
        
        context.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, canvasWidth, canvasHeight);
    }

    function getCurrentFrame() {
        const scrollDistance = scrollContainer.offsetHeight - window.innerHeight;
        // Verhindert eine Division durch Null, falls der Container nicht größer als das Fenster ist
        if (scrollDistance <= 0) {
            return preloadedImages[0];
        }
        const scrollTop = window.scrollY;
        const scrollPercent = Math.min(1, Math.max(0, scrollTop / scrollDistance));
        
        let frameIndex = Math.floor(scrollPercent * (imageCount - 1));
        return preloadedImages[frameIndex];
    }

    function redrawCurrentImage() {
        const frame = getCurrentFrame();
        if (frame) {
            drawImageToCover(frame);
        }
    }

    function initializeScrollAnimation() {
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    redrawCurrentImage();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth; 
        canvas.height = window.innerHeight;
        redrawCurrentImage();
    }
    
    // --- STARTPUNKT DER ANWENDUNG ---
    window.addEventListener('resize', resizeCanvas);
    preloadImages(); // Startet den Ladevorgang
});