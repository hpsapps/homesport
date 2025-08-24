/**
 * CLASS ASSIGNMENT DATA
 * 
 * Maps regular classroom teachers to their assigned classes
 * Structure: Array of objects with teacher name, class, year level, and additional info
 * 
 * To update: Modify teacher-class assignments as needed
 * This data works alongside RFF and Duty rosters to provide complete teacher scheduling
 */

export const classAssignments = [
  // Kindergarten Classes
  { teacher: 'Katherine', class: 'KB', yearLevel: 'Kindergarten', fullTime: true },
  { teacher: 'Sophie', class: 'KN', yearLevel: 'Kindergarten', fullTime: true },
  { teacher: 'Veronica', class: 'KV', yearLevel: 'Kindergarten', fullTime: true },
  { teacher: 'Bronwyn', class: 'KS', yearLevel: 'Kindergarten', fullTime: true },
  { teacher: 'Helen', class: 'KK', yearLevel: 'Kindergarten', fullTime: true },
  { teacher: 'Nikki', class: 'KE', yearLevel: 'Kindergarten', fullTime: true },
  
  // Year 1 Classes
  { teacher: 'Giuseppe', class: '1S', yearLevel: 'Year 1', fullTime: true, notes: 'ICT Coordinator' },
  { teacher: 'Renee', class: '1A', yearLevel: 'Year 1', fullTime: false, notes: '4 days per week' },
  { teacher: 'Sarah O', class: '1D', yearLevel: 'Year 1', fullTime: true },
  { teacher: 'Tarsh', class: '1O', yearLevel: 'Year 1', fullTime: true },
  { teacher: 'Aliy', class: '1MS', yearLevel: 'Year 1', fullTime: true },
  { teacher: 'Jen B', class: '1G', yearLevel: 'Year 1', fullTime: true },
  
  // Year 2 Classes
  { teacher: 'Tanya', class: '2H', yearLevel: 'Year 2', fullTime: true },
  { teacher: 'Liz C', class: '2E', yearLevel: 'Year 2', fullTime: true },
  { teacher: 'Susan', class: '2B', yearLevel: 'Year 2', fullTime: true },
  { teacher: 'Belinda', class: '2Y', yearLevel: 'Year 2', fullTime: true },
  { teacher: 'Elise', class: '2D', yearLevel: 'Year 2', fullTime: true },
  
  // Year 3 Classes
  { teacher: 'Chelsea', class: '3C', yearLevel: 'Year 3', fullTime: true, notes: 'ECT - Early Career Teacher' },
  { teacher: 'Kati H', class: '3E', yearLevel: 'Year 3', fullTime: true },
  { teacher: 'Jeanette', class: '3N', yearLevel: 'Year 3', fullTime: true },
  { teacher: 'Liz W', class: '3W', yearLevel: 'Year 3', fullTime: true },
  
  // Year 4 Classes
  { teacher: 'Claire D', class: '4W', yearLevel: 'Year 4', fullTime: true },
  { teacher: 'Gabrielle', class: '4C', yearLevel: 'Year 4', fullTime: false, notes: '4 days per week' },
  { teacher: 'Anna', class: '4I', yearLevel: 'Year 4', fullTime: true },
  
  // Year 5 Classes
  { teacher: 'Gemma', class: '5H', yearLevel: 'Year 5', fullTime: true, notes: 'Fed Rep arrangements' },
  
  // Year 6 Classes
  { teacher: 'Holly', class: '6W', yearLevel: 'Year 6', fullTime: true, notes: 'ECT - Early Career Teacher' },
  { teacher: 'Christina', class: '6H', yearLevel: 'Year 6', fullTime: true },
  { teacher: 'Rachel', class: '6L', yearLevel: 'Year 6', fullTime: true }
];

/**
 * RFF SPECIALIST TEACHERS
 * Teachers who provide Release From Face-to-Face teaching
 * These teachers work with classes while regular teachers have planning time
 */
export const rffSpecialists = [
  { teacher: 'Alice', subjects: ['Music'], fullTime: true },
  { teacher: 'James', subjects: ['Sport'], fullTime: true, notes: 'Covers for Christina RFF' },
  { teacher: 'Maz', subjects: ['Sport'], fullTime: true, notes: 'Fed Rep cover for 5H' },
  { teacher: 'Christine', subjects: ['Library'], fullTime: true },
  { teacher: 'Karen R', subjects: ['Library'], fullTime: true, notes: 'ECT coordinator support' },
  { teacher: 'Savanah', subjects: ['Executive'], fullTime: true, role: 'Assistant Principal' },
  { teacher: 'Glenda', subjects: ['Executive'], fullTime: true, role: 'Deputy Principal' }
];

