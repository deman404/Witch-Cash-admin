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
const methodsRef = ref(database, "methods");

// Get DOM elements
const methodForm = document.getElementById('method-form');
const alert = document.querySelector(".alert");
const danger = document.querySelector(".danger");
const methodTableBody = document.getElementById('method-table-body');

// Text elements for displaying counts
const txt1 = document.getElementById('methods');      // App methods count


// Handle form submission
methodForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const img = document.getElementById('method-img').value;
    const title = document.getElementById('method-title').value;
    const description = document.getElementById('method-description').value;
    const prix = document.getElementById('method-price').value;


    push(methodsRef, {
        img: img,
        title: title,
        description: description,
        prix: prix,
    });

    alert.style.display = "block";

    setTimeout(() => {
        alert.style.display = "none";
    }, 2000);

    methodForm.reset();
});

// Fetch and display methods
onValue(methodsRef, (snapshot) => {
    const methods = snapshot.val();
    methodTableBody.innerHTML = ''; // Clear the table before adding new rows

    // Initialize counters for each type
    let methodCount = 0;
    

    for (const methodKey in methods) {
        if (methods.hasOwnProperty(methodKey)) {
            const method = methods[methodKey];
            // Count the number of methods by type
            methodCount++;
        

            const row = `
            <tr data-id="${methodKey}">
                <td><img src="${method.img}" style="width: 50px; height: auto; border-radius: 10px; box-shadow: rgb(49, 4, 134) 5px 10px 50px, rgb(4, 49, 134) -5px 0px 250px;"></td>
                <td>${method.title}</td>
                <td>${method.description}$</td>
                <td>${method.prix} Coins</td>
                <td>
                    <button class="btn btn-danger delete" data-id="${methodKey}">Delete</button>
                </td>
            </tr>`;
            methodTableBody.innerHTML += row;
        }
    }

    // Update the count display elements
    txt1.textContent = methodCount;
    

    // Add delete functionality to each delete button
    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const methodKey = this.getAttribute('data-id');
            if (confirm("Are you sure you want to delete this method?")) {
                remove(ref(database, `methods/${methodKey}`));
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
    const form = document.getElementById('method-form');
    const isFormVisible = form.style.display === 'block';

    if (isFormVisible) {
        form.style.display = 'none';
        this.textContent = 'Show Form';
    } else {
        form.style.display = 'block';
        this.textContent = 'Hide Form';
    }
});
