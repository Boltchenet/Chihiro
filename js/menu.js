// menu.js
document.addEventListener('DOMContentLoaded', function() {
    // Données des menus
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

    // Éléments DOM
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
            
            // Ajouter un événement pour la lightbox
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
            // Mettre à jour le bouton actif
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Afficher les éléments de la catégorie
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
});