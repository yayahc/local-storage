let user = {};
let users = [];

let username_crypt = '';
let password_crypt = '';

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
    cryptData(sign_password);
    if (checkEmptyAndExistingUser(sign_username,sign_password,confirm_sign_password) === true) {
        user[`${sign_username}`] = password_crypt;
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
    console.log('current : '+currentPassword)
    for (let i = 0; i < users.length; i++) {
        if ((users[i])[currentUser]) {
            userPassword = (users[i])[currentUser];
            console.log('user : '+userPassword)
            cryptData(currentPassword);
            console.log('cryp : '+password_crypt)
            if (password_crypt === userPassword) {
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
        // moveHome();
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
            alert('write to this email: hamedcuenca5@gmail.com \nto receive your password asap');
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

// Crypt data befor bind
function cryptData(sign_password) {
    const alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    const camel_alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    const number_alpha = ['0','1','2','3','4','5','6','7','8','9'];
    password_crypt = [];
    for (let i = 0; i < sign_password.length; i++) {
        for (let j = 0; j < sign_password.length-1; j++) {
            if ((sign_password[i] == alpha[j] || sign_password[i] == camel_alpha[j] || sign_password[i] == number_alpha[j]) && sign_password[i] != 'z' && sign_password[i] != 'Z' && sign_password[i] != '9') {
                password_crypt.push(alpha[j+1]+camel_alpha[j+1]+(number_alpha[j+1]+'%'+'@!$#$@#'));
            } else if ((sign_password[i] == alpha[j] || sign_password[i] == camel_alpha[j] || sign_password[i] == number_alpha[j]) && sign_password[i] == 'z' && sign_password[i] == 'Z' && sign_password[i] == '9') {
                password_crypt.push('A'+'a'+'007');
            }
        }        
    }
    password_crypt = password_crypt.join('');
}