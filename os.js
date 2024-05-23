    function addItemToSidebar(name, color, price) {
        // Create a new item element
        var newItem = document.createElement("div");
        newItem.className = "cart-item";
        
        // Construct the item HTML
        newItem.innerHTML = `
            <div class="item-details">
                <span class="item-name">${name}</span>
                <span class="item-color">${color}</span>
            </div>
            <div class="item-price">${price}</div>
        `;
        
        // Append the new item to the cart
        var cartItems = document.querySelector(".cart-items");
        cartItems.appendChild(newItem);
        
        // Update the total amount
        updateTotal();
    }

    // Function to update the total amount in the sidebar/cart
    function updateTotal() {
        var cartTotal = 0;
        var cartPrices = document.querySelectorAll(".item-price");
        
        // Calculate the total price
        cartPrices.forEach(function(priceElement) {
            cartTotal += parseFloat(priceElement.textContent.replace("₱", ""));
        });
        
        // Update the total amount display
        var cartTotalDisplay = document.querySelector(".cart-total");
        cartTotalDisplay.textContent = "₱" + cartTotal.toFixed(2);
    }