import { setUsername } from './api.js'; // Stelle sicher, dass der Pfad zu api.js korrekt ist

// Haupt-Event-Listener für DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const setUsernameButton = document.getElementById('set-username');

    if (setUsernameButton) {
        setUsernameButton.addEventListener('click', handleSetUsername);
    } else {
        console.error("Element mit der ID 'set-username' nicht gefunden.");
    }
});

// Funktion zum Festlegen des Benutzernamens
async function handleSetUsername() {
    const usernameInput = document.getElementById('username').value.trim();

    if (usernameInput === "") {
        alert("Bitte gib einen Benutzernamen ein.");
        return;
    }

    try {
        await setUsername(usernameInput); // Aufruf der Funktion aus api.js
        alert("Benutzername erfolgreich festgelegt!");
        window.location.href = '/homepage.html'; // Weiterleitung zur Homepage
    } catch (error) {
        console.error('Fehler beim Festlegen des Benutzernamens:', error);
        alert("Fehler beim Festlegen des Benutzernamens. Bitte versuche es erneut.");
    }
}
