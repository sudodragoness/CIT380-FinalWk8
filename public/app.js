import { displayArtwork } from './fileupload/file.service.js';

// Login logic
const doLogin = function (e) {
  e.preventDefault();  // Prevent default form submission
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  console.log('Login attempt:', { username, password });  // Debugging log to verify input

  // Perform login logic
  login({
    username: username,
    password: password
  }).then(function (res) {
    console.log('Login response:', res);  // Log the response for debugging

    // Check if response is valid (status ok)
    if (!res.ok) {
      console.error('Error: Response not OK');
      return;
    }

    // Parse the JSON response body
    res.json().then(responseBody => {
      console.log('Parsed Login response:', responseBody);  // Log parsed JSON response

      // Check if token is in the response body
      if (responseBody.token) {
        // Store tokens in localStorage
        localStorage.setItem('auth-token', responseBody.token);  // Store access token only

        // Log and redirect to the gallery page
        console.log('Redirecting to art gallery page');  // Log the redirect
        window.location.href = 'artgallery.html'; 
      } else {
        console.log('No token received');  // Log if no token is received
      }
    }).catch(error => {
      console.error('Error parsing login response:', error);  // Log parsing error
    });
  }).catch(function (err) {
    console.error('Error logging in:', err);  // Log error if any
  });
};

// Register logic
const doRegister = function (e) {
  e.preventDefault();  // Prevent default form submission
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const data = {
    username: username,
    email: email,
    password: password,
  };

  // Send POST request to the backend to register the user
  fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    return response.json();
  })
  .then(data => {
    console.log('Registration successful:', data);
    // Optionally redirect to the login page after successful registration
    window.location.href = 'login.html';  // Redirect to login page after successful registration
  })
  .catch(error => {
    console.error('Error:', error);
  });
};

// Only run the following code if we're on the login page (check for the login element)
if (document.getElementById('login-form')) {
  // Add event listener to prevent form submission default action
  document.getElementById('login-button').addEventListener('click', function (e) {
    console.log('Login button clicked');  // Test if the button click triggers correctly
    e.preventDefault();  // Prevent default form submission
    doLogin(e);  // Call the doLogin function
  });
}
// Only run the following code if we're on the register page (check for the register element)
if (document.getElementById('register-form')) {
  // Add event listener to prevent form submission default action
  document.getElementById('register-button').addEventListener('click', function (e) {
    console.log('Register button clicked');  // Test if the button click triggers correctly
    e.preventDefault();  // Prevent default form submission
    doRegister(e);  // Call the doRegister function
  });
}

// Check if the user is authenticated, show the gallery accordingly
const token = localStorage.getItem('auth-token'); // Retrieve token from localStorage

// Only run the following code if we're on the art gallery page (check for gallery element)
if (document.getElementById('gallery') && !document.getElementById('app-gallery-loaded')) {
  const marker = document.createElement('div');
  marker.id = 'app-gallery-loaded';
  document.body.appendChild(marker);

  fetch('http://localhost:3000/api/files', {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  })
    .then(response => {
      if (response.status === 401) {
        console.log('Unauthorized: Token is invalid or missing');
        return;
      }

      if (!response.ok) {
        console.error('Failed to fetch files. Status:', response.status);
        return;
      }

      return response.json();
    })
    .then(files => {
      if (!files || files.length === 0) {
        console.log('No files to display');
        return;
      }

      const gallery = document.getElementById('gallery');
      if (gallery) {
        gallery.innerHTML = ''; // Clear gallery before appending
        files.forEach(file => {
          displayArtwork(file, gallery);
        });
      }
    })
    .catch(err => {
      console.error('Error fetching files:', err);
    });
}
