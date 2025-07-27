document.addEventListener('DOMContentLoaded', () => {
    const weekSelectorPlaceholder = document.getElementById('week-selector-placeholder');
    if (weekSelectorPlaceholder) {
        fetch('week-selector.html')
            .then(response => response.text())
            .then(data => {
                weekSelectorPlaceholder.innerHTML = data;
            });
    }
});
