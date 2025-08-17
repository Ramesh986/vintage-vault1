document.addEventListener('DOMContentLoaded', () => {
  const orderList = document.getElementById('order-list');
  const subtotalEl = document.getElementById('subtotal');
  const confirmBtn = document.getElementById('confirmOrderBtn');
  const clearBtn = document.getElementById('clearCartBtn');
  const cartCountEl = document.getElementById("cart-count-display");

  // Load cart
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function formatINR(n) {
    return n.toLocaleString("en-IN");
  }

  function calcSubtotal() {
    const total = cart.reduce((acc, item) => acc + parseInt(item.price, 10), 0);
    subtotalEl.textContent = `₹${formatINR(total)}`;
  }

  function render() {
    orderList.innerHTML = '';

    if (cart.length === 0) {
      orderList.innerHTML = `<p class="empty-message">No items in cart!</p>`;
      subtotalEl.textContent = '₹0';
      if (cartCountEl) cartCountEl.textContent = "Your cart is empty.";
      return;
    }

    if (cartCountEl) cartCountEl.textContent = `You have ${cart.length} item(s) in your cart.`;

    cart.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'card order-card mb-3';

      card.innerHTML = `
        <div class="row no-gutters align-items-center">
          <div class="col-md-4">
            <img src="${item.img}" alt="${item.name}" class="thumb">
          </div>
          <div class="col-md-8">
            <div class="card-body d-flex justify-content-between align-items-start">
              <div>
                <h5 class="title">${item.name}</h5>
                <p class="price">₹${formatINR(parseInt(item.price, 10))}</p>
              </div>
              <div class="actions">
                <button class="remove-btn btn btn-sm btn-danger" data-index="${index}">Remove</button>
              </div>
            </div>
          </div>
        </div>
      `;

      orderList.appendChild(card);
    });

    calcSubtotal();
  }

  // Remove single item
  orderList.addEventListener('click', (e) => {
    const btn = e.target.closest('.remove-btn');
    if (!btn) return;

    const idx = parseInt(btn.dataset.index, 10);
    if (Number.isInteger(idx)) {
      cart.splice(idx, 1);
      saveCart();
      render();
    }
  });

  // Confirm button
  confirmBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    window.location.href = 'checkout.html';
  });

  // Clear Cart
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      cart = [];
      localStorage.removeItem('cart');
      render();
    });
  }

  // initial render
  render();
});
