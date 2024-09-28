let slider = document.querySelector('.reviews-slider');
let scrollAmount = 0;

document.querySelector('.nav-next').addEventListener('click', () => {
    let scrollWidth = slider.scrollWidth - slider.clientWidth; // Total scrollable width
    if (scrollAmount < scrollWidth) {
        scrollAmount += 300; // Scroll by 300px
        slider.style.transform = `translateX(-${scrollAmount}px)`;
    }
});

document.querySelector('.nav-prev').addEventListener('click', () => {
    if (scrollAmount > 0) {
        scrollAmount -= 300; // Scroll back by 300px
        slider.style.transform = `translateX(-${scrollAmount}px)`;
    }
});





 