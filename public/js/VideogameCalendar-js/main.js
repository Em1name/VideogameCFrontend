import { setUsername, createPost, fetchPosts, checkAuthStatus, uploadProfilePicture } from './api.js';

// Funktion zum Erstellen eines neuen Beitrags
async function handleCreatePost() {
    const title = document.getElementById('post-title').value.trim();
    const content = document.getElementById('post-content').value.trim();
    const platform = document.getElementById('platform').value.trim();
    const genre = document.getElementById('genre').value.trim();
    const releaseDate = new Date().toISOString();

    if (!title || !content || !platform || !genre) {
        alert("Bitte fülle alle erforderlichen Felder aus.");
        return;
    }

    const newPost = { title, content, platform, genre, releaseDate };

    try {
        const result = await createPost(newPost);
        console.log(result);
        alert("Beitrag erfolgreich erstellt!");
    } catch (error) {
        console.error('Fehler beim Erstellen des Beitrags:', error);
        alert("Fehler beim Erstellen des Beitrags. Bitte versuche es erneut.");
    }
}

function handleCredentialResponse(response) {
    const id_token = response.credential; // Den ID-Token aus der Antwort erhalten
    console.log("ID Token:", id_token);

    // Token an den Server senden
    sendTokenToServer(id_token);
}

// Funktion, um den Token an den Server zu senden
async function sendTokenToServer(id_token) {
    try {
        const response = await fetch('https://videogamecalendarmbackend.apps.01.cf.eu01.stackit.cloud/api/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_token }) // ID-Token im JSON-Format senden
        });

        if (!response.ok) {
            throw new Error('Fehler beim Senden des Tokens: ' + response.statusText);
        }

        const data = await response.json();
        console.log('Serverantwort:', data);

        // Optional: Hier kannst du die nächste Aktion durchführen, z.B. Weiterleitung
        if (data.redirect) {
            window.location.href = data.redirect;
        }
    } catch (error) {
        console.error('Fehler beim Senden des Tokens:', error);
    }
}





// Funktion zum Einloggen mit Google
function handleGoogleSignIn() {
    const authInstance = gapi.auth2.getAuthInstance();
    authInstance.signIn().then(onSignIn).catch(error => {
        console.error('Fehler beim Einloggen:', error);
    });
}

// Funktion, die nach erfolgreichem Login aufgerufen wird
async function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token:", id_token);

    // Token an den Server senden
    await sendTokenToServer(id_token);
}

// Funktion, um den Token an den Server zu senden
async function sendTokenToServer(id_token) {
    try {
        const response = await fetch('https://videogamecalendarmbackend.apps.01.cf.eu01.stackit.cloud/api/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_token }) // ID Token im JSON-Format senden
        });

        if (!response.ok) {
            throw new Error('Fehler beim Senden des Tokens: ' + response.statusText);
        }

        const data = await response.json();
        console.log('Serverantwort:', data);

        // Optional: Hier kannst du die nächste Aktion durchführen, z.B. Weiterleitung
        if (data.redirect) {
            window.location.href = data.redirect;
        }
    } catch (error) {
        console.error('Fehler beim Senden des Tokens:', error);
    }
}

// Haupt-Event-Listener für DOMContentLoaded
document.addEventListener('DOMContentLoaded', onLoad);

// Funktion zum Festlegen des Benutzernamens
async function handleSetUsername() {
    const usernameInput = document.getElementById('username').value.trim();

    if (usernameInput === "") {
        alert("Bitte gib einen Benutzernamen ein.");
        return;
    }

    try {
        await setUsername(usernameInput);
        window.location.href = '/homepage.html'; // Weiterleitung zur Homepage
    } catch (error) {
        console.error('Fehler beim Festlegen des Benutzernamens:', error);
        alert("Fehler beim Festlegen des Benutzernamens. Bitte versuche es erneut.");
    }
}

// Haupt-Event-Listener für DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    if (postForm) {
        postForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Verhindert das Standardverhalten
            handleCreatePost();
        });
    } else {
        console.error('Element mit ID "postForm" nicht gefunden.');
    }

    const setUsernameButton = document.getElementById('set-username');
    if (setUsernameButton) {
        setUsernameButton.addEventListener('click', handleSetUsername);
    } else {
        console.error("Element mit der ID 'set-username' nicht gefunden.");
    }
});
