document.addEventListener('DOMContentLoaded', function() {
    // Menu Hamburger
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');

    hamburger.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        hamburger.innerHTML = mobileNav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Fermer le menu quand un lien est cliqué
    const navLinks = document.querySelectorAll('.mobile-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Smooth scrolling pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animation des sections au scroll
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Chargement dynamique des avis Google (simulation)
    function loadGoogleReviews() {
        // En production, vous pourriez utiliser l'API Google Places
        // Ceci est une simulation avec des données statiques
        const reviews = [
                  ];

        const reviewsContainer = document.querySelector('.reviews-container');
        
        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'google-review';
            
            // Création des étoiles
            let stars = '';
            for (let i = 0; i < 5; i++) {
                if (i < review.rating) {
                    stars += '<i class="fas fa-star"></i>';
                } else {
                    stars += '<i class="far fa-star"></i>';
                }
            }

            reviewElement.innerHTML = `
                <div class="review-header">
                    <div class="review-stars">${stars}</div>
                    <div class="review-author">${review.author}</div>
                </div>
                <div class="review-content">"${review.text}"</div>
                <div class="review-date">${review.date}</div>
            `;
            
            reviewsContainer.appendChild(reviewElement);
        });
    }

    // Appel de la fonction pour charger les avis
    loadGoogleReviews();
});