let user = {};
let users = [];

// Get users from LocalStorage
function getSavedUser() {
    if (localStorage.getItem('users')) {
        users = JSON.parse(localStorage.users);
        console.log(users);        
    } else {
        users = [];
        console.log('users data not found');
    }
}

// Check if username and password is not empty
function checkIfEmpty(username, password) {
    if (username === '' || password === '') {
        return false;
    }
    return true;
}

// Update users to LocalStorage
function updateUsers() {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    // console.log(username,password);
    if (checkIfEmpty(username,password) === true) {
        user[`${username}`] = password;
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// If everithing is right move to home page
function moveHome() {
    window.location = 'index.html';
}

const sign_btn = document.querySelector('#sign-btn');
sign_btn.addEventListener('click', () => {
    getSavedUser();
    updateUsers();
    // moveHome();
})