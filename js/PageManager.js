// Getting elements by their IDs
const payouts = document.getElementById("payouts");
const home = document.getElementById("home");
const offers = document.getElementById("offers");
const notify = document.getElementById("notify");
const payments = document.getElementById("payments");
const users = document.getElementById("users");

// Adding click event listeners to each button
payouts.addEventListener('click', function() {
    window.location.href = 'payouts.html'; // Redirects to payouts.html
});

home.addEventListener('click', function() {
    window.location.href = 'index.html'; // Redirects to home.html
});

offers.addEventListener('click', function() {
    window.location.href = 'offers.html'; // Redirects to offers.html
});

notify.addEventListener('click', function() {
    window.location.href = 'notify.html'; // Redirects to notify.html
});

payments.addEventListener('click', function() {
    window.location.href = 'payments.html'; // Redirects to payments.html
});

users.addEventListener('click', function() {
    window.location.href = 'users.html'; // Redirects to users.html
});
