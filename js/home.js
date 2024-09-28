import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getDatabase, ref, set, get, child, onValue } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";
// Firebase configuration
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
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const offersRef = database.ref("offers/");
const userPayment = database.ref("payouts/");
const methodsRef = database.ref("methods/");
const usersRef = database.ref("users/");
const updateRef = database.ref("Update/");


const txt1 = document.getElementById('txt1'); // Total amount
const txt2 = document.getElementById('txt2'); // Accepted amount
const txt3 = document.getElementById('txt3'); // Rejected amount
const txt4 = document.getElementById('txt4'); // Pending amount
const versionCode = document.getElementById('versionCode'); // Pending amount


// Get DOM elements
const usersTableBody = document.getElementById('users-table-body');
const offersTableBody = document.getElementById('offers-table-body');



const versionCodeElement = document.getElementById('versionUpdate');
const versionForm = document.getElementById('versionForm');
const saveVersionBtn = document.getElementById('saveVersionBtn');
const closeVersion = document.getElementById('close');
const alert = document.querySelector(".alert");


// Initialize form display


// Show form when version code is clicked
versionCodeElement.addEventListener('click', () => {
    versionForm.style.display = 'flex';
});

// Hide form when close button is clicked
closeVersion.addEventListener('click', () => {
    versionForm.style.display = 'none';
});



//users payments

userPayment.on('value', (snapshot) => {
    const payouts = snapshot.val();
    console.log(payouts);
    // Initialize totals
    let totalAmount = 0;
    for (const payoutKey in payouts) {
        if (payouts.hasOwnProperty(payoutKey)) {
            const payout = payouts[payoutKey];
            const amount = parseFloat(payout.amount) || 0; // Ensure amount is a number 
            // Calculate totals
            totalAmount += amount;
        }
    }

    // Update text elements with calculated totals
    txt2.textContent = `${totalAmount} $`;

});



//users list
usersRef.on('value', (snapshot) => {
    const users = snapshot.val();
    let usersCounts = 0;

    // Convert the users object to an array
    const usersArray = Object.keys(users).map(key => ({
        key: key,
        ...users[key]
    }));

    // Sort the array by the coin property in descending order
    usersArray.sort((a, b) => b.coin - a.coin);

    // Get the top 3 users
    const topUsers = usersArray.slice(0, 3);

    // Clear existing table data
    usersTableBody.innerHTML = '';


    // Create a row for each of the top 3 users
    topUsers.forEach(user => {
        usersCounts++;
        const row = `
            <tr>
                <td>${user.gmail}</td>
                <td>${user.coin} Witch coin</td>
                <td>${user.ReffCode}</td>
            </tr>`;

        // Append the row to the table body
        usersTableBody.innerHTML += row;
    });
    txt1.textContent = `${usersCounts}`;
    txt4.textContent = `${usersCounts}`;
});


//offer list 
offersRef.on('value', (snapshot) => {
    const offers = snapshot.val();

    const offersArray = Object.keys(offers).map(key => ({
        key: key,
        ...offers[key]
    }));



    // Get the top 3 offers
    const topoffers = offersArray.slice(0, 3);


    offersTableBody.innerHTML = ''; // Clear the table before adding new rows
    let offersCount = 0;

    topoffers.forEach(offer => {
        offersCount++;
        const row = `
            <tr>
                <td><img src="${offer.img}" style="width: 50px; height: auto; border-radius: 10px;box-shadow: rgb(49, 4, 134) 5px 10px 50px, rgb(4, 49, 134) -5px 0px 250px;"></td>
                <td>${offer.title}</td>    
                <td>${offer.prix}</td>
            </tr>`;

        // Append the row to the table body
        offersTableBody.innerHTML += row;
    });


    txt3.textContent = `${offersCount}`;

});






document.addEventListener('DOMContentLoaded', () => {
    // Get the form element by its ID
    const versionForm = document.getElementById('versionForm');
    const versionCode = document.getElementById('versionCode');
    const alert = document.getElementById('alert'); // Assuming there's an alert element for success messages

    // Check if versionForm exists
    if (versionForm) {
        versionForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission behavior

            // Get the version value from the input field
            const version = document.getElementById('versionInput').value;

            // Check if updateRef is correctly defined and connected to your Firebase setup
            if (updateRef) {
                // Use Firebase set method to update the existing version value
                updateRef.set({
                    version: version
                }).then(() => {
                    // Display success message
                    if (alert) {
                        alert.style.display = "block";
                        setTimeout(() => {
                            alert.style.display = "none";
                            versionForm.style.display = 'none';
                        }, 2000);
                    }
                }).catch((error) => {
                    console.error('Error setting data:', error);
                });
            } else {
                console.error('updateRef is not defined or improperly initialized.');
            }

            // Reset the form fields after submission
            versionForm.reset();
        });
    } else {
        console.error('versionForm element not found.');
    }

    // Check if versionCode exists and listen for changes
    if (versionCode) {
        // Listen for changes at the specified database reference
        updateRef.on('value', (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                // Display the version in the text element
                versionCode.textContent = `${data.version}`;
            } else {
                versionCode.textContent = 'X.X.X';
            }
        }, (error) => {
            console.error('Error fetching version data:', error);
            versionCode.textContent = 'Error fetching version data';
        });
    } else {
        console.error('versionCode element not found.');
    }
});

