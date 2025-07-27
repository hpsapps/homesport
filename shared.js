const getWeekByDate = () => {
    const now = new Date();
    // Define the start date of each week (Monday)
    const weekStartDates = [
        new Date('2025-07-21'), // Week 1
        new Date('2025-07-28'), // Week 2
        new Date('2025-08-04'), // Week 3
        new Date('2025-08-11'), // Week 4
        new Date('2025-08-18'), // Week 5
        new Date('2025-08-25'), // Week 6
        new Date('2025-09-01'), // Week 7
        new Date('2025-09-08'), // Week 8
        new Date('2025-09-15'), // Week 9
        new Date('2025-09-22'), // Week 10
    ];

    // Find the current week
    let currentWeek = 1; // Default to week 1
    for (let i = weekStartDates.length - 1; i >= 0; i--) {
        if (now >= weekStartDates[i]) {
            currentWeek = i + 1;
            break;
        }
    }
    
    // If the date is after the last week, default to the last week.
    if (now >= new Date('2025-09-29')) {
        currentWeek = 10;
    }

    return currentWeek;
};

document.addEventListener('DOMContentLoaded', () => {
    // This event listener ensures that the week selection is persisted
    // and consistent across pages. It needs to be loaded on every page
    // that has a week selector.

    const weekSelector = document.getElementById('week-selector');

    if (weekSelector && typeof appState !== 'undefined' && typeof appRender === 'function') {
        
        // Set initial week value from localStorage or default
        const savedWeek = localStorage.getItem('selectedWeek');
        appState.selectedWeek = savedWeek ? Number(savedWeek) : getWeekByDate();

        // Populate week selector options
        for (let i = 1; i <= 10; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Week ${i}`;
            weekSelector.appendChild(option);
        }
        
        // Set the selector to the current week
        weekSelector.value = appState.selectedWeek;

        // Add event listener to save week selection
        weekSelector.addEventListener('change', (e) => {
            const newWeek = Number(e.target.value);
            appState.selectedWeek = newWeek;
            localStorage.setItem('selectedWeek', newWeek);
            
            // If the page has a specific handler for week changes, call it
            if (typeof handleWeekChange === 'function') {
                handleWeekChange();
            } else {
                // Otherwise, just re-render
                appRender();
            }
        });

        // Initial render to ensure everything is up to date
        appRender();

        // Start the main application logic
        if (typeof window.startApp === 'function') {
            window.startApp();
        }
    }
});
