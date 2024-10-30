const themeSwitch = document.getElementById('theme-switch');

// Lade die gespeicherte Einstellung bei Seitenaufruf
document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        themeSwitch.value = savedTheme;
    }
});

// Event-Listener für den Wechsel zwischen Hell- und Dunkelmodus
themeSwitch.addEventListener('change', function () {
    const selectedTheme = themeSwitch.value;
    
    // Entferne vorheriges Theme
    document.body.classList.remove('dark', 'light');
    
    // Füge das neue Theme hinzu
    document.body.classList.add(selectedTheme);
    
    // Speichere das Theme im localStorage
    localStorage.setItem('theme', selectedTheme);
});

// Lade das gespeicherte Theme bei Seitenaufruf
document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        const themeSwitch = document.getElementById('theme-switch');
        if (themeSwitch) {
            themeSwitch.value = savedTheme;
        }
    }
});
