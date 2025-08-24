/**
 * RFF ROSTER DATA
 * 
 * Structure: 2D array matching the RFF roster spreadsheet exactly
 * Row 0: Teacher names across columns
 * Row 1: Activity types (Music, Sport, Library, Computer, Exec)
 * Subsequent rows: [Time slot, Class assignments for each teacher column]
 * 
 * To update: Replace this array with CSV data from your RFF roster spreadsheet
 * The parsing logic will automatically work with new data
 */

export const rawRFFRoster = [
  // Teacher names across columns (Monday schedule shown)
  ['Time', 'Alice', 'James', 'Maz', 'Christine', 'Karen', 'Savanah', 'Glenda', 'Alice', 'James', 'Christine', 'Karen'],
  
  // Activity types for each column
  ['', 'Music', 'Sport', 'Sport', 'Library', 'Library', 'Exec', 'Exec', 'Music', 'Sport', 'Library', 'Library'],
  
  // Time slots and class assignments
  ['9:10 - 9:50', '4W', 'ECT', '3E', 'RFF', 'RFF', '1S (ICT)', 'RFF', '4C', 'RFF', '', ''],
  ['9:50 - 10:30', '6W', '2H', '1A', '2E', '1S', 'KB', 'RFF', 'KN', '', '', ''],
  ['10:30 - 11:10', '3C', '2E', '1S', '2H', '1A', 'KN', 'Sport Set Up', 'KB', '', '', ''],
  ['11:35 - 12:15', '6H', '2Y', '1D', '2B', '1O', 'KV', 'KS', '', '', '', ''],
  ['12:15 - 12:55', '3N', '2B', '1O', '2Y', '1D', 'KS', 'KV', '', '', '', ''],
  ['1:45 - 2:25', '3W', '2D', '1MS', '4I', 'ECT#', 'KK', 'KE', '', '', '', ''],
  ['2:25 - 3:05', '4I', 'Christina', '1G!', '2D', '5H', 'KE', 'RFF', 'KK', '', '', '']
];

/**
 * RFF SPECIAL ASSIGNMENTS NOTES
 * From the original roster - these explain special arrangements
 */
export const rffNotes = {
  'KN!': 'Narelle to cover 4C every even week as both Narelle and Gabi are 4 days per week',
  'Fed Rep': 'Maz to cover 5H in classroom for Gemma to have Fed Rep time',
  'ECT#': 'Karen to cover 3C and 6L (in classrooms) for Chelsea and Holly to have school funded ECT time. 3C odd weeks and 6L even weeks',
  'Christina': 'James to take whatever class Christina has for the day in the classroom for Christina to have RFF',
  '1G!': 'Fi to cover 1A every even week as both Fi and Renee work 4 days per week',
  'ICT': 'Sport RFF and Karen to cover 1S in classroom for Giuseppe to have ICT coordinator RFF',
  '6H%': 'Sport RFF to cover 6H in classroom for Christina to have RFF'
};

/**
 * HELPER FUNCTIONS FOR RFF ROSTER
 */

// Get all teachers from RFF roster
export const getTeachersFromRFFRoster = () => {
  const teachers = new Set();
  
  if (rawRFFRoster.length > 0) {
    rawRFFRoster[0].slice(1).forEach(teacher => {
      if (teacher && teacher !== '' && teacher !== 'Time') {
        teachers.add(teacher);
      }
    });
  }
  
  return Array.from(teachers);
};

// Find RFF slots for a specific teacher (currently Monday only)
export const findRFFForTeacher = (teacherName, dayOfWeek = 'Monday') => {
  const rffSlots = [];
  
  if (rawRFFRoster.length < 3) return rffSlots;
  
  // Find teacher column(s) - teachers can appear multiple times
  const teacherColumns = [];
  rawRFFRoster[0].forEach((teacher, index) => {
    if (teacher === teacherName) {
      teacherColumns.push(index);
    }
  });
  
  if (teacherColumns.length === 0) return rffSlots;
  
  // Parse time slots (starting from row 2, skipping header rows)
  rawRFFRoster.slice(2).forEach(row => {
    const timeSlot = row[0];
    if (timeSlot && timeSlot.includes('-')) {
      teacherColumns.forEach(colIndex => {
        const assignment = row[colIndex];
        if (assignment && assignment !== '' && assignment !== 'RFF') {
          // Get activity type from header row
          const activity = rawRFFRoster[1][colIndex] || 'Unknown';
          
          rffSlots.push({
            timeSlot: timeSlot,
            activity: activity,
            class: assignment,
            teacher: teacherName,
            notes: rffNotes[assignment] || ''
          });
        }
      });
    }
  });
  
  return rffSlots;
};

// Get all time slots from RFF roster
export const getRFFTimeSlots = () => {
  return rawRFFRoster.slice(2).map(row => row[0]).filter(time => time && time.includes('-'));
};

// Get activity types for a teacher
export const getTeacherActivities = (teacherName) => {
  const activities = new Set();
  
  rawRFFRoster[0].forEach((teacher, index) => {
    if (teacher === teacherName && rawRFFRoster[1][index]) {
      activities.add(rawRFFRoster[1][index]);
    }
  });
  
  return Array.from(activities);
};
