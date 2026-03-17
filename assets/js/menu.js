document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');
    const menuContainer = document.querySelector('.row.g-4');
    const cartBadge = document.getElementById('cart-badge');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

   

    // Update Cart Badge
    const updateCartBadge = () => {
        cartBadge.textContent = cart.length;
    };

    // Generate Menu HTML
    const generateMenuHTML = (items) => items.map(item => `
        <div class="col-lg-3 col-md-6 col-sm-6 menu-item" data-category="${item.category}">
    <div class="card h-100">
        <img src="${item.imageUrl}" class="card-img-top" alt="${item.name}">
        <div class="card-body">
            <h5 class="card-title"><img width="30" height="30"
                src="https://img.icons8.com/color/48/vegetarian-food-symbol.png" alt="vegetarian-food-symbol" />${item.name}</h5>
            <p class="card-text text-muted">${item.description}</p>
            <div class="d-flex justify-content-between align-items-center">
                <span class="price text-success">${item.price}</span>
                <button class="btn-group menubtn btn-sm order-now-btn">Order Now</button>
                <div class="d-flex align-items-center">
                    <span class="badge bg-success me-2 rating">${item.rating}</span>
                    <i class="bi bi-heart"></i>
                    <button class="cart-btn btn-sm ms-2">
                        <img src="https://img.icons8.com/?size=100&id=fJmit3g8fEh5&format=png&color=000000" width="35" height="35" alt="Cart" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
    `).join('');

    // Display Menu Items
    const displayMenu = (items) => {
        menuContainer.innerHTML = items.length ? generateMenuHTML(items) : '<p>No items found.</p>';
    };

    // Filter Menu by Category
    const filterMenu = (category) => {
        const query = searchInput.value.toLowerCase();
        const filteredItems = menuItems.filter(item =>
            (category === 'all' || item.category === category) && item.name.toLowerCase().includes(query)
        );
        displayMenu(filteredItems);
    };

    // Search Menu Items
    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    };

    const searchMenu = debounce(() => {
        const activeCategory = document.querySelector('.filter-btn.active').getAttribute('data-category');
        filterMenu(activeCategory);
    }, 300);

    // Add to Cart
    const addToCart = (menuItem) => {
        const item = {
            title: menuItem.querySelector('.card-title').innerText,
            price: parseFloat(menuItem.querySelector('.price').innerText.replace('Rs.', '')),
            image: menuItem.querySelector('img').src
        };
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${item.title} added to cart!`);
        updateCartBadge();
    };
    document.getElementById('view-cart-btn').addEventListener('click', function () {
        window.location.href = 'cart.html';
    });

    // Handle Events (Delegation)
    menuContainer.addEventListener('click', (e) => {
        const menuItem = e.target.closest('.menu-item');
        if (!menuItem) return;

        if (e.target.classList.contains('order-now-btn')) {
            const params = new URLSearchParams({
                title: menuItem.querySelector('.card-title').innerText,
                text :menuItem.querySelector('.card-text').innerText,
                price: parseFloat(menuItem.querySelector('.price').innerText.replace('Rs.', '')),
                img: menuItem.querySelector('img').src,
                rating: menuItem.querySelector('.rating').innerText
            }).toString();
            window.location.href = `order.html?${params}`;
        }

        if (e.target.closest('.cart-btn')) {
            addToCart(menuItem);
        }
    });

    // Event Listeners for Search & Filter
    searchInput.addEventListener('input', searchMenu);
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            button.classList.add('active');
            filterMenu(button.getAttribute('data-category'));
        });
    });

    // Initialize
    displayMenu(menuItems);
    updateCartBadge();
});

//menu
const menuItems = [
    { name: "Sandwich", price: "Rs.50.00", category: "breakfast", rating: "5.0", imageUrl: "/assets/photos/m4.jpeg", description: "A quick, tasty sandwich made with fresh ingredients, perfect for breakfast on the go." },
    { name: "Hawaiian Juice", price: "Rs.15.00", category: "beverage", rating: "5.0", imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczPWXb_EyNNL3EG2iPsMno0wBVJTF35aOFxcGS67F0ybwE02LZdUy3oMbZqCH3X_k9ridWoCHHdIc_2WCAHETPYu7jK-my6wRwA-L8nqiIyHBVgRFnhlM9NvBt0J85NWscXCsrAoOS8shuFSm2LrvhGRWw=w1000-h667-s-no-gm?authuser=0", description: "A refreshing tropical juice to quench your thirst and complement your meal." },
    { name: "Paneer Paratha", price: "Rs.45.00", category: "dinner", rating: "5.0", imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczMLYGoL2tcJRaUbDVjSaRB9Bao9MuwvCD80lkcbN_1RlqPicf8lL4UZXXyr7GH4t676g1lWVMU0DjEIgLxsv9hxKZU-zit893jtdFRJc0qzSj1ouvW0QWl5F4pPLQxLpez4IM2NaTzSL03CoIujrHg9GQ=w360-h240-s-no-gm?authuser=0", description: "These crisp parathas have a spiced Paneer filling that is Delicious." },
    { name: "Paneer Curry", price: "Rs.90.00", category: "dinner", rating: "5.0", imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczNY0RrBaCYU_qeptDvwdSoiWXh_qEqXCA3qfXZj3l8zYjAlPvg8JTC6MkXfHaPws49Vrucp6VcOaQaT60zSKDpfM390qD3wCsRZjtDOlDdJOFF6EtKFkycjaubGzDVDRoDgX6nPmChynTvyouvJ6YvoTg=w360-h240-s-no-gm?authuser=0", description: "Its delicious, flavorsome dish where Indian cheese simmered in a spicy daba style." },
    { name: "Emiliano", price: "Rs.35.00", category: "dinner", rating: "5.0", imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczO-o9Ittd2MKs7ryFH_TFQ70BoVmpayoag050ZK7EfqxiDFmY8REnWExhto3PZO6OlaCNjcCQ-7WS4sNA9TKhzePL7-G3KmuaC1EsVQtjRy1M0gWOB7ytN4AqAQnZZxszUez40xGZFGiSmzpSO6W5yK-A=w959-h640-s-no-gm?authuser=0", description: "A delicious, creamy vegetarian delight packed with rich flavors, perfect for a satisfying dinner." },
    { name: "Ice Cream", price: "Rs.45.00", category: "desserts", rating: "5.0", imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczMnopLrb2drxdMrs3OyI_niXMly5auj433JTVZJZCaxzE0SdYbKklDO-zftq3A7eDIjjhaANlzRlfmrERVIYU2ED9OZ1culoeY9bnghFtyB8U45RCGQq0GoNP7k1ksP363YGbOaX1nQhQ2mP7LV0Az5lA=w959-h640-s-no-gm?authuser=0", description: "A refreshing scoop of creamy ice cream to satisfy your sweet tooth after any meal." },
    { name: "Cheese Burger", price: "Rs.20.00", category: "breakfast", rating: "5.0", imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczOSOMEDYzt8qwPX4n-x794T4m7TSimvzvJtZDkgrBYzpeypYcTnagoodnb1n7KBZA2DrQDTOARV1V0ijqt2dHJYwiIxsTPtvkPd4s6s_xtUUqHcS2Vnp0nP0Eq6GRTnePZim-nCRVu5GNgqxWu9Uqqn-Q=w1390-h928-s-no-gm?authuser=0", description: "A classic cheeseburger with melted cheese and fresh veggies for the ultimate comfort food." },
    { name: "Hawaiian Pizza", price: "Rs.40.00", category: "breakfast", rating: "5.0", imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczOAFTq10ymGF5y0i2DObKBqrNZt158ZDTlkGCLgHJu-fDCj9jK7shfePtazcUn_ejy226oVz4PJqJquXXwQ-4AWFnUdaQ1PPmerYdWe7U8yZsVk_Fa9beVIPu1CEQwkBrpWoFxuhK58nEipBlMM5_pFDQ=w1000-h667-s-no-gm?authuser=0", description: "A delightful blend of pineapple and savory toppings for a tropical pizza experience." },
    { name: "Calum Lewis", price: "Rs.90.00", category: "breakfast", rating: "5.0", imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczNfdaYvIJTTEUHAcmVazBGFYgJ7J_5aPA7SuYHjtK96tzLDAkUKTP6dkuD2IGtWhZFbc-OoPP1DgtzPjb_SqvSr68zYm19gILOVstw-Dx9W_DSY1VMNF8mbXFuW3ZZxNCt-Frv6CgmZ4ohJWhY0NAaVdQ=w1391-h928-s-no-gm?authuser=0", description: "A hearty and delicious breakfast to kickstart your day, made with fresh ingredients and care." },
    { name: "Pasta", price: "Rs.45.00", category: "dinner", rating: "5.0", imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczOUOp3kpXY6ysORkV8fTzC2sa_rUww3JZS-MHVJKn-RXHiV3vERBqUV77Gf5bRw7_AMLDykzpf04BfmR0FAZsCtNEbFq9BhlGdbp2VdU4TPupTlpCeZxrD6URHf_-RzOceVbh6PF5LeESwzS483rNaPeQ=w959-h636-s-no-gm?authuser=0", description: "Classic Italian pasta tossed with fresh herbs and a creamy sauce, a crowd favorite." },
    { name: "Noodles", price: "Rs.30.00", category: "dinner", rating: "5.0", imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczMH_jWTP7_5mkzX-I96uKjZV4DR3hwhXbaRPiObdLzsnvf00yel3_OtTgJzH99jk9CQU3mXY122h7wEjT7U3N1mJCP0R2b7fE3CpGvUfF3fM0KAJEzPmTr0_kqfBCvO7wyM1Bvd8WsAxixQM4wA2z-DWg=w959-h640-s-no-gm?authuser=0", description: "Stir-fried noodles packed with fresh vegetables and a flavorful sauce for the perfect meal." },
    { name: "Pancakes", price: "Rs.80.00", category: "breakfast", rating: "4.7", imageUrl: "https://t3.ftcdn.net/jpg/02/09/25/10/240_F_209251092_O7TsZT8n956f6wY3gzjm9qaWAiVuWSZk.jpg", description: "Fluffy and light pancakes served with maple syrup and fresh fruits." },
    { name: "Omelette", price: "Rs.70.00", category: "breakfast", rating: "4.8", imageUrl: "https://t3.ftcdn.net/jpg/03/13/83/82/240_F_313838236_qC4YbL5CzHOsKqikTzdppcI9F9dZtfga.jpg", description: "Fluffy omelette with your choice of fillings including cheese, vegetables, and meats." },
    { name: "Greek Yogurt with Granola", price: "Rs.60.00", category: "breakfast", rating: "4.6", imageUrl: "https://t4.ftcdn.net/jpg/08/52/35/01/240_F_852350155_KEYyRxgu85Mh613HqZ5XasOPblQxilFq.jpg", description: "Creamy Greek yogurt topped with crunchy granola and fresh fruits." },
    { name: "Bagel with Cream Cheese", price: "Rs.50.00", category: "breakfast", rating: "4.7", imageUrl: "https://t3.ftcdn.net/jpg/03/13/45/20/240_F_313452066_UVmHvzGwnCPTfg9AdL3fLXfIGCkT8xNS.jpg", description: "A fresh bagel spread with rich cream cheese, perfect for a quick and satisfying breakfast." },
    { name: "Smoothie Bowl", price: "Rs.85.00", category: "breakfast", rating: "4.8", imageUrl: "https://t3.ftcdn.net/jpg/02/39/38/82/240_F_239388210_fdJwu8yuUK4J3n0rwFBasMPKDEHcIufn.jpg", description: "A refreshing smoothie bowl topped with a variety of fresh fruits, nuts, and seeds." },
    { name: "Idli Sambar", price: "Rs.95.00", category: "breakfast", rating: "4.9", imageUrl: "https://t3.ftcdn.net/jpg/04/02/12/80/240_F_402128075_06J9Y69ScRrYKFpQr1PAH0L7YziB83ry.jpg", description: "Steamed rice cakes served with a spicy lentil stew and coconut chutney." },
    { name: "Masala Dosa", price: "Rs.90.00", category: "breakfast", rating: "4.9", imageUrl: "https://t4.ftcdn.net/jpg/01/89/45/21/240_F_189452136_gJBG4ZRXY9NnZZCGV2s8QhObmpeerJTO.jpg", description: "Crispy dosa stuffed with spiced potato filling, served with chutney and sambar." },
    { name: "Poha", price: "Rs.75.00", category: "breakfast", rating: "4.6", imageUrl: "https://t3.ftcdn.net/jpg/02/42/99/94/240_F_242999427_VCKxPMsPuRHExyxWzUQv6Gs6qT0DhgN3.jpg", description: "Flattened rice cooked with onions, spices, and garnished with coriander and peanuts." },
    { name: "Upma", price: "Rs.80.00", category: "breakfast", rating: "4.7", imageUrl: "https://t4.ftcdn.net/jpg/04/72/02/17/240_F_472021716_220a9iXI9cc4epYipISr7mClcrRwerHx.jpg", description: "Savory semolina dish cooked with vegetables and seasoned with spices." },
    { name: "French Toast Kidron", price: "Rs.90.00", category: "breakfast", rating: "5.0", imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczOgpOdp5jcOHx-9AhH0oPUm9iLnTbJ53BhoQHpXNmBago_Sc2B9nzVMliwG3cHfsmlDJeZlJt1Hfgeiywp2bSzH_BTjrBbKZBRZvYDgmXa4q2n8zR6ZIn1MYUYte1ING10cKbPhgvl0Djufw4HpHYokJw=w959-h625-s-no-gm?authuser=0", description: "Golden-brown French toast served with a drizzle of syrup, perfect for a light breakfast treat." },
    { name: "Calum Lewis", price: "Rs.90.00", category: "breakfast", rating: "5.0", imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczNfdaYvIJTTEUHAcmVazBGFYgJ7J_5aPA7SuYHjtK96tzLDAkUKTP6dkuD2IGtWhZFbc-OoPP1DgtzPjb_SqvSr68zYm19gILOVstw-Dx9W_DSY1VMNF8mbXFuW3ZZxNCt-Frv6CgmZ4ohJWhY0NAaVdQ=w1391-h928-s-no-gm?authuser=0", description: "A hearty and delicious breakfast to kickstart your day, made with fresh ingredients and care." },
    { name: "Sandwich", price: "Rs.50.00", category: "breakfast", rating: "5.0", imageUrl: "/assets/photos/m4.jpeg", description: "A quick, tasty sandwich made with fresh ingredients, perfect for breakfast on the go." },
    { name: "Bread with Egg", price: "Rs.50.00", category: "breakfast", rating: "5.0", imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczNZ_1zlq-pZi5wXDL2OkTm8dNSH0AzaJm2p51dbPvTAjTaHyBHRg4rJ04OLuGxILKGqYTdwdDbS0Cjg9tUmVm6LVNdMdZlUg7Mzn1dZnSaZcZzlscRIqzv3dzxApzcWxb_pD11ubaggelB4rOigP0QLqA=w959-h640-s-no-gm?authuser=0", description: "Toasted bread topped with a perfectly cooked egg, offering a simple yet satisfying breakfast." },
    { name: "Pitha", price: "Rs.30.00", category: "breakfast", rating: "5.0", imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczNJigzLCNYrXQtPE1OcL-2DFRuoyEr3EnIwwdESPxwNM33CuWvv0bECubFphPQNcaBDD5ZddNwy3o5EjomCQ58dHKovCw7xhNtGJBk6ekMcXUGUGU5H9UVGgH6qjLNd51FQRH4co5uZ259dlncEmzKjEw=w959-h640-s-no-gm?authuser=0", description: "Traditional rice cakes, often filled with sweet or savory ingredients, offering a taste of cultural heritage." },
    { name: "Chole Masala", price: "Rs.120.00", category: "dinner", rating: "5.0", imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczNf2c8WD0F1eeKrGsaFdpc9mpsxp7dYNb-5nambdDDxHS93GrW8nAJOa2aKfXbruNXqmdyhfIwyifGTmVs1a3Q0Boz9fBN6OxF28cP9pu9rX663QTA8Js5YvuQxjdHCxiW_epXD8loG5usy3rzc3VWhWQ=w360-h240-s-no-gm?authuser=0", description: "Punjabi chole masala is chickpeas cooked in a delicious onion tomato masala." },
    { name: "Palak Paneer", price: "Rs.150.00", category: "dinner", rating: "4.8", imageUrl: "https://t4.ftcdn.net/jpg/08/63/87/25/240_F_863872538_SkyTBlwpNjD8rbJXOwzy4QQq2CTX4wVY.jpg", description: "A nutritious North Indian dish made with spinach and cottage cheese in a flavorful curry." },
    { name: "Butter Chicken", price: "Rs.220.00", category: "dinner", rating: "5.0", imageUrl: "https://t3.ftcdn.net/jpg/09/57/65/90/240_F_957659084_DTEbkYir3nxrELkd5Qb3RXbKOSS4vfyE.jpg", description: "A rich and creamy chicken curry cooked with butter and spices, served with naan or rice." },
    { name: "Paneer Tikka", price: "Rs.180.00", category: "dinner", rating: "4.9", imageUrl: "https://t4.ftcdn.net/jpg/08/86/51/01/240_F_886510161_q3YhfQOq1JeRIJIsiaZg2ugAayMtYm9A.jpg", description: "Marinated paneer cubes grilled to perfection with spices and herbs, served with mint chutney." },
    { name: "Hyderabadi Biryani", price: "Rs.250.00", category: "dinner", rating: "5.0", imageUrl: "https://t4.ftcdn.net/jpg/07/10/09/69/240_F_710096966_K0p5fC5gpMiFfS3aGX8nudDrh7Vj5XdE.jpg", description: "Aromatic rice cooked with fragrant spices, saffron, and tender pieces of chicken, served with raita." },
    { name: "Mushroom Masala", price: "Rs.160.00", category: "dinner", rating: "4.7", imageUrl: "https://t4.ftcdn.net/jpg/05/17/39/01/240_F_517390113_qVspuWNVI8QtCTP3qDaeFCgWOgqc9diX.jpg", description: "A flavorful curry made with mushrooms and a blend of Indian spices, perfect with rice or naan." },
    { name: "Rogan Josh", price: "Rs.280.00", category: "dinner", rating: "4.9", imageUrl: "https://t3.ftcdn.net/jpg/09/58/13/58/240_F_958135897_fV4qIuK3tr0mj3WuYr4kJdHi7enRwzdp.jpg", description: "A traditional Kashmiri dish with succulent lamb cooked in a spicy, aromatic gravy." },
    { name: "Tandoori Roti", price: "Rs.25.00", category: "dinner", rating: "5.0", imageUrl: "https://t4.ftcdn.net/jpg/07/82/23/33/240_F_782233320_1Ng8hz58ZDr2NaiWpc1Zxt8isLyDJAqD.jpg", description: "A soft, fluffy flatbread baked in a traditional tandoor, perfect to pair with curries." },
    { name: "Chicken Kebab", price: "Rs.200.00", category: "dinner", rating: "4.8", imageUrl: "https://t3.ftcdn.net/jpg/02/18/20/02/240_F_218200208_d7YFJnwsd0BqBH0mnhPhfu90t6D1UTUy.jpg", description: "Tender, marinated chicken pieces grilled to perfection, served with a tangy yogurt sauce." },
    { name: "Dal Makhani", price: "Rs.150.00", category: "dinner", rating: "5.0", imageUrl: "https://t3.ftcdn.net/jpg/09/58/13/38/240_F_958133811_N7mCp973gbE0WiDOOe6rpjlDX00Gk0zM.jpg", description: "A rich, creamy lentil dish simmered with butter and spices, a North Indian specialty." },
    { name: "Paneer Butter Masala", price: "Rs.180.00", category: "dinner", rating: "5.0", imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczPuZ3nOGR2UdO5cj1PeZ5DbU0IbbJTIAHWMvATmd79Mb5QNnyRP5WBuvSOhTf_fZ2v1RVs44zO8Kx-xuLakJECSVXRq9CGJGZBXja-IFc8F47_GHbIhp9eoksQ7ZgiOYnjta3niAdpkPeyVDm9Db8Gmgw=w360-h240-s-no-gm?authuser=0", description: "Delicious & Creamy Indian cheese aka paneer, butter, spices & herbs."},
    { name: "Aloo Gobi", price: "Rs.30.00", category: "dinner", rating: "5.0", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeL8Y0GB3vcK_L0bP1Om9I38knQHQeOTs6Dw&s", description: "A classic North Indian dish featuring spiced potatoes and cauliflower."},
    { name: "Chicken Tikka Masala", price: "Rs.150.00", category: "dinner", rating: "4.7", imageUrl: "https://t4.ftcdn.net/jpg/02/42/39/29/240_F_242392945_5Xc5VjsBFUMFR3ZZdQV1FL6LgB0XIvhD.jpg", description: "Tender chicken pieces marinated in spices and yogurt, then cooked in a rich, creamy tomato sauce."},
    { name: "Paneer Masala", price: "Rs.140.00", category: "dinner", rating: "4.8", imageUrl: "https://t4.ftcdn.net/jpg/05/82/28/65/240_F_582286506_Kji3X5NrZBHMTFSqwG9gADXWMsjrtEjL.jpg", description: "Soft paneer cubes simmered in a buttery, tomato-based gravy with spices and cream."},
    { name: "Chole Bhature", price: "Rs.120.00", category: "dinner", rating: "4.6", imageUrl: "https://t4.ftcdn.net/jpg/09/58/13/37/240_F_958133715_OMvt2aDLWA9l9Sm7qKQVPSo1hAKgnhZt.jpg", description: "Spicy chickpea curry served with deep-fried bread for a delightful and filling meal."},
    { name: "Lamb Korma", price: "Rs.180.00", category: "dinner", rating: "4.9", imageUrl: "https://t4.ftcdn.net/jpg/08/67/93/93/240_F_867939365_RKSeiwBcxNemKsObEC2L8E1cT8MwZD3e.jpg", description: "Succulent lamb pieces cooked in a rich and creamy sauce with a blend of aromatic spices."},
    { name: "Vegetable Biryani", price: "Rs.120.00", category: "dinner", rating: "4.8", imageUrl: "https://t4.ftcdn.net/jpg/08/13/80/13/240_F_813801314_eUVAdyNVNU8sYqxMN5JNECXn50BeshPA.jpg", description: "A fragrant rice dish cooked with mixed vegetables and aromatic spices, perfect for a satisfying dinner."},
    { name: "Vegetable Curry", price: "Rs.120.00", category: "dinner", rating: "4.7", imageUrl: "https://t4.ftcdn.net/jpg/03/59/31/27/240_F_359312716_djV5XZcDXk919Fcgx5ukZTF5TqYYkYMD.jpg", description: "A hearty curry with a medley of seasonal vegetables cooked in a spicy and flavorful sauce."},
    { name: "Dal Makhani", price: "Rs.150.00", category: "dinner", rating: "5.0", imageUrl: "https://t3.ftcdn.net/jpg/09/58/13/38/240_F_958133811_N7mCp973gbE0WiDOOe6rpjlDX00Gk0zM.jpg", description: "A rich, creamy lentil dish simmered with butter and spices, a North Indian specialty."},
    { name: "Chocolate Cake", price: "Rs.120.00", category: "desserts", rating: "4.8", imageUrl: "https://t3.ftcdn.net/jpg/02/10/14/94/240_F_210149442_uQtMQbKDZNDoqia6j4tNzkyPOBpXEyjz.jpg", description: "Rich and moist chocolate cake with a decadent frosting."},
    { name: "Cheesecake", price: "Rs.150.00", category: "desserts", rating: "4.7", imageUrl: "https://t4.ftcdn.net/jpg/01/45/70/89/240_F_145708901_jO47pCUoyO4gO9dVHIXeQyc1oydysY2S.jpg", description: "Creamy and smooth cheesecake with a buttery graham cracker crust."},
    { name: "Tiramisu", price: "Rs.180.00", category: "desserts", rating: "4.9", imageUrl: "https://t3.ftcdn.net/jpg/01/96/17/42/240_F_196174263_KAbHDKa1XXWs5KRwhsmIWSSPq2u8FKqP.jpg", description: "Layers of coffee-soaked ladyfingers and creamy mascarpone cheese."},
    { name: "Apple Pie", price: "Rs.110.00", category: "desserts", rating: "4.6", imageUrl: "https://t4.ftcdn.net/jpg/02/27/44/65/240_F_227446517_6RiH14SUE2s8HieDibxLbpn8b1ugdqwZ.jpg", description: "Classic apple pie with a flaky crust and spiced apple filling."},
    { name: "Brownies", price: "Rs.90.00", category: "desserts", rating: "4.8", imageUrl: "https://t4.ftcdn.net/jpg/03/06/90/15/240_F_306901562_nT6sIcAx10Oqyf3tITJZA1T3YrkCarrD.jpg", description: "Fudgy brownies with a rich chocolate flavor and a crackly top."},
    { name: "Lemon Meringue Pie", price: "Rs.130.00", category: "desserts", rating: "4.7", imageUrl: "https://t3.ftcdn.net/jpg/01/63/58/64/240_F_163586438_EQB3NQx19C7KBLEk7yWeWIOBXcCjOMfS.jpg", description: "Tart lemon filling topped with a fluffy meringue."},
    { name: "Panna Cotta", price: "Rs.140.00", category: "desserts", rating: "4.8", imageUrl: "https://t4.ftcdn.net/jpg/02/35/51/47/240_F_235514796_GzYS8upXtFz953zbcPspx3ALgMzcRceY.jpg", description: "Silky smooth panna cotta with a hint of vanilla and a berry sauce."},
    { name: "Baklava", price: "Rs.160.00", category: "desserts", rating: "4.7", imageUrl: "https://t4.ftcdn.net/jpg/03/35/90/57/240_F_335905730_kB6jrKXxzHu1BMuYafDuNzs9ehRhzyGa.jpg", description: "Sweet and flaky pastry layered with nuts and honey."},
    { name: "Macarons", price: "Rs.100.00", category: "desserts", rating: "4.8", imageUrl: "https://t4.ftcdn.net/jpg/07/52/70/13/240_F_752701387_KJUWsXG5ZeOKTGGGEomT8jlHhf8n45V4.jpg", description: "Delicate almond meringue cookies filled with flavorful ganache."},
    { name: "Creme Brulee", price: "Rs.150.00", category: "desserts", rating: "4.9", imageUrl: "https://t3.ftcdn.net/jpg/07/79/60/34/240_F_779603494_lCn5UMLANqYJ1YHhVopcsQJ6ClBThO8b.jpg", description: "Rich custard with a caramelized sugar top, offering a sweet and crunchy finish."},
    { name: "Chocolate Dessert", "price": "Rs.25.00", "category": "desserts", "rating": "5.0", "imageUrl": "https://lh3.googleusercontent.com/pw/AP1GczMYbQLiUy2hRxSkqECHCo9HOCGJSPrFiakpEKQ0bT2xpWccGdanm_KtrRRSTpqZTGu259RVt6uGmDeiv91FqzXhcf6WEE3DbP_HtCOhr2fPuWp_loalOvZWH2lUURq_y5h3-V6OdCZ2AGaQ_jw39HlP4A=w1000-h667-s-no-gm?authuser=0", "description": "Chocolate lovers delight! Indulgent, gooey molten lava inside chocolate cake."},
    { name: "Ice Cream", "price": "Rs.45.00", "category": "desserts", "rating": "5.0", "imageUrl": "https://lh3.googleusercontent.com/pw/AP1GczMnopLrb2drxdMrs3OyI_niXMly5auj433JTVZJZCaxzE0SdYbKklDO-zftq3A7eDIjjhaANlzRlfmrERVIYU2ED9OZ1culoeY9bnghFtyB8U45RCGQq0GoNP7k1ksP363YGbOaX1nQhQ2mP7LV0Az5lA=w959-h640-s-no-gm?authuser=0", "description": "A refreshing scoop of creamy ice cream to satisfy your sweet tooth after any meal."},
    { name: "Coffee", price: "Rs.60.00", category: "beverages", rating: "4.9", imageUrl: "https://t3.ftcdn.net/jpg/02/67/56/80/240_F_267568050_gKkcBAI5XkpEHNpipkx2aIarNbwarCRN.jpg", description: "Hot brewed coffee with a rich aroma."},
    { name: "Latte", price: "Rs.80.00", category: "beverages", rating: "4.9", imageUrl: "https://t3.ftcdn.net/jpg/02/19/78/70/240_F_219787028_zlTwso8vXYKEICAwKXcB1tlXU3rviVUY.jpg", description: "Espresso with steamed milk and a light foam."},
    { name: "Cappuccino", price: "Rs.90.00", category: "beverages", rating: "4.9", imageUrl: "https://t4.ftcdn.net/jpg/01/94/82/87/240_F_194828702_gkWNSXXGTaoz2ZUyu1MVi9Tj4sQBs8HO.jpg", description: "Espresso topped with steamed milk and thick foam."},
    { name: "Green Tea", price: "Rs.50.00", category: "beverages", rating: "4.9", imageUrl: "https://t4.ftcdn.net/jpg/01/08/32/05/240_F_108320596_m5uPH8MSVT9QHrq5QoRMKg1bNpHlryQU.jpg", description: "Refreshing and healthy green tea with antioxidants."},
    { name: "Iced Coffee", price: "Rs.70.00", category: "beverages", rating: "4.9", imageUrl: "https://t3.ftcdn.net/jpg/03/16/01/48/240_F_316014817_EC1KN7mAD86ALYhhwGUUeSsQoJIVMtfQ.jpg", description: "Chilled coffee served over ice for a refreshing taste."},
    { name: "Hot Chocolate", price: "Rs.85.00", category: "beverages", rating: "4.9", imageUrl: "https://t4.ftcdn.net/jpg/01/19/83/87/240_F_119838786_qm7XvDrDsCh2COxv8Wja5akq7Vzn7rCo.jpg", description: "Rich and creamy hot chocolate with whipped cream."
    },
    { name: "Lemonade", price: "Rs.60.00", category: "beverages", rating: "4.6", imageUrl: "https://t3.ftcdn.net/jpg/02/60/17/24/240_F_260172428_nFYpkCiYQDFeR4UcRXoRaby3E5c8zhud.jpg", description: "Refreshing lemonade made from fresh lemons."
    },
    { name: "Orange Juice", price: "Rs.70.00", category: "beverages", rating: "4.9", imageUrl: "https://t4.ftcdn.net/jpg/01/87/21/31/240_F_187213110_p07ufUC42zVlcaijXRuFFYB4MKsWLgq1.jpg", description: "Freshly squeezed orange juice with a tangy flavor."
    },
    {name: "Smoothie",price: "Rs.90.00",category: "beverages",rating: "4.9",imageUrl: "https://t4.ftcdn.net/jpg/01/13/31/51/240_F_113315160_nzzPgtIF4lAehS6l3du3JkHCwGr7eBHH.jpg",description: "Blended fruit smoothie with a variety of flavors."
    },
    { name: "Burger & Fries", price: "Rs.250.00", category: "combos", rating: "4.9", imageUrl: "https://t3.ftcdn.net/jpg/02/44/61/14/240_F_244611436_4WKrV3YAOBo0LKe9S7hoXv55aDmgwvwr.jpg", description: "A delicious burger with crispy fries. Perfect for a meal."
    },
    { name: "Pizza & Soft Drink", price: "Rs.350.00", category: "combos", rating: "4.9", imageUrl: "https://t3.ftcdn.net/jpg/07/74/86/96/240_F_774869657_DINtsrc9lyT05w0mr6aPY3TdxnG7EaLF.jpg", description: "Enjoy a classic pizza with a refreshing soft drink."
    },
    { name: "Chicken Wings & Salad", price: "Rs.300.00", category: "combos", rating: "4.9", imageUrl: "https://t4.ftcdn.net/jpg/01/85/57/71/240_F_185577147_BQI8B7BK60WJ1xpOJAustEhs84BuaMTb.jpg", description: "Spicy chicken wings paired with a fresh salad."
    },
    { name: "Sandwich & Soup", price: "Rs.280.00", category: "combos", rating: "4.8", imageUrl: "https://t3.ftcdn.net/jpg/08/15/02/72/240_F_815027254_VKxW4dvs4v1aQVBpeSmx70fdPZunj9pJ.jpg", description: "A hearty sandwich with a warm bowl of soup."
    },
    { name: "Pasta & Garlic Bread", price: "Rs.320.00", category: "combos", rating: "4.3", imageUrl: "https://t4.ftcdn.net/jpg/06/18/49/71/240_F_618497137_lRl6KfzZiSKggTwtFmR2NJGUqSJ2CSJz.jpg", description: "Delicious pasta served with garlic bread."
    },
    { name: "Sushi & Miso Soup", price: "Rs.350.00", category: "combos", rating: "4.7", imageUrl: "https://t4.ftcdn.net/jpg/09/17/18/75/240_F_917187562_BsACFCTMrfzM2pYkicl0ogJha8yzkfnx.jpg", description: "Fresh sushi rolls paired with a bowl of savory miso soup."
    },
    { name: "Burrito & Nachos", price: "Rs.350.00", category: "combos", rating: "4.4", imageUrl: "https://t3.ftcdn.net/jpg/08/58/57/50/240_F_858575001_4J1JITghebGkjqljIlnD3umuOBC0uQcH.jpg", description: "A flavorful burrito with crunchy nachos."
    },
    { name: "Falafel Wrap & Hummus", price: "Rs.270.00", category: "combos", rating: "4.2", imageUrl: "https://t3.ftcdn.net/jpg/08/21/46/98/240_F_821469809_LrbP0PdZRJknS67pqaFJKW1IDiWzT8cx.jpg", description: "A savory falafel wrap served with a side of hummus."
    },
    { name: "Chicken Tenders & Coleslaw", price: "Rs.290.00", category: "combos", rating: "4.6", imageUrl: "https://t3.ftcdn.net/jpg/09/58/60/48/240_F_958604832_RZOetN1N9HtWfARPc6xp8mmMCCmrQWGA.jpg", description: "Crispy chicken tenders with a side of coleslaw."
    },
    { name: "Veggie Wrap & Fruit Juice", price: "Rs.260.00", category: "combos", rating: "4.9", imageUrl: "https://t3.ftcdn.net/jpg/09/03/37/60/240_F_903376004_ju23VXINE2JUmtJGQ9MGaqicpEhvmnRB.jpg", description: "A healthy veggie wrap accompanied by fresh fruit juice."
    },
    { name: "Grilled Cheese Sandwich & Tomato Soup", price: "Rs.290.00", category: "combos", rating: "4.8", imageUrl: "https://t3.ftcdn.net/jpg/09/07/26/20/240_F_907262013_j10opqDjwoK1xYaxfjAHoYtCMmrwxYiA.jpg", description: "Classic grilled cheese sandwich served with a warm bowl of tomato soup."
    },
    { name: "BBQ Ribs & Cornbread", price: "Rs.400.00", category: "combos", rating: "4.5", imageUrl: "https://t3.ftcdn.net/jpg/08/18/83/26/240_F_818832669_BKZNNGfUA61x4EUhmZgjohsGktyMXDOm.jpg", description: "Tender BBQ ribs served with a side of cornbread for a hearty meal."
    }
];
