const BASE_API_URL = 'http://localhost:3000/api';
const FILES_API = `${BASE_API_URL}/files`;

const getToken = () => localStorage.getItem('auth-token'); // Refactor to get token centrally

const _post = (url, data) => {
  const token = getToken();
  return fetch(url, {
    method: 'POST',
    body: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .catch((error) => {
      console.error('POST Error:', error);
      throw error;
    });
};

const _get = (url) => {
  const token = getToken();
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .catch((error) => {
      console.error('GET Error:', error);
      throw error;
    });
};

const _delete = (url) => {
  const token = getToken();
  return fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .catch((error) => {
      console.error('DELETE Error:', error);
      throw error;
    });
};

export function displayArtwork(file, gallery) {
  const existingImage = gallery.querySelector(`img[src="http://localhost:3000${file}"]`);
  if (existingImage) return; // Avoid duplicating artwork

  const artPiece = document.createElement('div');
  artPiece.classList.add('art-piece');

  const img = document.createElement('img');
  img.src = `http://localhost:3000${file}`;
  img.alt = file;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-button');

  const token = getToken();
  if (token) {
    deleteButton.style.display = 'inline';
    deleteButton.addEventListener('click', () => {
      fetch(`http://localhost:3000/api/files/${file.split('/').pop()}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.message);
          artPiece.remove();
        })
        .catch(err => console.error('Error deleting file:', err));
    });
  } else {
    deleteButton.style.display = 'none';
  }

  artPiece.appendChild(img);
  artPiece.appendChild(deleteButton);
  gallery.appendChild(artPiece);
}

const uploadFile = (formData) => _post(`${FILES_API}/upload`, formData);
const getFile = (fileId) => _get(`${FILES_API}/${fileId}`);
const deleteFile = (fileId) => _delete(`${FILES_API}/${fileId}`);

export { uploadFile, getFile, deleteFile };
