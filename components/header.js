document.addEventListener('DOMContentLoaded', () => {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;

    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            headerPlaceholder.innerHTML = data;
            const mainTitle = document.getElementById('main-title');
            if (mainTitle) {
                mainTitle.textContent = document.title;
            }

            if (headerPlaceholder.dataset.showHomeIcon === 'true') {
                const homeIconLink = document.getElementById('home-icon-link');
                if (homeIconLink) {
                    homeIconLink.classList.remove('hidden');
                }
            }

            const darkModeToggle = document.getElementById('dark-mode-toggle');
            if (darkModeToggle) {
                darkModeToggle.addEventListener('click', () => {
                    if (window.state && typeof window.render === 'function') {
                        window.state.darkMode = !window.state.darkMode;
                        localStorage.setItem('darkMode', window.state.darkMode);
                        window.render();
                    }
                });
            }

            // Initial render of the header
            if (window.state && typeof window.render === 'function') {
                window.render();
            }
        });
});
