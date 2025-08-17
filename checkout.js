document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('checkoutForm');
  const success = document.getElementById('success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check for valid input (additional)
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();
    const address = form.address.value.trim();
    const pincode = form.pincode.value.trim();

    // Basic validation
    if (
      name.length < 3 ||
      !/^\d{10}$/.test(phone) ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) ||
      address.length < 8 ||
      !/^\d{6}$/.test(pincode)
    ) {
      alert("Please fill all fields correctly.");
      return;
    }

    // Clear cart (simulate order placed)
    localStorage.removeItem('cart');
    success.classList.remove('hide');

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2500);
  });
});
