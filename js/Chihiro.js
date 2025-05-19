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
            {
                rating: 5,
                author: "Jean D.",
                text: "Un véritable voyage au Japon ! Les sushis sont frais et délicieux, le service est impeccable.",
                date: "Il y a 2 semaines"
            },
            {
                rating: 4.5,
                author: "Marie L.",
                text: "Ambiance très agréable et plats authentiques. Le ramen est à tomber ! Je recommande vivement.",
                date: "Il y a 1 mois"
            },
            {
                rating: 5,
                author: "Thomas P.",
                text: "Meilleur restaurant japonais de Paris ! Les tempuras sont légers et croustillants à souhait.",
                date: "Il y a 3 semaines"
            }
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

    // Galerie de menu
    const menuData = {
        sushi: [
            {
                title: "Assortiment Sushi",
                description: "10 pièces de sushi variés (saumon, thon, crevette, etc.)",
                price: "18,50 €",
                image: "images/sushi-assortment.jpg"
            },
            {
                title: "Sashimi Saumon",
                description: "8 tranches de saumon frais",
                price: "16,00 €",
                image: "images/salmon-sashimi.jpg"
            },
            {
                title: "Maki California",
                description: "8 pièces de maki au crabe, avocat et concombre",
                price: "12,50 €",
                image: "images/california-maki.jpg"
            }
        ],
        ramen: [
            {
                title: "Ramen Tonkotsu",
                description: "Bouillon de porc, nouilles, œuf mollet, naruto, porc effiloché",
                price: "14,50 €",
                image: "images/tonkotsu-ramen.jpg"
            },
            {
                title: "Ramen Miso",
                description: "Bouillon miso, nouilles, œuf, champignons, pousses de bambou",
                price: "13,50 €",
                image: "images/miso-ramen.jpg"
            }
        ],
        entrees: [
            {
                title: "Edamame",
                description: "Fèves de soja fraîches légèrement salées",
                price: "5,50 €",
                image: "images/edamame.jpg"
            },
            {
                title: "Gyozas",
                description: "6 raviolis japonais fourrés au porc et légumes",
                price: "7,50 €",
                image: "images/gyozas.jpg"
            }
        ]
    };

    // Éléments du menu
    const menuGrid = document.querySelector('.menu-grid');
    const categoryButtons = document.querySelectorAll('.menu-category-btn');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const closeLightbox = document.querySelector('.lightbox-close');

    // Afficher les éléments du menu
    function displayMenuItems(category) {
        menuGrid.innerHTML = '';
        
        menuData[category].forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="menu-item-img">
                <div class="menu-item-info">
                    <h3 class="menu-item-title">${item.title}</h3>
                    <p class="menu-item-desc">${item.description}</p>
                    <p class="menu-item-price">${item.price}</p>
                </div>
            `;
            
            // Lightbox
            const img = menuItem.querySelector('.menu-item-img');
            img.addEventListener('click', () => {
                lightboxImg.src = item.image;
                lightboxImg.alt = item.title;
                lightbox.classList.add('active');
            });
            
            menuGrid.appendChild(menuItem);
        });
    }

    // Gestion des catégories
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            displayMenuItems(category);
        });
    });

    // Lightbox
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // Afficher la première catégorie par défaut
    if (categoryButtons.length > 0) {
        categoryButtons[0].click();
    }

    // Appel de la fonction pour charger les avis
    loadGoogleReviews();
});