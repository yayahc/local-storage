// display username
const username_display = document.querySelector('.username-display');
const username = window.location.href.split('=')[1];
username_display.textContent += username;