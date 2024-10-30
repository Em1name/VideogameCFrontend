import { checkAuthStatus, fetchPosts, createPost, uploadProfilePicture, setUsername } from './api.js';

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

// Event Listener für das Formular hinzufügen
document.querySelector('.post-form').addEventListener('submit', function (event) {
    event.preventDefault();
    handleCreatePost();
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
            window.location.href = data.redirect; // Weiterleitung zur angegebenen URL
        }
    })
    .catch(error => {
        console.error('Fehler beim Fetch:', error);
    });
}

// Ereignis-Listener für Google Login Button
document.addEventListener('DOMContentLoaded', (event) => {
    const googleLoginButton = document.getElementById('.g_id_signin');
    googleLoginButton.addEventListener('click', function() {
        gapi.auth2.getAuthInstance().signIn().then(onSignIn).catch(error => {
            console.error('Error during sign in:', error);
        });
    });
});


// Event Listener für das Setzen des Benutzernamens
document.getElementById('set-username').addEventListener('click', async function () {
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

// Aufrufen von onLoad, um die Google API zu laden
init();
onLoad();
