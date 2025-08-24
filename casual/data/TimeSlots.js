export let timeSlots = [];

export async function loadTimeSlotsData() {
    try {
        const response = await fetch('./data/TimeSlots.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        timeSlots = await response.json();
    } catch (error) {
        console.error("Failed to load time slots data:", error);
        timeSlots = []; // Ensure timeSlots is an empty array on error
    }
}

export const getSessionTitle = (time) => {
    // Normalize time format for comparison (expecting "HH:MM-HH:MM" or "HH:MM")
    const normalizeTime = (t) => {
        if (t.includes('-')) {
            // Extract the start time from "HH:MM-HH:MM"
            return t.split('-')[0].trim();
        }
        return t.trim(); // Assume it's already "HH:MM"
    };

    const normalizedInputTime = normalizeTime(time);

    for (const session of timeSlots) { // Use the loaded timeSlots array
        for (const sessionTime of session.times) {
            const normalizedSessionTime = normalizeTime(sessionTime);
            if (normalizedInputTime.startsWith(normalizedSessionTime.substring(0, 5))) { // Compare only HH:MM
                return session.title;
            }
        }
    }
    return "Unknown Session";
};
