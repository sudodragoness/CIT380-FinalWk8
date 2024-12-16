// Get artwork from database and display it
const getArtwork = async () => {
  const response = await fetch('/api/artwork');
  const data = await response.json();
  const artwork = data.artwork;
  // Display artwork here
  const artGallery = document.getElementById('art-gallery');
  artGallery.innerHTML = '';
  artwork.forEach((art) => {
    const img = document.createElement('img');
    img.src = art.url;
    artGallery.appendChild(img);
  });
};

// Call getArtwork function when page loads
document.addEventListener('DOMContentLoaded', getArtwork);