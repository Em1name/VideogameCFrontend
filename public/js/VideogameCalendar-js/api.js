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

    if (!response.ok) {
        throw new Error('Fehler beim Erstellen des Beitrags: ' + response.statusText);
    }

    return await response.json();
}

// Profilbild hochladen
export async function uploadProfilePicture(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/users/upload-profile-picture', {
        method: 'POST',
        body: formData
    });

    return await response.json();
}

// Benutzernamen erstellen
export async function setUsername(username) {
    const response = await fetch('/api/users/set-username', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
    });

    if (!response.ok) {
        throw new Error('Fehler beim Festlegen des Benutzernamens');
    }

    return await response.json();
}
