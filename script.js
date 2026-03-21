document.addEventListener("DOMContentLoaded", () => {
    // Navbar Scroll Effect (glassmorphism switch)
    const navbar = document.getElementById("navbar");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Intersection Observer for Framer-Motion-like Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Activa cuando el 15% del elemento es visible
    };

    const animateObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adds 'in-view' class which triggers CSS transforms/opacities
                entry.target.classList.add('in-view');
                // Unobserver after showing once (like viewport={{ once: true }})
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-right');
    animatedElements.forEach(el => animateObserver.observe(el));

    // Smooth Scroll for Internal Anchors
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});
