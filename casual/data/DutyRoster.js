/**
 * PLAYGROUND DUTY ROSTER DATA
 * 
 * This file now fetches and processes data from playground_roster.json
 */

let dutyData = [];

// Fetch and load the Duty JSON data
export async function loadDutyData() {
    try {
        const response = await fetch('./data/DutyRoster.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dutyData = data; // Still set module-level variable for existing calls
        return data;
    } catch (error) {
        console.error("Could not load Duty data:", error);
        return []; // Return empty array on error
    }
}

/**
 * HELPER FUNCTIONS FOR DUTY ROSTER
 */

// Get all teachers from duty roster
export const getTeachersFromDutyRoster = () => {
    const teachers = new Set();
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    dutyData.forEach(dutyItem => {
        daysOfWeek.forEach(day => {
            const assignedTeacher = dutyItem[day];
            if (assignedTeacher && assignedTeacher !== 'CLOSED' && !assignedTeacher.includes('Team')) {
                // Handle combined names like "Katherine/Tanya"
                const names = assignedTeacher.split('/');
                names.forEach(name => {
                    const cleanName = name.trim().split(' ')[0]; // Take first name only
                    if (cleanName && cleanName.length > 1) {
                        teachers.add(cleanName);
                    }
                });
            }
        });
    });

    return Array.from(teachers);
};

// Find duties for a specific teacher on a specific day
export const findDutiesForTeacher = (teacherName, dayOfWeek) => {
    const duties = [];

    dutyData.forEach(dutyItem => {
        const assignedTeacher = dutyItem[dayOfWeek];

        if (assignedTeacher && (assignedTeacher === teacherName || assignedTeacher.includes(teacherName))) {
            duties.push({
                timeSlot: dutyItem.Time,
                area: dutyItem.Area,
                dutyType: dutyItem.Duty
            });
        }
    });

    return duties;
};
