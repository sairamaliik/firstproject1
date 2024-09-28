const products = [
    {
        id: 1,
        name: "T-shirt with Tape Details",
        price: 100,
        image: './assets/images/Bshirt.png'
    },
    {
        id: 2,
        name: "T-shirt with Tape Details",
        price: 100,
        image: './assets/images/Bshirt.png'
    },
    {
        id: 3,
        name: "T-shirt with Tape Details",
        price: 100,
        image: './assets/images/Bshirt.png'
    },
    {
        id: 4,
        name: "T-shirt with Tape Details",
        price: 100,
        image: './assets/images/Bshirt.png'
    },
    {
        id: 5,
        name: "T-shirt with Tape Details",
        price: 100,
        image: './assets/images/Bshirt.png'
    },
]

function displayProducts() {
    const productList = document.getElementById('product-list')
    if (!productList) return;

    productList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');

        productDiv.className = 'product col-6 col-md-3 mb-4';
        productDiv.innerHTML = `
            <div className="card product-card">
              <img src="${product.image}" className="card-img-top" alt="Product 1" />
            </div>
            <div className="card-body text-left">
              <h5 className="card-title">${product.name}</h5>
              <p className="rating-text"><span className="gold-stars">★★★★★</span>4.5/5</p>
              <p className="product-price">$${product.price}</p>

              <button class="add-to-cart" onclick="addToCart(${product.id})">Add to cart</button>

            </div>
          `
        productList.appendChild(productDiv);
    })
}

function addToCart(productId) {
    const user = getLoggedInUser();
    if (!user) {
        alert("Your need to be logged in to add products to the cart.");
        window.location.herf = 'login.html';
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    if (cart.find(item => item.id === productId)) {
        alert("Product is already in the cart")
        return;
    }

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added successfully in cart')
}

function displayCart() {
    const cartList = document.getElementById('cart-list');
    if (!cartList) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartList.innerHTML = '';
    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList = 'cart-item';
        cartItemDiv.innerHTML = `
          <img src="${item.image}" alt="Product Image" />
          <div className="cart-item-details">
            <h5>${item.name}</h5>
            <p>Size: Large<br />Color: White</p>
            <div className="cart-item-price">$${item.price}</div>
          </div>
          <div className="cart-item-quantity">
            <button className="btn btn-outline-secondary"><i className="fa fa-minus" /></button>
            <span className="mx-2">1</span>
            <button className="btn btn-outline-secondary"><i className="fa fa-plus" /></button>
          </div>
          <button className="btn btn-danger">
            <i className="fa fa-trash" />
          </button>
        `
        cartList.appendChild(cartItemDiv)
    });
}

// Authcation Handling 
function handleAuth(type) {
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;


    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (type === 'login') {
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            localStorage.setItem('loggedInUser', email);
            alert('Login Successfuly!')

            window.location.href = 'index.html';
        } else {
            document.getElementById('auth-error').textContent = "Invalid email or password"
        }
    } else if (type === 'register') {
        if (users.find(user => user.email === email)) {
            document.getElementById('auth-error').textContent = "User Already exists.";
            return;
        }

        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('registration successfull');
    }
}

function logout() {
    localStorage.removeItem('loggedInUser')
    window.location.href = 'login.html'
}

function checkLoginStatus() {
    const user = getLoggedInUser();
    const loginBtn = document.getElementById('login-btn')
    const registerBtn = document.getElementById('register-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const cartBtn = document.getElementById('cart-btn')

    if (user) {
        if (loginBtn) loginBtn.style.display = "none"
        if (registerBtn) loginBtn.style.display = "none"
        if (logoutBtn) loginBtn.style.display = "inline-block"
        if (cartBtn) loginBtn.style.display = "inline-block"
    } else {
        if (loginBtn) loginBtn.style.display = "inline-block"
        if (registerBtn) loginBtn.style.display = "inline-block"
        if (logoutBtn) loginBtn.style.display = "none"
        if (cartBtn) loginBtn.style.display = "none"
    }
}

function getLoggedInUser() {
    return localStorage.getItem('loggedInUser')
}

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
