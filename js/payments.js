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
const userPayment = database.ref("payouts/");

const payoutsTableBody = document.getElementById('payouts-table-body');


const txt1 = document.getElementById('txt1'); // Total amount
const txt2 = document.getElementById('txt2'); // Accepted amount
const txt3 = document.getElementById('txt3'); // Rejected amount
const txt4 = document.getElementById('txt4'); // Pending amount



payoutsTableBody.innerHTML = ''; // Clear existing table data

userPayment.on('value', (snapshot) => {
    const payouts = snapshot.val();
    console.log(payouts);
    payoutsTableBody.innerHTML = ''; // Clear the table before adding new rows
    // Initialize totals
    let totalAmount = 0;
    let acceptedAmount = 0;
    let rejectedAmount = 0;
    let pendingAmount = 0;


    for (const payoutKey in payouts) {
        if (payouts.hasOwnProperty(payoutKey)) {
            const payout = payouts[payoutKey];
            const amount = parseFloat(payout.amount) || 0; // Ensure amount is a number
            const row = `
            <tr data-id="${payoutKey}">
                <td>${payout.gmail}</td>
                <td>${payout.amount}</td>
                <td>${payout.method}</td>
                <td class="offer-statue">${payout.status}</td>
                <td>
                    <button class="btn btn-primary submit" data-id="${payoutKey}">Submit</button>
                    <button class="btn btn-danger reject" data-id="${payoutKey}">Reject</button>
                </td>
            </tr>`;
            payoutsTableBody.innerHTML += row;

            // Calculate totals
            totalAmount += amount;
            if (payout.status === 'Completed') {
                acceptedAmount += amount;
            } else if (payout.status === 'rejected') {
                rejectedAmount += amount;
            } else if (payout.status === 'pending') {
                pendingAmount += amount;
            }

        }
    
    }

    // Update text elements with calculated totals
    txt1.textContent = `${totalAmount} $`;
    txt2.textContent = `${acceptedAmount} $`;
    txt3.textContent = `${rejectedAmount} $`;
    txt4.textContent = `${pendingAmount} $`;

    const AcceptButtons = document.querySelectorAll('.submit');
    const rejectButtons = document.querySelectorAll('.reject');

    rejectButtons.forEach(button => {
        button.addEventListener('click', function () {
            const payoutKey = this.getAttribute('data-id');
            const titleCell = this.parentElement.parentElement.querySelector('.offer-statue');
            titleCell.textContent = 'rejected';


            userPayment.child(payoutKey).update({ status: 'rejected' })
                .then(() => {
                    console.log("Title updated in Firebase successfully.");
                })
                .catch((error) => {
                    console.error("Error updating title in Firebase:", error);
                });

        });

    });

    AcceptButtons.forEach(button => {
        button.addEventListener('click', function () {
            const payoutKey = this.getAttribute('data-id');
            const titleCell = this.parentElement.parentElement.querySelector('.offer-statue');
            titleCell.textContent = 'Completed';


            userPayment.child(payoutKey).update({ status: 'Completed' })
                .then(() => {
                    console.log("Title updated in Firebase successfully.");
                })
                .catch((error) => {
                    console.error("Error updating title in Firebase:", error);
                });
        });

    });
























});
