// Student utility module - shared helper functions for the student portal

// named export: constant
export const DEPARTMENT_NAME = "Computer Science";

// named export: rest parameter collects all marks into one array
export function calculateTotal(...marks) {
  return marks.reduce((sum, mark) => sum + mark, 0);
}

// named export: arrow function (average of all marks passed in)
export const calculateAverage = (...marks) => calculateTotal(...marks) / marks.length;

// named export: grade from total marks
export function getGrade(marks) {
  if (marks >= 80) return "A";
  if (marks >= 70) return "B";
  if (marks >= 60) return "C";
  if (marks >= 50) return "D";
  return "F";
}

// named export: arrow function + ternary operator
export const getStatus = (marks) => marks >= 50 ? "Pass" : "Fail";

// default export: formatted result string with a template literal
export default function formatStudentResult(name, rollNumber, total) {
  return `${name} - ${rollNumber} - Total: ${total}`;
}
