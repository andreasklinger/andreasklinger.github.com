$(document).ready(function() {
    const hoverContainer = $('#hover-image-container');
    const hoverImage = hoverContainer.find('img');
    
    // --- HOVER-LOGIK FÜR DESKTOP ---
    $('tbody tr').on('mouseenter', function() {
        // Ignorieren, wenn ein Bild durch Klick "sticky" ist
        if (hoverContainer.hasClass('is-sticky')) return;
        
        const imagePath = $(this).data('image');
        hoverImage.attr('src', imagePath);
        hoverContainer.addClass('is-visible');
    });
    
    $('tbody tr').on('mousemove', function(e) {
        // Ignorieren, wenn ein Bild durch Klick "sticky" ist
        if (hoverContainer.hasClass('is-sticky')) return;
        
        let posX = e.clientX + 30;
        let posY = e.clientY - 30;
        
        hoverContainer.css({
            'left': posX + 'px',
            'top': posY + 'px',
            'transform': 'none'
        });
    });
    
    $('tbody').on('mouseleave', function() {
        // Nur ausblenden, wenn nicht "sticky"
        if (!hoverContainer.hasClass('is-sticky')) {
            hoverContainer.removeClass('is-visible');
        }
    });
});