// Our Cart

let cart = JSON.parse(localStorage.getItem("cart")) || []


// Display the current year in the footer
function displayYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector("#currentyear");

    if (yearElement) {
        yearElement.textContent = currentYear;
    }
}


// Display the last modified date
function displayLastModified() {
    const lastModified = document.lastModified;
    const modifiedElement = document.querySelector("#lastModified");

    if (modifiedElement) {
        modifiedElement.textContent = `Last Modified: ${lastModified}`;
    }
}


// Control the mobile navigation menu
function setupNavigation() {
    const menuButton = document.querySelector("#menu-button");
    const navigation = document.querySelector("#navigation");

    if (!menuButton || !navigation) {
        return;
    }

    menuButton.addEventListener("click", () => {

        navigation.classList.toggle("open");

        if (navigation.classList.contains("open")) {
            menuButton.setAttribute("aria-label", "Close navigation menu");
            menuButton.textContent = "✕";
        } else {
            menuButton.setAttribute("aria-label", "Open navigation menu");
            menuButton.textContent = "☰";
        }

    });


    const navigationLinks = document.querySelectorAll("#navigation a");

    navigationLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navigation.classList.remove("open");

            menuButton.setAttribute("aria-label", "Open navigation menu");
            menuButton.textContent = "☰";

        });

    });
}



// Close the mobile menu when clicking outside it
function setupOutsideMenuClick() {
    const menuButton = document.querySelector("#menu-button");
    const navigation = document.querySelector("#navigation");

    if (!menuButton || !navigation) {
        return;
    }

    document.addEventListener("click", (event) => {

        if (
            navigation.classList.contains("open") &&
            !navigation.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {
            navigation.classList.remove("open");

            menuButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuButton.textContent = "☰";
        }

    });
}


// Store product information


function getProducts() {
    return [
        // Smartphones
        {
            name: "Samsung Galaxy A55",
            category: "Smartphones",
            brand: "Samsung",
            price: "₦250,000",
            description: "256GB . 8GB RAM . 5000mAh",
            image: "images/android-phone.webp",
            alt: "Samsung Galaxy smartphone"
        },
        {
            name: "iPhone 15",
            category: "Smartphones",
            brand: "Apple",
            price: "₦650,000",
            description: "256GB . 8GB RAM . 4800mAh",
            image: "images/iphone.webp",
            alt: "Apple iPhone"
        },
        {
            name: "Tecno Spark",
            category: "Smartphones",
            brand: "Tecno",
            price: "₦150,000",
            description: "128GB . 4GB RAM . 5000mAh",
            image: "images/budget-phone.webp",
            alt: "Tecno smartphone"
        },
        {
            name: "Samsung Galaxy S25 Ultra",
            category: "Smartphones",
            brand: "Samsung",
            price: "₦1,200,000",
            description: "512GB . 12GB RAM . 5000mAh",
            image: "images/premium-phone.webp",
            alt: "Samsung Galaxy premium smartphone"
        },

        // Laptops
        {
            name: "HP Pavilion",
            category: "Laptops",
            brand: "HP",
            price: "₦550,000",
            description: "512GB SSD . 16GB RAM . Intel Core i5",
            image: "images/windows-laptop.webp",
            alt: "HP Pavilion laptop"
        },
        {
            name: "MacBook Air",
            category: "Laptops",
            brand: "Apple",
            price: "₦1,200,000",
            description: "512GB SSD . 16GB RAM . Apple M3",
            image: "images/macbook.webp",
            alt: "Apple MacBook Air"
        },
        {
            name: "ASUS Gaming Laptop",
            category: "Laptops",
            brand: "ASUS",
            price: "₦1,500,000",
            description: "1TB SSD . 16GB RAM . NVIDIA RTX Graphics",
            image: "images/gaming-laptop.webp",
            alt: "ASUS gaming laptop"
        },
        {
            name: "Dell Latitude",
            category: "Laptops",
            brand: "Dell",
            price: "₦800,000",
            description: "512GB SSD . 16GB RAM . Intel Core i7",
            image: "images/business-laptop.webp",
            alt: "Dell Latitude business laptop"
        },

        // Tablets
        {
            name: "Samsung Galaxy Tab",
            category: "Tablets",
            brand: "Samsung",
            price: "₦250,000",
            description: "128GB . 6GB RAM . 8000mAh",
            image: "images/android-tablet.webp",
            alt: "Samsung Galaxy tablet"
        },
        {
            name: "iPad Air",
            category: "Tablets",
            brand: "Apple",
            price: "₦600,000",
            description: "256GB . 8GB RAM . Apple M2",
            image: "images/ipad.webp",
            alt: "Apple iPad Air"
        },
        {
            name: "Microsoft Surface",
            category: "Tablets",
            brand: "Microsoft",
            price: "₦450,000",
            description: "256GB SSD . 8GB RAM . Intel Core i5",
            image: "images/windows-tablet.webp",
            alt: "Microsoft Surface tablet"
        },
        {
            name: "Kids Learning Tablet",
            category: "Tablets",
            brand: "KidsTech",
            price: "₦120,000",
            description: "64GB . 4GB RAM . 6000mAh",
            image: "images/kids-tablet.webp",
            alt: "Kids learning tablet"
        },

        // Accessories
        {
            name: "Fast Charger",
            category: "Accessories",
            brand: "Anker",
            price: "₦15,000",
            description: "Fast Charging . USB-C . 30W",
            image: "images/chargers.webp",
            alt: "Anker fast charger"
        },
        {
            name: "Wireless Headphones",
            category: "Accessories",
            brand: "JBL",
            price: "₦35,000",
            description: "Wireless . Bluetooth 5.3 . 40 Hours",
            image: "images/headphones.webp",
            alt: "JBL wireless headphones"
        },
        {
            name: "Protective Phone Case",
            category: "Accessories",
            brand: "Spigen",
            price: "₦10,000",
            description: "Shockproof . Lightweight . Protective",
            image: "images/phone-cases.webp",
            alt: "Protective phone case"
        },
        {
            name: "USB-C Cable",
            category: "Accessories",
            brand: "Anker",
            price: "₦8,000",
            description: "USB-C . Fast Charging . 1.5m",
            image: "images/cables.webp",
            alt: "Anker USB-C cable"
        }
    ];
}

// Adds Product to the Cart

function addToCart(product) {
    const existingProduct = cart.find((item) => {
        return item.name === product.name;
    });
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            ...product, quantity: 1
        });
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
}

