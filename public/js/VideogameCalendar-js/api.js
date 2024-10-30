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
            'Content-Type': 'application/json' // Setze den Content-Type auf JSON
        },
        body: JSON.stringify(postData) // Konvertiere postData in JSON
    });

    // Überprüfen, ob die Antwort erfolgreich war
    if (!response.ok) {
        throw new Error('Fehler beim Erstellen des Beitrags: ' + response.statusText);
    }

    // Die Antwort vom Server zurückgeben
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

    const result = await response.json();
    return result;
}

//Benutzernamen erstellen
document.getElementById('set-username').addEventListener('click', function () {
    const username = document.getElementById('username').value;

    if (!username) {
            alert('Bitte gib einen Benutzernamen ein.');
            return;
    }
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
         .catch(error => {
                console.error('Fehler:', error);
                alert('Ein unerwarteter Fehler ist aufgetreten.');
         });
    });
});
