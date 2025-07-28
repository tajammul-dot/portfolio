function togglePassword(fieldId) {
    const passwordInput = document.getElementById(fieldId);
    const toggleIcon = passwordInput.nextElementSibling;

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleIcon.textContent = '👁️';
    }
}

function checkPasswordStrength(password) {
    let strength = 0;
    let text = 'Weak';
    let className = 'strength-weak';

    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    switch (strength) {
        case 0:
        case 1:
            text = 'Weak';
            className = 'strength-weak';
            break;
        case 2:
            text = 'Fair';
            className = 'strength-fair';
            break;
        case 3:
        case 4:
            text = 'Good';
            className = 'strength-good';
            break;
        case 5:
            text = 'Strong';
            className = 'strength-strong';
            break;
    }

    return { strength, text, className };
}

function validateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age >= 13;
}

function socialSignup(provider) {
    alert(`Social signup with ${provider} would be implemented here`);
}

// Real-time validation
document.getElementById('password').addEventListener('input', function () {
    const password = this.value;
    const result = checkPasswordStrength(password);

    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');

    strengthFill.className = `strength-fill ${result.className}`;
    strengthText.textContent = `Password strength: ${result.text}`;

    checkPasswordMatch();
    checkFormValidity();
});

function checkPasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const matchDiv = document.getElementById('passwordMatch');

    if (confirmPassword.length > 0) {
        if (password === confirmPassword) {
            matchDiv.textContent = '✓ Passwords match';
            matchDiv.className = 'password-match match-success';
        } else {
            matchDiv.textContent = '✗ Passwords do not match';
            matchDiv.className = 'password-match match-error';
        }
    } else {
        matchDiv.textContent = '';
    }
}

document.getElementById('confirmPassword').addEventListener('input', checkPasswordMatch);

function checkFormValidity() {
    const form = document.getElementById('signupForm');
    const submitBtn = document.getElementById('submitBtn');
    const terms = document.getElementById('terms');
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const isValid = form.checkValidity() &&
        terms.checked &&
        password === confirmPassword &&
        password.length >= 8;

    submitBtn.disabled = !isValid;
}

// Add event listeners for form validation
document.querySelectorAll('input, select').forEach(element => {
    element.addEventListener('input', checkFormValidity);
    element.addEventListener('change', checkFormValidity);
});

document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const container = document.getElementById('signupContainer');
    const formData = new FormData(this);

    // Validate age
    const dob = formData.get('dob');
    if (!validateAge(dob)) {
        document.getElementById('dobError').textContent = 'You must be at least 13 years old to sign up';
        document.getElementById('dobError').classList.add('show');
        return;
    }

    // Clear any previous errors
    document.querySelectorAll('.error-message').forEach(error => {
        error.classList.remove('show');
    });

    // Add loading state
    container.classList.add('loading');

    // Simulate signup process
    setTimeout(() => {
        container.classList.remove('loading');
        alert(`Account created successfully!\nUsername: ${formData.get('username')}\nEmail: ${formData.get('email')}`);
    }, 2000);
});

// Add floating animation to the container
document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.signup-container');

    setInterval(() => {
        container.style.transform = `translateY(${Math.sin(Date.now() * 0.001) * 3}px)`;
    }, 16);
});

// Add input focus effects
document.querySelectorAll('input, select').forEach(element => {
    element.addEventListener('focus', function () {
        this.parentElement.style.transform = 'scale(1.02)';
    });

    element.addEventListener('blur', function () {
        this.parentElement.style.transform = 'scale(1)';
    });
});