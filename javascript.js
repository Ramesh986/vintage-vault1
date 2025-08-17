document.addEventListener('DOMContentLoaded', function () {
  const cartButtons = document.querySelectorAll('.add-to-cart');

  cartButtons.forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault();

      const name = this.getAttribute('data-name');
      const price = this.getAttribute('data-price');
      const img = this.closest('.card').querySelector('img').src; // image nikal lo

      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      cart.push({ name, price, img });

      localStorage.setItem('cart', JSON.stringify(cart));

      showToast(`${name} added to cart!`);
    });
  });

  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "toast-message show";
    setTimeout(() => {
      toast.className = toast.className.replace("show", "");
    }, 3000);
  }
});
