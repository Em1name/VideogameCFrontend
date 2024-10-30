// main.js oder eine andere JS-Datei

import { checkAuthStatus, fetchPosts, createPost, uploadProfilePicture } from './api.js';

// Überprüfen des Authentifizierungsstatus beim Laden der Seite
window.onload = async () => {
    const authStatus = await checkAuthStatus();
    if (authStatus.isAuthenticated) {
        console.log(`Willkommen, ${authStatus.email}!`);
    } else {
        console.log("Bitte melde dich an.");
    }

    const posts = await fetchPosts();
    console.log(posts);
};

// Funktion zum Erstellen eines neuen Beitrags
async function handleCreatePost() {
    const newPost = {
        title: "Neuer Beitrag",
        content: "Dies ist der Inhalt des neuen Beitrags.",
        releaseDate: new Date().toISOString()
    };
    const result = await createPost(newPost);
    console.log(result);
}

// Funktion zum Hochladen eines Profilbilds
async function handleProfilePictureUpload(file) {
    const result = await uploadProfilePicture(file);
    console.log(result);
}
document.getElementById('google-login').addEventListener('click', function () {
    // Hier solltest du den Google Login-Flow initiieren
    const redirectUri = "http://your-backend-url/api/auth/google"; // Setze hier die URL deines Backends

    window.location.href = redirectUri; // Weiterleitung zum Backend
});

document.getElementById('set-username').addEventListener('click', function() {
    const usernameInput = document.getElementById('username').value.trim(); // Eingabe des Benutzers abrufen

    if (usernameInput === "") {
        alert("Bitte gib einen Benutzernamen ein."); // Warnung, wenn das Eingabefeld leer ist
        return;
    }

    // Anfrage an den Server senden
    fetch('/api/auth/set-username', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: usernameInput }), // Benutzernamen als JSON übergeben
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok');
        }
        return response.json();
    })
    .then(data => {
        // Hier kannst du festlegen, was passiert, wenn der Benutzername erfolgreich festgelegt wurde
        alert(data.message); // Nachricht vom Server anzeigen
        window.location.href = '/home'; // Beispielhafte Weiterleitung zur Homepage
    })
    .catch((error) => {
        console.error('Es gab ein Problem mit der Fetch-Operation:', error);
        alert("Fehler beim Festlegen des Benutzernamens. Bitte versuche es erneut.");
    });
});


