// display username asap
const username_display = document.querySelector('.username-display');
const username = window.location.href.split('=')[1];
if (!username) {
    window.location.href = 'index.html';
} else {
    username_display.textContent += username;
}