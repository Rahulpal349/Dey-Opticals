// Tailwind CSS Configuration
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#FFD700", /* Bright Yellow */
                "primary-dark": "#E6C200",
                "accent": "#FF0000", /* Bright Red */
                "background-light": "#FFFDF0", /* Very light yellow tint */
                "background-dark": "#2E0505", /* Dark Red/Brown */
                "surface-light": "#ffffff",
                "surface-dark": "#4A0404", /* Dark Red Surface */
                "text-main": "#333333",
                "text-muted": "#666666",
            },
            fontFamily: {
                "serif": ["Rozha One", "serif"], /* Indian-style Serif */
                "display": ["Poppins", "sans-serif"] /* Clean modern pairing */
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
        },
    },
}

// Hero Slider Logic
document.addEventListener('DOMContentLoaded', () => {
    console.log("Slider script initialized");

    const slides = document.querySelectorAll('[data-slide]');
    const dots = document.querySelectorAll('#slider-controls button');
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;

    console.log(`Found ${totalSlides} slides and ${dots.length} dots`);

    function showSlide(index) {
        if (totalSlides === 0) return;

        console.log(`Showing slide ${index}`);

        // Reset all slides
        slides.forEach((slide, i) => {
            slide.classList.remove('opacity-100', 'z-10');
            slide.classList.add('opacity-0', 'z-0');
        });

        // Reset all dots
        dots.forEach(dot => {
            dot.classList.remove('bg-white', 'scale-125');
            dot.classList.add('bg-white/50');
        });

        // Activate current slide
        if (slides[index]) {
            slides[index].classList.remove('opacity-0', 'z-0');
            slides[index].classList.add('opacity-100', 'z-10');
        } else {
            console.error(`Slide ${index} not found`);
        }

        // Activate current dot
        if (dots[index]) {
            dots[index].classList.remove('bg-white/50');
            dots[index].classList.add('bg-white', 'scale-125');
        }

        currentSlide = index;
    }

    function nextSlide() {
        console.log("Next slide triggered");
        let next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }

    function startTimer() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        console.log("Timer started");
    }

    // Expose goToSlide globally so HTML onclick works
    window.goToSlide = function (index) {
        console.log(`Manual navigation to ${index}`);
        showSlide(index);
        clearInterval(slideInterval);
        startTimer();
    }

    if (totalSlides > 0) {
        startTimer();
    } else {
        console.error("No slides found to initialize timer");
    }
});
