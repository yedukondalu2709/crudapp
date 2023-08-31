// Variables

const nameInput = document.getElementById("name-input");

const emailInput= document.getElementById("email-input");

const addBtn = document.getElementById("add-btn");

const tableBody= document.getElementById("table-body");

const updateNameInput = document.getElementById("update-name-input");

const updateEmailInput = document.getElementById("update-email-input");

const updateBtn = document.getElementById("update-btn");

const cancelBtn = document.getElementById("cancel-btn");

let users = JSON.parse(localStorage.getItem("users")) || [];

let currentUserId = null;

const validRegex = /^[a-z]$/;

// Functions

function renderTable() {

tableBody.innerHTML ="";

for (let i = 0; i < users.length; i++) {

const user = users[i];

const tr = document.createElement("tr");

const idTd = document.createElement("td");

const nameTd = document.createElement("td");

const emailTd = document.createElement("td");
const actionsTd= document.createElement("td");

const editBtn = document.createElement("button");

editBtn.className = "edit-btn";

const deleteBtn = document.createElement("button"); deleteBtn.className="delete-btn";

idTd.innerText = user.id;

nameTd.innerText = user.name;

emailTd.innerText = user.email;

editBtn.innerText = "Edit";

 deleteBtn.innerText = "Delete";

editBtn.addEventListener("click", () => {

showUpdateForm(user.id);

});

deleteBtn.addEventListener("click", () => {

deleteUser (user.id);
});
actionsTd.appendChild(editBtn);

actionsTd.appendChild(deleteBtn); tr.appendChild(idTd);

tr.appendChild(nameTd);

 tr.appendChild(emailTd);

tr.appendChild(actionsTd);

tableBody.appendChild(tr);
}
}

function addUser() {
    const name = nameInput.value.trim(); // Get and trim the value of the nameInput element
    const email = emailInput.value.trim(); // Get and trim the value of the emailInput element

    if (!email.match(validRegex)) { // Check if the email matches a valid regex pattern
        if (name && email != null) { // Check if both name and email are not empty or null
            var id = 1; // Initialize id with 1
            
            // Find the index of the current id in the users array
            var val = users.map(function(x){return x.id; }).indexOf(id);
            
            // Increment the id until it's not found in the users array
            while (val != -1) {
                id++;
                val = users.map(function(x){return x.id; }).indexOf(id);
            }
            
            const user = {
                id: id,
                name: name,
                email: email,
            };
            
            users.push(user); // Add the new user object to the users array
            localStorage.setItem("users", JSON.stringify(users)); // Store the updated users array in localStorage
            nameInput.value = ""; // Clear the name input
            emailInput.value = ""; // Clear the email input
            renderTable(); // Render the updated table (presumably a UI function)
        } else {
            alert("Name is Required"); // Show an alert if the name is empty or null
        }
    } else {
        alert("Invalid email address!"); // Show an alert if the email is not valid
    }
}
    
    function updateUser() {
    
    const name = updateNameInput.value;
    
    const email = updateEmailInput.value;
    
    if(!email.match(validRegex)){
    
    const index = users.findIndex((user) => user.id === currentUserId);
    
    if (index !== -1) {
    
    users[index].name = name;
    
    users[index].email = email;
    
    localStorage.setItem("users", JSON.stringify(users));
    
    hideUpdateForm();
    
    renderTable();
    
    }
    
    }else{
    
    alert("Invalid email address!");

    }
}


    function showUpdateForm(userId) {

        const user = users.find((user) => user.id === userId);
        
        if (user) {
        
        updateNameInput.value = user.name; updateEmailInput.value = user.email;
        
        currentUserId = user.id;
        
        updateBtn.addEventListener("click", updateUser);
        
        cancelBtn.addEventListener("click", hideUpdateForm);
        
        updateBtn.style.display="inline-block";
        
        cancelBtn.style.display= "inline-block";
        
        updateNameInput.style.display = "inline-block"
        
        updateEmailInput.style.display = "inline-block";
        
        document.getElementById("update-container").style.display = "block";
        }
    }

        function hideUpdateForm() {
        
        updateNameInput.value = "";
        
        updateEmailInput.value ="";
        
        currentUserId = null;
        
        updateBtn.removeEventListener("click", updateUser);
        
        cancelBtn.removeEventListener("click", hideUpdateForm);
        
        updateBtn.style.display = "none";
        
        cancelBtn.style.display = "none";
        
        updateNameInput.style.display = "none"
        
        updateEmailInput.style.display = "none";
        
        document.getElementById("update-container").style.display = "none";
        
        }
        
        function deleteUser (userId) {
        
        users = users.filter((user) => user.id !== userId);
        
        localStorage.setItem("users", JSON.stringify(users));
        
        if (users.length == 0){
        
        hideUpdateForm();
        }
        renderTable();
        
        }
        
        // Event Listeners
        
        addBtn.addEventListener("click", addUser);
        
        // Initialize table

        renderTable();
