document.addEventListener('DOMContentLoaded', () => {
    const weekSelectorPlaceholder = document.getElementById('week-selector-placeholder');

    if (weekSelectorPlaceholder) {
        fetch('components/week-selector.html')
            .then(response => response.text())
            .then(data => {
                weekSelectorPlaceholder.innerHTML = data;
                initializeWeekSelector();
            });
    }

    const getWeekByDate = () => {
        const now = new Date();
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

        let currentWeek = 1;
        for (let i = weekStartDates.length - 1; i >= 0; i--) {
            if (now >= weekStartDates[i]) {
                currentWeek = i + 1;
                break;
            }
        }

        if (now >= new Date('2025-09-29')) {
            currentWeek = 10;
        }

        return currentWeek;
    };

    const initializeWeekSelector = () => {
        const weekSelector = document.getElementById('week-selector');
        const weekCard = document.getElementById('week-card');
        
        if (!weekSelector || !weekCard) return;

        // Populate week selector options
        for (let i = 1; i <= 10; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Week ${i}`;
            weekSelector.appendChild(option);
        }

        // Set initial week
        const currentWeek = getWeekByDate();
        weekSelector.value = currentWeek;

        // Dispatch initial event
        dispatchWeekChangeEvent(currentWeek);

        // Add event listener for changes
        weekSelector.addEventListener('change', (e) => {
            dispatchWeekChangeEvent(e.target.value);
        });

        // Handle dark mode styling
        const applyDarkMode = () => {
            const isDarkMode = document.documentElement.classList.contains('dark');
            weekCard.className = isDarkMode ? 'bg-gray-800 border-[#78013D] mb-4 shadow-lg border rounded-lg transition-colors duration-300' : 'bg-white border-[#78013D] mb-4 shadow-lg border rounded-lg transition-colors duration-300';
            weekCard.querySelector('h2').className = isDarkMode ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-gray-900';
            weekSelector.className = `w-full p-3 rounded-xl border-2 font-medium transition-all duration-200 ${
                isDarkMode
                    ? 'bg-gray-700 text-gray-200 border-gray-600 focus:border-blue-400'
                    : 'bg-white text-gray-700 border-gray-200 focus:border-blue-300'
            }`;
        };
        
        // Apply dark mode on initialization
        applyDarkMode();

        // Use a MutationObserver to watch for changes on the <html> element's class attribute
        const observer = new MutationObserver(applyDarkMode);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    };

    const dispatchWeekChangeEvent = (week) => {
        const event = new CustomEvent('weekChanged', {
            detail: { week: Number(week) }
        });
        document.dispatchEvent(event);
    };
});
