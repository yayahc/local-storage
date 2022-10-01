const username_display = document.querySelector('.username-display');

// display username
const username = window.location.href.split('=')[1];
username_display.textContent += username;