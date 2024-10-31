import { createPost, setUsername, sendTokenToServer } from './api.js';

// Funktion zum Erstellen eines neuen Beitrags
async function handleCreatePost(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars

    const title = document.getElementById('post-title').value.trim();
    const content = document.getElementById('post-content').value.trim();
    const platform = document.getElementById('platform').value.trim();
    const genre = document.getElementById('genre').value.trim();
    const location = document.getElementById('location').value.trim();
    const startDateTime = document.getElementById('startDateTime').value.trim();
    const endDateTime = document.getElementById('endDateTime').value.trim();
    const fileUpload = document.getElementById('file-upload').files[0];

    // Überprüfen, ob alle erforderlichen Felder ausgefüllt sind
    if (!title || !content || !platform || !genre || !location || !startDateTime || !endDateTime) {
        alert("Bitte fülle alle erforderlichen Felder aus.");
        return;
    }

    const newPost = {
        title,
        content,
        platform,
        genre,
        location,
        startDateTime,
        endDateTime,
        file: fileUpload // Du kannst die Datei hier verarbeiten, wenn du möchtest
    };

    try {
        const result = await createPost(newPost); // Die Funktion zum Erstellen des Beitrags anrufen
        console.log(result);
        alert("Beitrag erfolgreich erstellt!");
    } catch (error) {
        console.error('Fehler beim Erstellen des Beitrags:', error);
        alert("Fehler beim Erstellen des Beitrags. Bitte versuche es erneut.");
    }
}

// Event-Listener für das Formular
document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    if (postForm) {
        postForm.addEventListener('submit', handleCreatePost);
    } else {
        console.error('Element mit ID "postForm" nicht gefunden.');
    }
});
