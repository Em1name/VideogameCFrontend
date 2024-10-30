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

// Google Login Callback
function onLoad() {
    if (typeof gapi !== 'undefined') {
        gapi.load('auth2', function() {
            console.log(typeof callback);
            gapi.auth2.init({
                client_id: '495089736315-cctdkib2v9sav9t0k7qv1mvestilf443.apps.googleusercontent.com',
            }).then(() => {
                const googleLoginButton = document.querySelector('.g_id_signin');
                if (googleLoginButton) {
                    googleLoginButton.addEventListener('click', function() {
                        const authInstance = gapi.auth2.getAuthInstance();
                        authInstance.signIn().then(onSignIn).catch(error => {
                            console.error('Error during sign in:', error);
                        });
                    });
                } else {
                    console.error('Google Login Button nicht gefunden.');
                }
            });
        });
    } else {
        console.error('Google API nicht verfügbar');
    }
}

// Funktion zum Einloggen mit Google
function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    fetch('https://videogamecalendarmbackend.apps.01.cf.eu01.stackit.cloud/api/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_token })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            alert('Fehler beim Einloggen.');
            throw new Error('Login failed');
        }
    })
    .then(data => {
        if (data.redirect) {
            window.location.href = "https://em1name.github.io/VideogameCFrontend/api/auth/google/callback";
        } else {
            console.error('Redirect-URL nicht gefunden in der Antwort.');
        }
    })
    .catch(error => {
        console.error('Fehler beim Fetch:', error);
    });
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
    const postForm = document.getElementById('postForm');
    if (postForm) {
        postForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Verhindert das Standardverhalten
            handleCreatePost();
        });
    } else {
        console.error('Element mit ID "postForm" nicht gefunden.');
    }

    const googleLoginButton = document.querySelector('.g_id_signin');
    if (googleLoginButton) {
        googleLoginButton.addEventListener('click', function() {
            gapi.auth2.getAuthInstance().signIn().then(onSignIn).catch(error => {
                console.error('Error during sign in:', error);
            });
        });
    } else {
        console.error('Google Login Button nicht gefunden.');
    }

    const setUsernameButton = document.getElementById('set-username');
    if (setUsernameButton) {
        setUsernameButton.addEventListener('click', handleSetUsername);
    } else {
        console.error("Element mit der ID 'set-username' nicht gefunden.");
    }
});