// Updating Cart Count

function updateCartCount() {
    const cartCount = document.querySelector("#cart-count");
    if (!cartCount) {
        return;
    }
    const totalItems = cart.reduce((total, product) => {
        return total + product.quantity;
    }, 0);
    cartCount.textContent = totalItems;
}

function getPriceValue(price) {
    return Number(String(price).replace(/[^0-9]/g, ""));
}

//  Display Cart
function displayCart() {
    const cartContainer = document.querySelector("#cart-container");

    if (!cartContainer) {
        return;
    }

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        const message = document.createElement("p");
        message.textContent = "Your cart is empty.";
        message.classList.add("no-products");

        cartContainer.appendChild(message);
        return;
    }

    let total = 0;

    cart.forEach((product) => {
        const priceValue = getPriceValue(product.price);
        const itemTotal = priceValue * product.quantity;

        total += itemTotal;

        const item = document.createElement("article");
        item.classList.add("cart-item");

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.alt;
        image.loading = "lazy";
        image.width = 800;
        image.height = 600;
        image.classList.add("cart-item-image");

        const details = document.createElement("div");
        details.classList.add("cart-item-details");

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = product.price;

        details.appendChild(name);
        details.appendChild(price);

        const quantityContainer = document.createElement("div");
        quantityContainer.classList.add("quantity-controls");

        const decreaseButton = document.createElement("button");
        decreaseButton.type = "button";
        decreaseButton.textContent = "-";
        decreaseButton.setAttribute(
            "aria-label",
            `Decrease quantity of ${product.name}`
        );

        const quantity = document.createElement("span");
        quantity.textContent = product.quantity;

        const increaseButton = document.createElement("button");
        increaseButton.type = "button";
        increaseButton.textContent = "+";
        increaseButton.setAttribute(
            "aria-label",
            `Increase quantity of ${product.name}`
        );

        decreaseButton.addEventListener("click", () => {
            if (product.quantity > 1) {
                product.quantity -= 1;
            } else {
                cart = cart.filter((item) => {
                    return item.name !== product.name;
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            displayCart();
        });

        increaseButton.addEventListener("click", () => {
            product.quantity += 1;

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            displayCart();
        });

        quantityContainer.appendChild(decreaseButton);
        quantityContainer.appendChild(quantity);
        quantityContainer.appendChild(increaseButton);

        const subtotal = document.createElement("p");
        subtotal.classList.add("cart-subtotal");
        subtotal.textContent =
            `Subtotal: ₦${itemTotal.toLocaleString()}`;

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-button");

        removeButton.addEventListener("click", () => {
            cart = cart.filter((item) => {
                return item.name !== product.name;
            });

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            displayCart();
        });

        const controls = document.createElement("div");
        controls.classList.add("cart-item-controls");

        controls.appendChild(quantityContainer);
        controls.appendChild(subtotal);
        controls.appendChild(removeButton);

        item.appendChild(image);
        item.appendChild(details);
        item.appendChild(controls);

        cartContainer.appendChild(item);
    });

    const totalElement = document.createElement("p");
    totalElement.classList.add("cart-total");
    totalElement.textContent = `Total: ₦${total.toLocaleString()}`;

    cartContainer.appendChild(totalElement);

    const shoppingButton = document.createElement("a");
    shoppingButton.href = "products.html";
    shoppingButton.textContent = "Continue Shopping";
    shoppingButton.classList.add("button");

    cartContainer.appendChild(shoppingButton);

    const checkoutButton = document.createElement("a");
    checkoutButton.href = "checkout.html";
    checkoutButton.textContent = "Proceed to Checkout";
    checkoutButton.classList.add("checkout-button");

    cartContainer.appendChild(checkoutButton);
}
function displayCheckoutSummary() {
    const summary = document.querySelector("#checkout-summary");
    const checkoutForm = document.querySelector("#checkout-form");

    if (!summary) {
        return;
    }

    summary.innerHTML = "";
    if (cart.length === 0) {
        const message = document.createElement("p");
        message.textContent = "Your cart is empty. Please add a product before checking out.";
        message.classList.add("no-products");
        summary.appendChild(message);

        if (checkoutForm) {
            checkoutForm.style.display = "none";
        }

        return;
    }

    if (checkoutForm) {

        checkoutForm.style.display = "block";
    }

    let total = 0;

    cart.forEach((product) => {
        const itemTotal =
            getPriceValue(product.price) * product.quantity;

        total += itemTotal;

        const item = document.createElement("p");

        item.textContent =
            `${product.name} × ${product.quantity} — ₦${itemTotal.toLocaleString()}`;

        summary.appendChild(item);
    });

    const totalElement = document.createElement("p");

    totalElement.textContent =
        `Total: ₦${total.toLocaleString()}`;

    totalElement.classList.add("cart-total");

    summary.appendChild(totalElement);
}

// Display products on the page

function displayProducts(products) {
    const productContainer = document.querySelector(".product-container");

    if (!productContainer) {
        return;
    }

    productContainer.innerHTML = "";

    if (products.length === 0) {
        const message = document.createElement("p");
        message.textContent = "Product not Available.";
        message.classList.add("no-products");
        productContainer.appendChild(message);

        return;
    }

    products.forEach((product) => {
        const card = document.createElement("article");
        card.classList.add("product-card");

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.alt;
        image.loading = "lazy";
        image.width = 800;
        image.height = 600;

        const name = document.createElement("h3");
        name.textContent = product.name;

        const description = document.createElement("p");
        description.textContent = product.description;

        const price = document.createElement("p");
        price.textContent = product.price;
        price.classList.add("product-price");

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Add to Cart";
        button.classList.add("button");

        button.addEventListener("click", () => {
            addToCart(product);
        });

        const productActions = document.createElement("div");
        productActions.classList.add("product-actions");

        productActions.appendChild(price);
        productActions.appendChild(button);

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(description);
        card.appendChild(productActions);

        productContainer.appendChild(card);
    });
}
// Filter products by category
function filterProducts(products, category) {

    if (category === "All") {
        return products;
    }

    return products.filter((product) => {
        return product.category === category;
    });
}

// Search Product


function searchProducts(products, searchTerm) {
    return products.filter((product) => {
        const searchableText = `
            ${product.name}
            ${product.category}
            ${product.brand}
            ${product.description}
        `.toLowerCase();

        return searchableText.includes(searchTerm.toLowerCase());
    });
}


// Set up product filter buttons

function setupProductFilters(products) {
    const filterButtons = document.querySelectorAll(
        ".filter-buttons button"
    );

    const searchInput = document.querySelector("#product-search");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const category = button.dataset.category;

            const filteredProducts = filterProducts(
                products,
                category
            );

            displayProducts(filteredProducts);

            updateProductHeading(category);

            setActiveFilter(button);

            localStorage.setItem("selectedCategory", category);
        });
    });

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const searchTerm = searchInput.value.trim();

            const activeButton = document.querySelector(
                ".filter-buttons button.active"
            );

            const selectedCategory = activeButton
                ? activeButton.dataset.category
                : "All";

            const categoryProducts = filterProducts(
                products,
                selectedCategory
            );

            const filteredProducts = searchProducts(
                categoryProducts,
                searchTerm
            );

            displayProducts(filteredProducts);
        });
    }
}

// Highlight the selected filter button
function setActiveFilter(activeButton) {

    const filterButtons = document.querySelectorAll(
        ".filter-buttons button"
    );

    filterButtons.forEach((button) => {
        button.classList.remove("active");
    });

    activeButton.classList.add("active");
}

// Update the product heading
function updateProductHeading(category) {
    const productHeading = document.querySelector("#product-heading");

    if (!productHeading) {
        return;
    }
    if (category === "All") {
        productHeading.textContent = "All Products";
    } else {
        productHeading.textContent = category;
    }
}

// Start the website JavaScript
function init() {
    displayYear();
    displayLastModified();
    setupNavigation();
    setupOutsideMenuClick();

    const products = getProducts();
    const savedCategory = localStorage.getItem("selectedCategory") || "All";
    const filteredProducts = filterProducts(products, savedCategory);
    displayProducts(filteredProducts);
    updateProductHeading(savedCategory);
    setupProductFilters(products);
    const activeButton = document.querySelector(`.filter-buttons button[data-category="${savedCategory}"]`);
    if (activeButton) {
        setActiveFilter(activeButton);
    }
    updateCartCount();
    displayCart();
    displayCheckoutSummary();
}

init();
