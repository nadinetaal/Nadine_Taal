		window.onload = function() {
			try {
				var searchIcon = document.querySelector(".search-box-icon");
				var searchInput = document.querySelector(".input");

				if (searchIcon && searchInput) {
					searchIcon.addEventListener("click", function(event) {
						event.preventDefault();
						var searchQuery = searchInput.value.trim().toLowerCase();
						console.log("Search query:", searchQuery);

						var searchTerms = searchQuery.split(' ');
						var productName = searchTerms[0];
						var productColor = searchTerms.slice(1).join(' ');

						switch (productName) {
							case "home":
								window.location.href = "home.html";
								break;
							case "product":
								window.location.href = "product.html";
								break;
							case "about us":
								window.location.href = "aboutUs.html";
								break;
							case "about":
								window.location.href = "aboutUs.html";
								break;									
							case "contact us":
								window.location.href = "contactUs.html";
								break;
							case "contact":
								window.location.href = "contactUs.html";
								break;
							case "location":
								window.location.href = "contactUs.html#l";
								break;									
							case "product":
								window.location.href = "product.html";
								break;								
							case "victorinox":
								window.location.href = "product.html#V";
								break;
							case "technomarine":
								window.location.href = "product.html#M";
								break;
							case "apple":
								window.location.href = "product.html#A";
								break;
							case "tag":
								window.location.href = "product.html#T";
								break;							
							default:
								alert("No matching page found for the search query.");
						}
					});
				} else {
					console.error("Search icon or input not found.");
				}
			} catch (error) {
				console.error("An error occurred:", error);
			}
		};
			
document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItemCount = document.querySelector(".cart-icon span");
    const cartItemList = document.querySelector(".cart-items");
    const cartIcon = document.querySelector(".cart-icon");
    const sidebar = document.getElementById("sidebar");
    const cartTotal = document.querySelector(".cart-total");
    const closeButton = document.querySelector(".sidebar-close");

    let cartItems = [];
    let totalAmount = 0;

    // Retrieve cart items from local storage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
        cartItems = storedCartItems;
        updateCartUI();
    }

    addToCartButtons.forEach((button, index) => {
        button.addEventListener("click", (event) => {
            const card = event.target.closest('.card');
            const item = {
                name: card.querySelector(".card-title").textContent.trim(),
                subtitle: card.querySelector(".card-subtitle").textContent.trim(),
                price: parseFloat(card.querySelector(".card-price").textContent.replace("₱", "").replace(",", "")),
                quantity: parseInt(card.querySelector(".quantity-input").value)
            };

            const existingItemIndex = cartItems.findIndex(cartItem => cartItem.name === item.name && cartItem.subtitle === item.subtitle);

            if (existingItemIndex !== -1) {
                cartItems[existingItemIndex].quantity += item.quantity;
            } else {
                cartItems.push(item);
            }

            totalAmount = cartItems.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);

            // Store cart items in local storage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            updateCartUI();
            openSidebar(); // Show sidebar when item is added
        });
    });

    function updateCartUI() {
        updateCartItemCount();
        updateCartItemList();
        updateCartTotal();
    }

    function updateCartItemCount() {
        const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
        cartItemCount.textContent = itemCount;
    }

    function updateCartItemList() {
        cartItemList.innerHTML = "";
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item", "individual-cart-item");
            cartItem.innerHTML = `
                <span>(${item.quantity}x) ${item.name} - ${item.subtitle}</span>
                <span class="cart-item-price">₱${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-item">Remove</button>
            `;
            cartItem.querySelector('.remove-item').addEventListener('click', () => {
                cartItems.splice(index, 1);
                localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update local storage after removing item
                updateCartUI();
            });
            cartItemList.appendChild(cartItem);
        });
    }

    function updateCartTotal() {
        cartTotal.textContent = `Total: ₱${totalAmount.toFixed(2)}`;
    }

    function openSidebar() {
        sidebar.classList.add("open");
    }

    function closeSidebar() {
        sidebar.classList.remove("open");
    }

    cartIcon.addEventListener("click", openSidebar);
    closeButton.addEventListener("click", closeSidebar);

    // Change the link to ordersum.html to a function call
    document.querySelector(".checkout-btn").addEventListener("click", () => {
        // Redirect to ordersum.html
        window.location.href = "ordersum.html";
    });
});