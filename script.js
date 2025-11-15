document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.cart-btn'); // matches index.html
    const cartItemCount = document.querySelector('.cart-icon span');
    const cartItemsList = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.cart-icon');
    const sidebar = document.getElementById('sidebar'); // use id without "."

    const checkoutBtn = document.querySelector('.checkot--btn');
const checkoutPopup = document.getElementById('checkoutPopup');
const closePopup = document.getElementById('closePopup');
const checkoutForm = document.getElementById('checkoutForm');
const cartDataInput = document.getElementById('cartData');

if (checkoutBtn && checkoutPopup) {
  checkoutBtn.addEventListener('click', () => {
    checkoutPopup.style.display = 'block';
  });
}

if (closePopup) {
  closePopup.addEventListener('click', () => {
    checkoutPopup.style.display = 'none';
  });
}

window.addEventListener('click', (e) => {
  if (e.target === checkoutPopup) {
    checkoutPopup.style.display = 'none';
  }
});

if (checkoutForm && cartDataInput) {
  checkoutForm.addEventListener('submit', () => {
    const cartJSON = JSON.stringify(cartItems);
    cartDataInput.value = cartJSON;
  });
}


    let cartItems = [];
    let totalAmount = 0;

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            const name = document.querySelectorAll('.box .content h3')[index].textContent.trim();
            const priceText = document.querySelectorAll('.box .content .price')[index].textContent;
            const price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;

            const existingItem = cartItems.find(ci => ci.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push({ name, price, quantity: 1 });
            }

            // recalc total
            totalAmount = cartItems.reduce((sum, it) => sum + it.price * it.quantity, 0);

            updateCartUI();
        });
    });

  /*   function updateCartUI() {
        updateCartItemCount(cartItems.reduce((s, i) => s + i.quantity, 0));
        updateCartItemsList();
        updateCartTotal();
    }
 */

    function updateCartUI() {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  updateCartItemCount(totalItems);
  updateCartItemsList();
  updateCartTotal();

  // ✅ Show/hide checkout button
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.style.display = totalItems > 0 ? 'block' : 'none';
  }
}

/* function updateCartUI() {
  const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0);
  updateCartItemCount(totalItems);
  updateCartItemsList();
  updateCartTotal();

  // Show/hide checkout button based on cart content
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.style.display = totalItems > 0 ? 'block' : 'none';
  }
} */


    function updateCartItemCount(count) {
        if (cartItemCount) cartItemCount.textContent = count;
    }

    function updateCartItemsList() {
        if (!cartItemsList) return;
        cartItemsList.innerHTML = '';

        cartItems.forEach((item, idx) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item', 'individual-cart-item');
            cartItem.innerHTML = `
                <span>(${item.quantity}x) ${item.name}</span>
                <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}
                    <button class="remove-btn" data-index="${idx}"><i class="fa-solid fa-times"></i></button>
                </span>
            `;
            cartItemsList.appendChild(cartItem);
        });

        // attach remove handlers
        cartItemsList.querySelectorAll('.remove-btn').forEach((btn) => {
            btn.addEventListener('click', (event) => {
                const index = parseInt(event.currentTarget.dataset.index, 10);
                cartItems.splice(index, 1);
                totalAmount = cartItems.reduce((sum, it) => sum + it.price * it.quantity, 0);
                updateCartUI();
            });
        });
    }

    function updateCartTotal() {
        if (cartTotal) cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
    }

    if (cartIcon && sidebar) {
        cartIcon.addEventListener('click', () => sidebar.classList.toggle('open'));
        const closeButton = document.querySelector('.sidebar-close');
        if (closeButton) closeButton.addEventListener('click', () => sidebar.classList.remove('open'));
    }
});
