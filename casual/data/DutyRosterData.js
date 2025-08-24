/**
 * PLAYGROUND DUTY ROSTER DATA
 * 
 * Structure: 2D array matching the playground roster spreadsheet exactly
 * Row 0: Headers ['Duty Area', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
 * Subsequent rows: [Area name, Teacher assignments for each day]
 * 
 * To update: Replace this array with CSV data from your playground roster spreadsheet
 * The parsing logic in the main app will automatically work with new data
 */

export const rawDutyRoster = [
    // Header row
    ['Duty Area', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],

    // BEFORE SCHOOL (8:35-9:05) - Implied by position
    ['C St gate', 'Lisa', 'Lisa', 'Lisa', 'Tanya', 'Katherine/Tanya'],
    ['W St gate', 'Susan', 'Susan', 'Susan', 'Susan', 'Tarsh'],

    // RECESS (11:10-11:35) - Rows 3-9
    ['Lines K-2', 'Katherine', 'Katherine', 'Katherine', 'Kindy Team', 'Katherine'],
    ['Lines 1-2', 'Tanya', 'Tanya', 'Tarsh', 'Tarsh', 'Tarsh'],
    ['Lines 3-6', 'Liz W', 'Rachel', 'Kati H', 'Jeanette', 'Jeanette'],
    ['A (3-6)', 'Alice', 'Clair S', 'Claire D', 'Aleta', 'Katie'],
    ['B (3-6)', 'Chelsea', 'Aliy', 'Holly', 'Dane', 'Alice'],
    ['C (Kindy)', 'Liz C', 'Katherine', 'Narelle', 'Bronwyn', 'Veronica'],
    ['D (Y1-2)', 'Giuseppe', 'Giuseppe', 'Giuseppe', 'Giuseppe', 'Aliy'],

    // LUNCH 1ST HALF (1:05-1:25) - Rows 10-16
    ['A (3-5)', 'Gabrielle', 'Katie', 'Anna', 'Gemma', 'Holly'],
    ['B (3-6)', 'Katie', 'Michael', 'Jen B', 'Fiona', 'Sarah S'],
    ['C (K) - Equip', 'Sophie', 'Helen', 'Nikki', 'Maz', 'Liz C'],
    ['C (K) - Multi', 'Narelle', 'Veronica', 'Katherine', 'Nikki', 'Sophie'],
    ['D (Y1-2)', 'Jen Y', 'Tarsh', 'Sarah O', 'Jen B', 'Renee'],
    ['Garden (3-5)', 'Aliy', 'Elise', 'Kylie', 'Kylie', 'Aleta'],
    ['E (Year 6)', 'Jed', 'Gabrielle', 'Kati H', 'Clair S', 'Kati H'],

    // LUNCH 2ND HALF (1:25-1:45) - Rows 17-25
    ['A (3-5)', 'Karen R', 'Gemma', 'Chelsea', 'Christine', 'Penny'],
    ['B (3-5)', 'Aleta', 'Christina', 'Renee', 'Liz W', 'Gemma'],
    ['Matt', 'Dane', 'Clair S', 'Jed', 'Rachel', 'Matt W1 only'],
    ['C (K) - Equip', 'Bronwyn', 'Sarah O', 'Elise', 'Sophie', 'Bronwyn'],
    ['C (K) - Multi', 'Claire D', 'Bronwyn', 'Liz C', 'Helen', 'Karen R'],
    ['D (Y1-2)', 'Sarah O', 'Belinda', 'Aliy', 'Tarsh', 'Helen'],
    ['Garden (3-5)', 'Daana', 'Daana', 'Katie N', 'Katie', 'Elise'],
    ['E (Year 6)', 'Holly', 'Holly', 'Matt', 'Anna', 'Rachel W1 only'],
    ['Library', 'Sarah S', 'Sarah S week 1', 'Sarah S', 'Sarah S', 'CLOSED'],

    // AFTER SCHOOL (3:05) - Rows 26-27
    ['W St gate', 'Priscilla', 'Priscilla', 'Priscilla', 'Priscilla', 'Priscilla'],
    ['Bus St gate', 'Tanya', 'Christine', 'Tanya', 'Karen R', 'Liz W']
];

/**
 * DUTY TIME PERIODS MAPPING
 * Maps row ranges to time periods for parsing
 */
export const dutyTimePeriods = {
    beforeSchool: { start: 1, end: 2, time: 'Before School (8:35-9:05)' },
    recess: { start: 3, end: 9, time: 'Recess (11:10-11:35)' },
    lunch1st: { start: 10, end: 16, time: 'Lunch 1st half (1:05-1:25)' },
    lunch2nd: { start: 17, end: 25, time: 'Lunch 2nd half (1:25-1:45)' },
    afterSchool: { start: 26, end: 27, time: 'After School (3:05)' }
};

/**
 * HELPER FUNCTIONS FOR DUTY ROSTER
 */

// Get all teachers from duty roster
export const getTeachersFromDutyRoster = () => {
    const teachers = new Set();

    rawDutyRoster.slice(1).forEach(row => {
        for (let i = 1; i < row.length; i++) {
            if (row[i] && row[i] !== 'CLOSED' && !row[i].includes('Team')) {
                // Handle combined names like "Katherine/Tanya"
                const names = row[i].split('/');
                names.forEach(name => {
                    const cleanName = name.trim().split(' ')[0]; // Take first name only
                    if (cleanName && cleanName.length > 1) {
                        teachers.add(cleanName);
                    }
                });
            }
        }
    });

    return Array.from(teachers);
};

// Find duties for a specific teacher on a specific day
export const findDutiesForTeacher = (teacherName, dayOfWeek) => {
    const duties = [];
    const dayIndex = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].indexOf(dayOfWeek) + 1;

    if (dayIndex === 0) return duties; // Invalid day

    rawDutyRoster.slice(1).forEach((row, index) => {
        const area = row[0];
        const assignedTeacher = row[dayIndex];

        if (assignedTeacher && (assignedTeacher === teacherName || assignedTeacher.includes(teacherName))) {
            // Determine time period based on row position
            let timePeriod = 'Unknown';
            const rowNum = index + 1; // Adjust for header row

            Object.values(dutyTimePeriods).forEach(period => {
                if (rowNum >= period.start && rowNum <= period.end) {
                    timePeriod = period.time;
                }
            });

            duties.push({ timeSlot: timePeriod, area: area });
        }
    });

    return duties;
};
