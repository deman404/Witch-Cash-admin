// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Reference to the users node in the database
const usersRef = ref(database, "users/");

// Get DOM elements
const usersTableBody = document.getElementById('users-table-body');
const userCountText = document.getElementById('userCount');

// Fetch users from Firebase
onValue(usersRef, (snapshot) => {
    const users = snapshot.val();
    let userCount = 0; // Initialize user count

    usersTableBody.innerHTML = ''; // Clear existing table data

    for (const userKey in users) {
        if (users.hasOwnProperty(userKey)) {
            const user = users[userKey];
            userCount++; // Increment user count

            // Create a row for each user
            const row = `
                <tr>
                    <td>${user.gmail}</td>
                    <td>${user.coin} Witch coin</td>
                    <td>${user.ReffCode}</td>
                    <td>@USER${user.username}</td>
                </tr>`;

            // Append the row to the table body
            usersTableBody.innerHTML += row;
        }
    }

    // Update the text to show the total number of users
    userCountText.textContent = `${userCount}`;
});
