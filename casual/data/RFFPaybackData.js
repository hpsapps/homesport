/**
 * RFF PAYBACK DATA
 * 
 * Structure: 2D array for tracking RFF paybacks
 * Row 0: Headers ['Teacher', 'Slots Owed', 'Priority', 'Notes']
 * Subsequent rows: Teacher payback information
 * 
 * To update: Replace this array with CSV data from your RFF payback tracking spreadsheet
 * Lower priority numbers = higher priority for payback
 */

export const rawRFFPayback = [
  // Header row
  ['Teacher', 'Slots Owed', 'Priority', 'Notes'],
  
  // Payback data - sorted by priority
  ['Christine', '2', '1', 'ECT time coverage - 3C odd weeks, 6L even weeks'],
  ['Karen', '1', '2', 'ICT coordinator time - covers 1S for Giuseppe'],
  ['James', '1', '3', 'Sport coverage when no PSSA - flexible arrangement'],
  ['Alice', '1', '4', 'General coverage - various classes as needed'],
  ['Holly', '2', '5', 'ECT time coverage - even weeks only'],
  ['Maz', '1', '6', 'Fed Rep coverage - covers 5H for Gemma'],
  ['Narelle', '1', '7', '4C coverage - even weeks (4-day work week arrangement)']
];

/**
 * HELPER FUNCTIONS FOR RFF PAYBACK
 */

// Get all payback data, sorted by priority
export const getRFFPaybackList = () => {
  return rawRFFPayback.slice(1).map(row => ({
    teacher: row[0],
    slotsOwed: parseInt(row[1]) || 0,
    priority: parseInt(row[2]) || 999,
    notes: row[3] || ''
  })).sort((a, b) => a.priority - b.priority);
};

// Get highest priority payback (next teacher to get RFF coverage)
export const getHighestPriorityPayback = () => {
  const paybackList = getRFFPaybackList();
  return paybackList.length > 0 ? paybackList[0] : null;
};

// Get payback info for a specific teacher
export const getPaybackForTeacher = (teacherName) => {
  const paybackList = getRFFPaybackList();
  return paybackList.find(item => item.teacher === teacherName) || null;
};

// Update payback after assignment (reduce slots owed)
export const updatePaybackAfterAssignment = (teacherName) => {
  // This would modify the rawRFFPayback array in a real implementation
  // For now, return updated data structure
  return rawRFFPayback.map(row => {
    if (row[0] === teacherName) {
      const currentSlots = parseInt(row[1]) || 0;
      const newSlots = Math.max(0, currentSlots - 1);
      return [row[0], newSlots.toString(), row[2], row[3]];
    }
    return row;
  });
};

// Add new payback entry
export const addPaybackEntry = (teacherName, slotsOwed, notes = '') => {
  // Find next priority number
  const currentData = getRFFPaybackList();
  const nextPriority = currentData.length > 0 ? Math.max(...currentData.map(item => item.priority)) + 1 : 1;
  
  return [
    ...rawRFFPayback,
    [teacherName, slotsOwed.toString(), nextPriority.toString(), notes]
  ];
};

// Get summary statistics
export const getPaybackSummary = () => {
  const paybackList = getRFFPaybackList();
  
  return {
    totalTeachersOwed: paybackList.length,
    totalSlotsOwed: paybackList.reduce((sum, item) => sum + item.slotsOwed, 0),
    highestPriority: paybackList[0]?.teacher || 'None',
    averageSlotsPerTeacher: paybackList.length > 0 
      ? (paybackList.reduce((sum, item) => sum + item.slotsOwed, 0) / paybackList.length).toFixed(1)
      : '0'
  };
};