/**
 * SUPPORT STAFF AND CASUAL TEACHERS
 * Additional staff who may appear in rosters
 */
export const supportStaff = [
  { teacher: 'Lisa', role: 'Administration', duties: ['Gate duty', 'Office support'] },
  { teacher: 'Priscilla', role: 'Casual/Relief', duties: ['After school gate duty'] },
  { teacher: 'Narelle', role: 'Support', notes: 'Covers 4C on even weeks' },
  { teacher: 'Fiona', role: 'Support', notes: 'Covers 1A on even weeks' },
  { teacher: 'Daana', role: 'Support', duties: ['Garden supervision'] },
  { teacher: 'Matt', role: 'Support', duties: ['Lunch supervision Week 1 only'] }
];

/**
 * HELPER FUNCTIONS FOR CLASS ASSIGNMENTS
 */

// Get teacher's regular class
export const getTeacherClass = (teacherName) => {
  const assignment = classAssignments.find(item => item.teacher === teacherName);
  return assignment ? assignment.class : null;
};

// Get class teacher
export const getClassTeacher = (className) => {
  const assignment = classAssignments.find(item => item.class === className);
  return assignment ? assignment.teacher : null;
};

// Get all classes for a year level
export const getClassesByYearLevel = (yearLevel) => {
  return classAssignments
    .filter(item => item.yearLevel === yearLevel)
    .map(item => ({ teacher: item.teacher, class: item.class }));
};

// Get all teachers by role type
export const getTeachersByRole = (roleType = 'classroom') => {
  switch (roleType) {
    case 'classroom':
      return classAssignments.map(item => item.teacher);
    case 'rff':
    case 'specialist':
      return rffSpecialists.map(item => item.teacher);
    case 'support':
      return supportStaff.map(item => item.teacher);
    case 'all':
      return [
        ...classAssignments.map(item => item.teacher),
        ...rffSpecialists.map(item => item.teacher),
        ...supportStaff.map(item => item.teacher)
      ];
    default:
      return [];
  }
};

// Find teacher information across all categories
export const getTeacherInfo = (teacherName) => {
  // Check classroom teachers
  let info = classAssignments.find(item => item.teacher === teacherName);
  if (info) return { ...info, role: 'Classroom Teacher' };
  
  // Check RFF specialists
  info = rffSpecialists.find(item => item.teacher === teacherName);
  if (info) return { ...info, role: 'RFF Specialist' };
  
  // Check support staff
  info = supportStaff.find(item => item.teacher === teacherName);
  if (info) return { ...info, role: 'Support Staff' };
  
  return null;
};

// Get year level from class code
export const getYearLevelFromClass = (classCode) => {
  if (!classCode) return null;
  
  const firstChar = classCode.charAt(0);
  switch (firstChar) {
    case 'K': return 'Kindergarten';
    case '1': return 'Year 1';
    case '2': return 'Year 2';
    case '3': return 'Year 3';
    case '4': return 'Year 4';
    case '5': return 'Year 5';
    case '6': return 'Year 6';
    default: return null;
  }
};

// Get all classes in school
export const getAllClasses = () => {
  return classAssignments.map(item => item.class).sort((a, b) => {
    // Sort by year level first, then alphabetically
    const yearA = a.charAt(0);
    const yearB = b.charAt(0);
    if (yearA !== yearB) {
      if (yearA === 'K') return -1;
      if (yearB === 'K') return 1;
      return yearA.localeCompare(yearB);
    }
    return a.localeCompare(b);
  });
};

/**
 * PART-TIME TEACHER ARRANGEMENTS
 * Special scheduling arrangements for teachers who work less than full-time
 */
export const partTimeArrangements = {
  'Gabrielle': {
    workDays: 4,
    coverTeacher: 'Narelle',
    coverSchedule: 'Even weeks',
    notes: '4C covered by Narelle on even weeks'
  },
  'Renee': {
    workDays: 4,
    coverTeacher: 'Fiona',
    coverSchedule: 'Even weeks',
    notes: '1A covered by Fiona on even weeks'
  }
};

export default {
  classAssignments,
  rffSpecialists,
  supportStaff,
  partTimeArrangements,
  getTeacherClass,
  getClassTeacher,
  getClassesByYearLevel,
  getTeachersByRole,
  getTeacherInfo,
  getYearLevelFromClass,
  getAllClasses
};
