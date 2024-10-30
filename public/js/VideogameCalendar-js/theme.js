const themeSwitch = document.getElementById('theme-switch');

// Funktion zum Laden des gespeicherten Themes
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        if (themeSwitch) {
            themeSwitch.value = savedTheme;
        }
    }
}

// Funktion zum Wechseln des Themes
function switchTheme(selectedTheme) {
    // Entferne vorheriges Theme
    document.body.classList.remove('dark', 'light');

    // Füge das neue Theme hinzu
    document.body.classList.add(selectedTheme);

    // Speichere das Theme im localStorage
    localStorage.setItem('theme', selectedTheme);
}

// Lade das gespeicherte Theme beim Seitenaufruf
document.addEventListener('DOMContentLoaded', loadSavedTheme);

// Event-Listener für den Wechsel zwischen Hell- und Dunkelmodus
themeSwitch.addEventListener('change', function () {
    switchTheme(themeSwitch.value);
});
