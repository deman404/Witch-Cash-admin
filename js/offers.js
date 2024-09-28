// Firebase configuration and initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCuUdKBS7BPyXK3mKtf03Lwo4-xHHzh1zM",
    authDomain: "witch-cash.firebaseapp.com",
    databaseURL: "https://witch-cash-default-rtdb.firebaseio.com",
    projectId: "witch-cash",
    storageBucket: "witch-cash.appspot.com",
    messagingSenderId: "1076902528399",
    appId: "1:1076902528399:web:7b978b6794c5d908c1b7fa",
    measurementId: "G-S4QYK586KQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const offersRef = ref(database, "offers");

// Get DOM elements
const offerForm = document.getElementById('offer-form');
const alert = document.querySelector(".alert");
const danger = document.querySelector(".danger");
const offersTableBody = document.getElementById('offers-table-body');

// Text elements for displaying counts
const txt1 = document.getElementById('app');      // App offers count
const txt2 = document.getElementById('game');     // Game offers count
const txt3 = document.getElementById('service');  // Service offers count
const txt4 = document.getElementById('servery');  // Servery offers count

// Handle form submission
offerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const img = document.getElementById('offer-img').value;
    const title = document.getElementById('offer-title').value;
    const description = document.getElementById('offer-description').value;
    const prix = document.getElementById('offer-price').value;
    const type = document.getElementById('offer-type').value;

    push(offersRef, {
        img: img,
        title: title,
        description: description,
        prix: prix,
        type: type
    });

    alert.style.display = "block";

    setTimeout(() => {
        alert.style.display = "none";
    }, 2000);

    offerForm.reset();
});

// Fetch and display offers
onValue(offersRef, (snapshot) => {
    const offers = snapshot.val();
    offersTableBody.innerHTML = ''; // Clear the table before adding new rows

    // Initialize counters for each type
    let appCount = 0;
    let gameCount = 0;
    let serviceCount = 0;
    let serveryCount = 0;

    for (const offerKey in offers) {
        if (offers.hasOwnProperty(offerKey)) {
            const offer = offers[offerKey];

            // Count the number of offers by type
            switch (offer.type) {
                case 'App': // Assuming 'item1' corresponds to App
                    appCount++;
                    break;
                case 'Game': // Assuming 'item2' corresponds to Game
                    gameCount++;
                    break;
                case 'Service': // Assuming 'item3' corresponds to Service
                    serviceCount++;
                    break;
                case 'Servery': // Assuming 'item4' corresponds to Servery
                    serveryCount++;
                    break;
            }

            const row = `
            <tr data-id="${offerKey}">
                <td><img src="${offer.img}" style="width: 50px; height: auto; border-radius: 10px;"></td>
                <td>${offer.title}</td>
                <td>${offer.type}</td>
                <td>${offer.description}</td>
                <td>${offer.prix}</td>
                <td>
                    <button class="btn btn-success view">View</button>
                    <button class="btn btn-danger delete" data-id="${offerKey}">Delete</button>
                </td>
            </tr>`;
            offersTableBody.innerHTML += row;
        }
    }

    // Update the count display elements
    txt1.textContent = appCount;
    txt2.textContent = gameCount;
    txt3.textContent = serviceCount;
    txt4.textContent = serveryCount;

    // Add delete functionality to each delete button
    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const offerKey = this.getAttribute('data-id');
            if (confirm("Are you sure you want to delete this offer?")) {
                remove(ref(database, `offers/${offerKey}`));
            }
            danger.style.display = "block";

            setTimeout(() => {
                danger.style.display = "none";
            }, 2000);
        });
    });
});

// Toggle form visibility
document.getElementById('toggleFormBtn').addEventListener('click', function () {
    const form = document.getElementById('offer-form');
    const isFormVisible = form.style.display === 'block';

    if (isFormVisible) {
        form.style.display = 'none';
        this.textContent = 'Show Form';
    } else {
        form.style.display = 'block';
        this.textContent = 'Hide Form';
    }
});
