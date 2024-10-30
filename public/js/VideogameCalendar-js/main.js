import {setUsername, createPost, fetchPosts, checkAuthStatus, uploadProfilePicture} from './api.js';

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
});



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
    const id_token = googleUser.getAuthResponse().id_token;
    console.log("du wichser");
    fetch('https://videogamecalendarmbackend.apps.01.cf.eu01.stackit.cloud/api/auth/google/callback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_token })
    })
    .then(response => {
        console.log("bin back");
        if (response.ok) {
            return response.json();
        } else {
            alert('Fehler beim Einloggen.');
            throw new Error('Login failed');
        }
    })
    .then(data => {
        if (data.redirect) {
            window.location.href = data.redirect; // Weiterleitung zur angegebenen URL
        }
    })
    .catch(error => {
        console.error('Fehler beim Fetch:', error);
    });
}

// Ereignis-Listener für Google Login Button
document.addEventListener('DOMContentLoaded', () => {
    const googleLoginButton = document.querySelector('.g_id_signin');

    // Überprüfen, ob das Element existiert
    if (googleLoginButton) {
        googleLoginButton.addEventListener('click', function() {
            gapi.auth2.getAuthInstance().signIn().then(onSignIn).catch(error => {
                console.error('Error during sign in:', error);
            });
        });
    } else {
        console.error('Google Login Button nicht gefunden.');
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const setUsernameButton = document.getElementById('set-username');

    // Überprüfen, ob der Button vorhanden ist, bevor du den Event-Listener hinzufügst
    if (setUsernameButton) {
        setUsernameButton.addEventListener('click', async function () {
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
        });
    } else {
        console.error("Element mit der ID 'set-username' nicht gefunden.");
    }
});


// Aufrufen von onLoad, um die Google API zu laden
onLoad();

console.log(gapi);