document.addEventListener('DOMContentLoaded', () => {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        fetch('header.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                const mainTitle = document.getElementById('main-title');
                if (mainTitle) {
                    mainTitle.textContent = document.title;
                }
            });
    }
});
