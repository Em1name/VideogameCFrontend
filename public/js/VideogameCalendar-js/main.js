import {  checkAuthStatus, uploadProfilePicture } from './api.js';





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

