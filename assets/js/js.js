
document.addEventListener('DOMContentLoaded', function () {
  const toggleSignInButton = document.getElementById('toggleSignIn');
  const signinPanel = document.getElementById('signinPanel');
  const closePanelButton = document.getElementById('closePanel');
  const switchToCreateAccount = document.getElementById('switchToCreateAccount');
  const switchToSignIn = document.getElementById('switchToSignIn');
  const signinForm = document.getElementById('signinForm');
  const createAccountForm = document.getElementById('createAccountForm');
  const signIn = document.getElementById('signIn');
  const createAccount = document.getElementById('createAccount');
  const errorMessage = document.getElementById('errorMessage');
  const createAccountErrorMessage = document.getElementById('createAccountErrorMessage');
  const phonePattern = /^[0-9]{10}$/;
  const userNameElement = document.getElementById('userName');
  const signoutPanel = document.getElementById('signoutPanel');
  const closeSignOutPanelButton = document.getElementById('closeSignOutPanel');
  const signOutButton = document.getElementById('signOutButton');
  const userDetailsName = document.getElementById('userDetailsName');
  const userDetailsEmail = document.getElementById('userDetailsEmail');
  const userDetailsPhone = document.getElementById('userDetailsPhone');

  // Helper Functions
  function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
  }

  function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  function displayUserInfo() {
    const users = getUsers();
    const loggedInUser = users.find(user => user.isLoggedIn);

    if (loggedInUser) {
      userNameElement.innerHTML = loggedInUser.name;
      userNameElement.style.display = 'inline';
      document.getElementById('userDropdown').style.display = 'block';
      toggleSignInButton.style.display = 'none';

      // Update the sign-out panel with user details
      userDetailsName.textContent = 'Name: ' + loggedInUser.name;
      userDetailsEmail.textContent = 'Email: ' + loggedInUser.email;
      userDetailsPhone.textContent = 'Phone: ' + loggedInUser.phone;
      document.querySelector('.user-details').style.display = 'block';
    }
  }

  function closePanel(panel) {
    panel.style.display = 'none';
  }

  function openPanel(panel) {
    panel.style.display = 'block';
  }

  // Sign-In/Sign-Out Panel functionality
  toggleSignInButton.addEventListener('click', () => {
    openPanel(signinPanel);
    signinForm.style.display = 'block';
    createAccountForm.style.display = 'none';
  });

  closePanelButton.addEventListener('click', () => closePanel(signinPanel));

  switchToCreateAccount.addEventListener('click', (e) => {
    e.preventDefault();
    signinForm.style.display = 'none';
    createAccountForm.style.display = 'block';
  });

  switchToSignIn.addEventListener('click', (e) => {
    e.preventDefault();
    signinForm.style.display = 'block';
    createAccountForm.style.display = 'none';
  });

  // Create Account functionality
  createAccount.addEventListener('submit', function (e) {
    e.preventDefault();
    const nameInput = document.getElementById('createAccountName').value;
    const phoneInput = document.getElementById('createPhoneNumber').value;
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;
    const phoneValid = phonePattern.test(phoneInput);

    if (phoneValid) {
      createAccountErrorMessage.textContent = '';
      const users = getUsers();
      const existingUser = users.find(user => user.phone === phoneInput || user.email === emailInput);

      if (existingUser) {
        createAccountErrorMessage.textContent = 'An account with this phone number or email already exists.';
      } else {
        const newUser = {
          name: nameInput,
          phone: phoneInput,
          email: emailInput,
          password: passwordInput,
          isLoggedIn: true
        };
        users.forEach(user => user.isLoggedIn = false); // Log out all users
        users.push(newUser);
        saveUsers(users);

        userNameElement.textContent = nameInput;
        userNameElement.style.display = 'inline';
        toggleSignInButton.style.display = 'none';
        closePanel(signinPanel);
        createAccount.reset(); // Reset form fields

        alert('Account Created Successfully!');
        displayUserInfo();  // Update user details after account creation
      }
    } else {
      createAccountErrorMessage.textContent = 'Please enter a valid 10-digit phone number.';
    }
  });

  // Sign In functionality
  signIn.addEventListener('submit', function (e) {
    e.preventDefault();
    const phoneInput = document.getElementById('signInPhone').value;
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;
    const phoneValid = phonePattern.test(phoneInput);

    if (phoneValid) {
      const users = getUsers();
      const user = users.find(user => (user.phone === phoneInput || user.email === emailInput) && user.password === passwordInput);

      if (user) {
        errorMessage.textContent = '';
        users.forEach(u => u.isLoggedIn = false); // Log out all users
        user.isLoggedIn = true;
        saveUsers(users);
        userNameElement.textContent = user.name;
        userNameElement.style.display = 'inline';
        toggleSignInButton.style.display = 'none';
        
        closePanel(signinPanel);
        displayUserInfo();  // Update user details after sign-in
      } else {
        errorMessage.textContent = 'Incorrect phone number/email or password.';
      }
    } else {
      errorMessage.textContent = 'Please enter a valid 10-digit phone number.';
    }
  });

  // Show Sign-Out Button on Username Click
  userNameElement.addEventListener('click', () => {
    // Toggle visibility of the signout button/panel when clicking on the username
    if (signoutPanel.style.display === 'none' || signoutPanel.style.display === '') {
      signoutPanel.style.display = 'block';
    } else {
      signoutPanel.style.display = 'none';
    }
  });

  // Sign Out functionality
  signOutButton.addEventListener('click', () => {
    const users = getUsers();
    users.forEach(user => user.isLoggedIn = false); // Log out all users
    saveUsers(users);

    // Hide username and show sign-in button
    userNameElement.style.display = 'none';
    document.getElementById('userDropdown').style.display = 'none';
    toggleSignInButton.style.display = 'inline';

    // Hide the signout panel after signing out
    signoutPanel.style.display = 'none';
    document.querySelector('.user-details').style.display = 'none'; // Hide user details

    alert('Signed out successfully.');
  });

  closeSignOutPanelButton.addEventListener('click', () => {
    signoutPanel.style.display = 'none';
  });

  // Close signout panel when clicking outside of it
  document.addEventListener('click', (event) => {
    if (!signoutPanel.contains(event.target) && !userNameElement.contains(event.target)) {
      signoutPanel.style.display = 'none';
    }
  });

  // Initial display of user info if logged in
  displayUserInfo();
});