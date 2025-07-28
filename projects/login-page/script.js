function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon'); // target the image directly

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.src = 'hide.png'; // change icon to hide
    } else {
        passwordInput.type = 'password';
        toggleIcon.src = 'eye.png'; // change icon to show
    }
}


function socialLogin(provider) {
    // Simulate social login
    alert(`Social login with ${provider} would be implemented here`);
}

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const container = document.getElementById('loginContainer');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Basic validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }

    // Add loading state
    container.classList.add('loading');

    // Simulate login process
    setTimeout(() => {
        container.classList.remove('loading');
        alert(`Login successful!\nEmail: ${email}`);
    }, 2000);
});

// Add floating animation to the container
document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.login-container');

    setInterval(() => {
        container.style.transform = `translateY(${Math.sin(Date.now() * 0.001) * 3}px)`;
    }, 16);
});

// Add input focus effects
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', function () {
        this.parentElement.style.transform = 'scale(1)';
    });
});
