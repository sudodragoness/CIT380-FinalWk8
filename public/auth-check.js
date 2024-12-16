import { displayArtwork } from './fileupload/file.service.js';  

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('auth-token');  // Retrieve token from localStorage
    const gallery = document.querySelector('#gallery');
    const uploadSection = document.querySelector('#file-input');
    const uploadButton = document.querySelector('#upload-button');
    const loginLink = document.querySelector('#login-link');
    const logoutLink = document.querySelector('#logout-link');
  
    // Prevent duplicate execution by setting a marker
    if (document.getElementById('auth-check-loaded')) return;
    const marker = document.createElement('div');
    marker.id = 'auth-check-loaded';
    document.body.appendChild(marker);
  
    // Function to apply grid layout to gallery on page load
    function applyGalleryLayout() {
      const gallery = document.getElementById('gallery');
      if (gallery) {
        gallery.classList.add('gallery'); // Apply 'gallery' class for grid layout
      }
    }
  
    // Function to fetch and display files
    const loadFiles = (url, token) => {
      fetch(url, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => response.json())
        .then(files => {
          if (files.length === 0) {
            gallery.textContent = 'No artwork to display.';
          } else {
            files.forEach(file => displayArtwork(file, gallery));  // Display artwork
          }
          applyGalleryLayout();  // Apply grid layout after files are loaded
        })
        .catch(err => {
          console.error('Error fetching files:', err);
          gallery.textContent = 'Error loading gallery.';
        });
    };
  
    if (!token) {
      uploadSection.style.display = 'none';
      uploadButton.style.display = 'none';
      logoutLink.style.display = 'none';
      loginLink.style.display = 'block';
      loadFiles('http://localhost:3000/api/files', token); // Public gallery
    } else {
      logoutLink.style.display = 'block';
      loginLink.style.display = 'none';
      uploadSection.style.display = 'block';
      uploadButton.style.display = 'block';
      loadFiles('http://localhost:3000/api/files', token); // Authenticated gallery
    }
  
    logoutLink.addEventListener('click', () => {
      localStorage.removeItem('auth-token');
      window.location.href = 'login.html';
    });
  });