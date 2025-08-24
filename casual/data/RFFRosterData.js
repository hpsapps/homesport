/**
 * RFF ROSTER DATA
 * 
 * This file now fetches and processes data from RFF.json
 */

let rffData = {};

// Fetch and load the RFF JSON data
async function loadRFFData() {
    try {
        const response = await fetch('./data/RFF.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        rffData = await response.json();
    } catch (error) {
        console.error("Could not load RFF data:", error);
    }
}

// Load the data immediately
loadRFFData();

/**
 * RFF SPECIAL ASSIGNMENTS NOTES
 * From the original roster - these explain special arrangements
 */
export const rffNotes = {
  'KN': 'Narelle to cover 4C every even week as both Narelle and Gabi are 4 days per week',
  'Fed Rep': 'Maz to cover 5H in classroom for Gemma to have Fed Rep time',
  'ECT#': 'Karen to cover 3C and 6L (in classrooms) for Chelsea and Holly to have school funded ECT time. 3C odd weeks and 6L even weeks',
  'Christina': 'James to take whatever class Christina has for the day in the classroom for Christina to have RFF',
  '1G': 'Fi to cover 1A every even week as both Fi and Renee work 4 days per week',
  'ICT': 'Sport RFF and Karen to cover 1S in classroom for Giuseppe to have ICT coordinator RFF',
  '6H': 'Sport RFF to cover 6H in classroom for Christina to have RFF'
};

/**
 * HELPER FUNCTIONS FOR RFF ROSTER
 */

// Get all teachers from RFF roster
export const getTeachersFromRFFRoster = () => {
  const teachers = new Set();
  for (const day in rffData) {
    rffData[day].forEach(timeSlot => {
      timeSlot.assignments.forEach(assignment => {
        if (assignment.teacher && assignment.teacher !== 'TBC') {
          teachers.add(assignment.teacher);
        }
      });
    });
  }
  return Array.from(teachers);
};

// Find RFF slots for a specific teacher
export const findRFFForTeacher = (teacherName, dayOfWeek) => {
  const rffSlots = [];
  const dayData = rffData[dayOfWeek];

  if (dayData) {
    dayData.forEach(timeSlot => {
      timeSlot.assignments.forEach(assignment => {
        if (assignment.teacher === teacherName && assignment.class && assignment.class !== 'RFF') {
          rffSlots.push({
            timeSlot: timeSlot.time,
            activity: assignment.activity,
            class: assignment.class,
            teacher: teacherName,
            notes: rffNotes[assignment.class] || ''
          });
        }
      });
    });
  }
  
  return rffSlots;
};

// Get all time slots from RFF roster
export const getRFFTimeSlots = () => {
  const timeSlots = new Set();
  for (const day in rffData) {
    rffData[day].forEach(timeSlot => {
      timeSlots.add(timeSlot.time);
    });
  }
  return Array.from(timeSlots);
};

// Get activity types for a teacher
export const getTeacherActivities = (teacherName) => {
  const activities = new Set();
  for (const day in rffData) {
    rffData[day].forEach(timeSlot => {
      timeSlot.assignments.forEach(assignment => {
        if (assignment.teacher === teacherName && assignment.activity) {
          activities.add(assignment.activity);
        }
      });
    });
  }
  return Array.from(activities);
};

// A function to find RFF slots for a given class on a specific day
export const findRFFForClass = (className, dayOfWeek) => {
    const slots = [];
    const dayData = rffData[dayOfWeek];

    if (dayData && className) {
        dayData.forEach(timeSlot => {
            timeSlot.assignments.forEach(assignment => {
                if (assignment.class && assignment.class.includes(className)) {
                    slots.push({
                        timeSlot: timeSlot.time,
                        activity: `RFF: ${assignment.activity}`,
                        class: assignment.class,
                        teacher: assignment.teacher
                    });
                }
            });
        });
    }
    return slots;
};
