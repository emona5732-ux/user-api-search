const userList = document.querySelector("#userList");
const searchInput = document.querySelector("#searchInput");
const loading = document.querySelector("#loading");
const userDetails = document.querySelector("#userDetails");

let data = [];

async function getUsers() {
    loading.innerText = "Loading users...";
    loading.style.display = "block";
    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        data = await response.json();

        loading.style.display = "none";

        displayUsers(data);
    } catch {
        loading.innerText = "Failed to load users";
        loading.style.display = "block";
    }
}

function displayUsers(users) {
    userList.innerHTML = "";

    users.forEach(user => {
        const div = document.createElement("div");

        div.innerText = `Name: ${user.name}
Username: ${user.username}
Email: ${user.email}`;
        const button = document.createElement("button");

        button.innerText = "View Details";

        button.addEventListener("click", () => {
            userDetails.innerHTML = `
        <div class="details-card">
            <h2>User Details</h2>
            <p>Name: ${user.name}</p>
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <button>Close</button>
        </div>
    `;

            const closeBtn = userDetails.querySelector("button");

            closeBtn.addEventListener("click", () => {
                userDetails.innerHTML = "";
            })
        });

        div.appendChild(button);

        div.classList.add("user-card");

        userList.appendChild(div);
    });
}

searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase();

    const filteredUsers = data.filter(user => {
        return user.name.toLowerCase().includes(searchText) || user.username.toLowerCase().includes(searchText) || user.email.toLowerCase().includes(searchText);
    });

    displayUsers(filteredUsers);
});

getUsers();