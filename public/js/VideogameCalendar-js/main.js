import {  checkAuthStatus, uploadProfilePicture } from './api.js';

// Funktion zum Senden des Tokens an den Server
async function sendTokenToServer(id_token) {
    try {
        const response = await fetch('https://videogamecalendarmbackend.apps.01.cf.eu01.stackit.cloud/api/auth/google/callback', { // Pass auf den Endpunkt auf
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
            window.location.href = data.redirect; // Redirect to the received URL
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

