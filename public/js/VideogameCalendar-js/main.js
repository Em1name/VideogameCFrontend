import { setUsername, createPost, fetchPosts, checkAuthStatus, uploadProfilePicture } from './api.js';

// Funktion zum Senden des Tokens an den Server
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

// Funktion, die nach erfolgreichem Login aufgerufen wird
async function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token:", id_token);

    // Token an den Server senden
    await sendTokenToServer(id_token);
}

// Google Login Callback
function onLoad() {
    if (!window.gapi) {
        console.error('Google API nicht verfügbar');
        return;
    }

    gapi.load('auth2', () => {
        gapi.auth2.init({
            client_id: '495089736315-cctdkib2v9sav9t0k7qv1mvestilf443.apps.googleusercontent.com'
        }).then(() => {
            const googleLoginButton = document.querySelector('.g_id_signin');
            if (googleLoginButton) {
                googleLoginButton.onclick = handleGoogleSignIn;
            } else {
                console.error('Google Login Button nicht gefunden.');
            }
        }).catch(error => {
            console.error('Fehler bei der Authentifizierung:', error);
        });
    });
}

// Funktion zum Einloggen mit Google
function handleGoogleSignIn() {
    const authInstance = gapi.auth2.getAuthInstance();
    authInstance.signIn().then(onSignIn).catch(error => {
        console.error('Fehler beim Einloggen:', error);
    });
}

// Funktion zum Erstellen eines neuen Beitrags
async function handleCreatePost() {
    const title = document.getElementById('post-title').value.trim();
    const content = document.getElementById('post-content').value.trim();
    const platform = document.getElementById('platform').value.trim();
    const genre = document.getElementById('genre').value.trim();
    const location = document.getElementById('location').value.trim();
    const startDateTime = document.getElementById('startDateTime').value.trim();
    const endDateTime = document.getElementById('endDateTime').value.trim();
    const releaseDate = new Date().toISOString();

    if (!title || !content || !platform || !genre || !location || !startDateTime || !endDateTime) {
        alert("Bitte fülle alle erforderlichen Felder aus.");
        return;
    }

    const newPost = { title, content, platform, genre, location, startDateTime, endDateTime, releaseDate };

    try {
        const result = await createPost(newPost);
        console.log(result);
        alert("Beitrag erfolgreich erstellt!");
    } catch (error) {
        console.error('Fehler beim Erstellen des Beitrags:', error);
        alert("Fehler beim Erstellen des Beitrags. Bitte versuche es erneut.");
    }
}

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
    onLoad();

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
