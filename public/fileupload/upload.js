import { uploadFile, displayArtwork } from './file.service.js';

document.addEventListener('DOMContentLoaded', () => {
  const uploadButton = document.getElementById('upload-button');
  const fileInput = document.getElementById('file-input');
  const gallery = document.getElementById('gallery'); 

  if (uploadButton) {
    uploadButton.addEventListener('click', (e) => {
      e.preventDefault();
      const file = fileInput?.files[0];

      if (!file) {
        console.error('No file selected');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      uploadFile(formData)
        .then((response) => {
          console.log('File uploaded successfully:', response);

          // Append the artwork directly to the gallery
          displayArtwork(response.url, gallery);  

          // Apply gallery layout after artwork is added
          applyGalleryLayout();
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    });
  } else {
    console.error('Upload button not found');
  }
});

// Function to apply grid layout to the gallery
function applyGalleryLayout() {
  const gallery = document.getElementById('gallery'); 
  if (gallery) {
    gallery.classList.add('gallery'); // Ensure the gallery class is applied for grid layout
  }
}
