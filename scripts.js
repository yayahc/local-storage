let user = {};
let users = [];

// Get users from LocalStorage
function getSavedUser() {
    if (localStorage.getItem('users')) {
        users = JSON.parse(localStorage.users);       
    } else {
        users = [];
        console.log('users data not found');
    }
}

// Check if username and password is not empty
function checkEmptyAndExistingUser(username, password,confirm_sign_password) {    
    for (let i = 0; i < users.length; i++) {
        if (users[i][username]) {
            alert('username already exist');
            return false;
        }
    }
    if (username === '' || password === '') {
        alert('pls enter your username and password');
        return false;
    } else if (password.length < 8) {
        alert('password too short');
        return false;
    } else if (password != confirm_sign_password) {
        alert('password are different');
        return false;
    }
    return true;
}

// Update users to LocalStorage
function updateUsers() {
    const sign_username = document.querySelector('#sign-username').value;
    const sign_password = document.querySelector('#sign-password').value;
    const confirm_sign_password = document.querySelector('#confirm-sign-password').value;
    // console.log(username,password);
    if (checkEmptyAndExistingUser(sign_username,sign_password,confirm_sign_password) === true) {
        user[`${sign_username}`] = sign_password;
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// If everithing is right move to home page with username
function moveHome() {
    const login_username = document.querySelector('#login-username').value;
    window.location = `home.html?username=${login_username}`;
}

// Get users
function getLoginUser(users, currentUser, currentPassword) {
    let userPassword = null;
    for (let i = 0; i < users.length; i++) {
        if ((users[i])[currentUser]) {
            userPassword = (users[i])[currentUser];
            if (userPassword === currentPassword) {
                return true;
            } else {
                return false;
            }
        }
    }
    return false;
}

// Login user asap
function loginUser() {
    const login_username = document.querySelector('#login-username').value;
    const login_password = document.querySelector('#login-password').value;
    getSavedUser();    
    if (getLoginUser(users,login_username,login_password) === true) {
        return true;
    } else {
        return false;
    }
}

// Sign user asap
const sign_btn = document.querySelector('#sign-btn');
sign_btn.addEventListener('click', () => {
    getSavedUser();
    updateUsers();
    // moveHome();
})

// Move to home if ready
const login_btn = document.querySelector('#login-btn');
login_btn.addEventListener('click', () => {
    if (loginUser() === true) {
        moveHome();
    } else {
        alert('wrong username or password');
    }
})


// Show forgot password screen
function showForgotPasswordScreen() {
    const forgot_password_screen = document.querySelector('#forgot-password-screen');
    forgot_password_screen.style.display = 'block';
}

// Find user password
function findUserPassword() {
    const forgot_username = document.querySelector('#forgot-username').value;
    let user_password = '';
    for (let i = 0; i < users.length; i++) {        
        if (Object.keys(users[i]) == forgot_username) {
            user_password = users[i][forgot_username];
            // alert('your password is : '+user_password);
            alert('your password will be send to your email asap')
            return true;
        }
    }
    alert('wrong username pls retry');
    return false;
}

// If forgot password
const forgot_password = document.querySelector('#forgot-password');
const find_password = document.querySelector('#find-password');
forgot_password.addEventListener('click', () => {
    showForgotPasswordScreen();
})
find_password.addEventListener('click', () => {
    getSavedUser();
    findUserPassword();
})