// api.js

// Überprüfen des Authentifizierungsstatus
export async function checkAuthStatus() {
    const response = await fetch('/api/auth/status');
    const data = await response.json();
    return data;
}

// Beiträge abrufen
export async function fetchPosts() {
    const response = await fetch('/api/posts');
    const posts = await response.json();
    return posts;
}

// Neuen Beitrag erstellen
export async function createPost(postData) {
    const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    });
    const result = await response.json();
    return result;
}

// Profilbild hochladen
export async function uploadProfilePicture(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/users/upload-profile-picture', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();
    return result;
}

document.getElementById('set-username').addEventListener('click', function () {
    const username = document.getElementById('username').value;

    fetch('/api/users/set-username', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '/home'; // Leite zur Homepage weiter
        } else {
            alert('Fehler beim Festlegen des Benutzernamens');
        }
    });
});
