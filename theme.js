// theme.js
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    // Check if the necessary components are available on the page
    if (darkModeToggle && typeof appState !== 'undefined' && typeof appRender === 'function') {
        
        darkModeToggle.addEventListener('click', () => {
            // 1. Toggle the dark mode state
            appState.darkMode = !appState.darkMode;
            
            // 2. Save the user's preference to localStorage for persistence
            localStorage.setItem('darkMode', appState.darkMode);
            
            // 3. Re-render the UI to apply the new theme
            appRender();
        });
    }
});
