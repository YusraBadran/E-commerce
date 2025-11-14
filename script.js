/* document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemCount = document.querySelector('.cart-icon span');
    const cartItemsList = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.cart-icon');
    const sidebar = document.getElementById('sidebar');

    let cartItems = [];
    let totalAmount = 0;

    addToCartButtons.forEach((button ,index) => {
        button.addEventListener('click', () => {
            const item = {
                name : document.querySelectorAll('.box .content h3')[index].textContent,
                price : parseFloat(document.querySelectorAll('.box .content .price')[index].textContent.slice(1),
                ),
                quantity : 1,
            };


            const existingItem = cartItems.find((cartItem) => cartItem.name === item.name,
            );
            if (existingItem > -1) {
                existingItem.quantity++;
            } else {
                cartItems.push(item);
            } 

            totalAmount += item.price;

            updateCartUI();
        });

        function updateCartUI(){
            updateCartItemCount(cartItems.length);
            updateCartItemsList();
            updateCartTotal();
        }

        function updateCartItemCount(count){
            cartItemCount.textContent = count;
        }
            
        function updateCartItemsList(){
            cartItemsList.innerHTML = '';
            cartItems.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item','individual-cart-item');
                cartItem.innerHTML = ` 
                <span>(${item.quantity}x)${item.name}</span>
                <span class="cart-item-price">$${(item.price * item.quantity).toFixed(
                    2,
                )}
                <button class="remove-btn" data-index="${index}"><i class="fa-solid fa-times"></i></button>
                </span>
                `; 
                cartItemsList.append(cartItem)
        });
    }

        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach((button)=>{
            button.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                removeItemFromCart(index);
        });
        });      


        function removeItemFromCart(index){
            const removeItem = cartItem.splice(index, 1)[0];
            totalAmount -= removeItem.price * removeItem.quantity;
            updateCartUI();
        }

        function updateCartTotal(){
            cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
        }
        
        cartIcon.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

        const closeButton = document.querySelector('.sidebar-close');
        closeButton.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });
    });
}); */



document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.cart-btn'); // matches index.html
    const cartItemCount = document.querySelector('.cart-icon span');
    const cartItemsList = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.cart-icon');
    const sidebar = document.getElementById('sidebar'); // use id without "."

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

    function updateCartUI() {
        updateCartItemCount(cartItems.reduce((s, i) => s + i.quantity, 0));
        updateCartItemsList();
        updateCartTotal();
    }

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
