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
    // Daten aus dem Formular abrufen
    const title = document.getElementById('post-title').value.trim();
    const content = document.getElementById('post-content').value.trim();
    const platform = document.getElementById('platform').value.trim();
    const genre = document.getElementById('genre').value.trim();
    const releaseDate = new Date().toISOString(); // Aktuelles Datum als Release-Datum

    // Überprüfen, ob die erforderlichen Felder ausgefüllt sind
    if (!title || !content || !platform || !genre) {
        alert("Bitte fülle alle erforderlichen Felder aus.");
        return;
    }

    // Neues Post-Objekt erstellen
    const newPost = {
        title: title,
        content: content,
        platform: platform,
        genre: genre,
        releaseDate: releaseDate
    };

    try {
        const result = await createPost(newPost);
        console.log(result); // Ergebnis im Konsolenlog anzeigen
        alert("Beitrag erfolgreich erstellt!"); // Erfolgsmeldung anzeigen
    } catch (error) {
        console.error('Fehler beim Erstellen des Beitrags:', error);
        alert("Fehler beim Erstellen des Beitrags. Bitte versuche es erneut.");
    }
}

// Event Listener für das Formular hinzufügen
document.querySelector('.post-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Verhindert das Standard-Formular-Submit-Verhalten
    handleCreatePost(); // Funktion zum Erstellen eines neuen Beitrags aufrufen
});


// Funktion zum Hochladen eines Profilbilds
async function handleProfilePictureUpload(file) {
    const result = await uploadProfilePicture(file);
    console.log(result);
}

// Google Login Callback
function onLoad() {
    gapi.load('auth2', function() {
        gapi.auth2.init({
            client_id: '495089736315-cctdkib2v9sav9t0k7qv1mvestilf443.apps.googleusercontent.com',
        });
    });
}

// Funktion zum Einloggen mit Google
function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    const id_token = googleUser.getAuthResponse().id_token;

    // Sende das Token an dein Backend zur Überprüfung und Authentifizierung
    fetch('https://videogamecalendarmbackend.apps.01.cf.eu01.stackit.cloud/api/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_token })
    })
    .then(response => {
        if (response.ok) {
            // Erfolgreich eingeloggt, eventuell die Weiterleitung hier
            window.location.href = 'homepage.html'; // Weiterleitung zur Homepage
        } else {
            alert('Fehler beim Einloggen.');
        }
    })
    .catch(error => {
        console.error('Fehler beim Fetch:', error);
    });
}

// Ereignis-Listener für Google Login Button
document.addEventListener('DOMContentLoaded', (event) => {
    const googleLoginButton = document.getElementById('google-login');

    googleLoginButton.addEventListener('click', function() {
        gapi.auth2.getAuthInstance().signIn().then(onSignIn).catch(error => {
            console.error('Error during sign in:', error);
        });
    });
});

// Aufrufen von onLoad, um die Google API zu laden
onLoad();

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


