function onLoad() {
    // Prüfe, ob die Google API geladen ist
    if (typeof gapi !== 'undefined') {
        // Lade den Auth2-Client der Google API
        gapi.load('auth2', function() {
            // Initialisiere die Auth2-API mit client_id und einem leeren Callback
            gapi.auth2.init({
                client_id: '495089736315-cctdkib2v9sav9t0k7qv1mvestilf443.apps.googleusercontent.com',
                callback: function() { // Leerer Callback
                    console.log("Callback aufgerufen");
                }
            }).then(() => {
                // Füge ein Event zum Google-Login-Button hinzu
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

// Beispiel-Callback-Funktion für den Google-Login-Vorgang
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
