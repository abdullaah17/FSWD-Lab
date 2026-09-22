/* =========================================
   FULL STACK WEB DEVELOPMENT - LAB 03
   Student Academic & Scholarship Management
   Author: Abdullah
========================================= */


/* =========================================
   HOISTING DEMONSTRATION
   (open F12 -> Console to observe)
========================================= */

/*
   var declarations are HOISTED to the top of
   their scope and are automatically initialised
   with the value undefined.

   So the line below does NOT throw an error,
   it prints: undefined
*/

console.log("var before assignment:", hoistedCourseCode);

var hoistedCourseCode = "CS-2043 Full Stack Web Development";

console.log("var after assignment:", hoistedCourseCode);


/*
   let is also hoisted, but it is NOT initialised.
   It stays in the "Temporal Dead Zone" until the
   declaration line is executed.

   Accessing it before the declaration throws:
   ReferenceError: Cannot access 'letCourseCode'
   before initialization

   try / catch is used so the error can be observed
   in the Console without stopping the rest of the page.
*/

let hoistingErrorMessage = "";

try {

    console.log("let before declaration:", letCourseCode);

}
catch (error) {

    hoistingErrorMessage = error.message;

    console.log("let before declaration ->", error.name +
        ": " + error.message);

}

let letCourseCode = "CS-2043";

console.log("let after declaration:", letCourseCode);


/*
   SUMMARY OF THE DIFFERENCE
   var  -> hoisted AND initialised to undefined
   let  -> hoisted but NOT initialised (Temporal Dead Zone)
*/


/* =========================================
   UNIVERSITY RULES
========================================= */

// Each component has its own maximum, so the
// percentage must be calculated from the combined
// maximum, not assumed to be 100.

const ASSIGNMENT_MAX = 20;
const MIDTERM_MAX = 30;
const FINAL_EXAM_MAX = 60;

// Pass rule
const PASS_PERCENTAGE = 50;
const CLASS_AVERAGE_PERCENTAGE = 70;

// Merit scholarship rules
const GOLD_CGPA = 3.70;
const GOLD_ATTENDANCE = 90;
const GOLD_PERCENTAGE = 85;

const SILVER_CGPA = 3.30;
const SILVER_ATTENDANCE = 80;
const SILVER_PERCENTAGE = 75;

// Academic warning rules
const WARNING_PERCENTAGE = 60;
const WARNING_CGPA = 2.50;
const WARNING_ATTENDANCE = 75;

const CRITICAL_CGPA = 2.00;
const CRITICAL_ATTENDANCE = 60;


/* =========================================
   STUDENT OBJECT

   Four test scenarios. Change activeScenario
   at the bottom of this file to 0, 1, 2 or 3
   to test each one.
========================================= */

let studentRecords = [

    // Scenario 1 - High performing student
    {
        name: "Ayesha Khan",
        registrationNo: "FA24-BSCS-014",
        program: "BS Computer Science",
        semester: 5,
        cgpa: 3.85,
        attendance: 94,
        marks: {
            assignment: 19,
            midterm: 28,
            finalExam: 55
        }
    },

    // Scenario 2 - Average student
    {
        name: "Bilal Ahmed",
        registrationNo: "FA24-BSCS-027",
        program: "BS Computer Science",
        semester: 5,
        cgpa: 3.42,
        attendance: 86,
        marks: {
            assignment: 16,
            midterm: 23,
            finalExam: 45
        }
    },

    // Scenario 3 - Good marks but low attendance
    {
        name: "Hira Nawaz",
        registrationNo: "FA24-BSCS-041",
        program: "BS Software Engineering",
        semester: 5,
        cgpa: 3.78,
        attendance: 68,
        marks: {
            assignment: 18,
            midterm: 27,
            finalExam: 53
        }
    },

    // Scenario 4 - Poor academic performance
    {
        name: "Usman Tariq",
        registrationNo: "FA24-BSCS-053",
        program: "BS Computer Science",
        semester: 5,
        cgpa: 1.92,
        attendance: 57,
        marks: {
            assignment: 8,
            midterm: 11,
            finalExam: 21
        }
    }

];


/* =========================================
   ACADEMIC CALCULATION
   (arithmetic operators)
========================================= */

function calculateAcademics(student) {

    // Arithmetic operator: +
    let obtainedMarks =
        student.marks.assignment +
        student.marks.midterm +
        student.marks.finalExam;

    let maximumMarks =
        ASSIGNMENT_MAX +
        MIDTERM_MAX +
        FINAL_EXAM_MAX;

    // Arithmetic operators: / and *
    let percentage = (obtainedMarks / maximumMarks) * 100;

    // Arithmetic operator: -
    let marksLost = maximumMarks - obtainedMarks;

    // Arithmetic operator: / (average of the three components)
    let averageComponentMarks = obtainedMarks / 3;

    // Arithmetic operator: % (remainder above the last full ten)
    let marksAboveLastFullTen = obtainedMarks % 10;

    return {
        obtainedMarks: obtainedMarks,
        maximumMarks: maximumMarks,
        percentage: percentage,
        marksLost: marksLost,
        averageComponentMarks: averageComponentMarks,
        marksAboveLastFullTen: marksAboveLastFullTen
    };

}


/* =========================================
   GRADE CALCULATION
========================================= */

function calculateGrade(percentage) {

    let grade;

    if (percentage >= 80) {

        grade = "A";

    }
    else if (percentage >= 70) {

        grade = "B";

    }
    else if (percentage >= 60) {

        grade = "C";

    }
    else if (percentage >= 50) {

        grade = "D";

    }
    else {

        grade = "F";

    }

    return grade;

}


/* =========================================
   PASS / FAIL DECISION
========================================= */

function calculateResult(percentage) {

    let result;

    // Comparison operator: >=
    if (percentage >= PASS_PERCENTAGE) {

        result = "Passed";

    }
    else {

        result = "Failed";

    }

    return result;

}


/* =========================================
   SCHOLARSHIP ELIGIBILITY
   (three possible outcomes)
========================================= */

function calculateScholarship(student, percentage) {

    let isPassing = percentage >= PASS_PERCENTAGE;

    /*
       ! turns "is passing" into "is NOT passing".
       || is used because ANY ONE of these problems is
          enough to remove the student from the list.
    */
    let isDisqualified =
        !isPassing ||
        student.attendance < SILVER_ATTENDANCE;

    /*
       && is used for the award levels because a student
       must satisfy ALL THREE conditions at the same time.
    */
    let meetsGoldCriteria =
        student.cgpa >= GOLD_CGPA &&
        student.attendance >= GOLD_ATTENDANCE &&
        percentage >= GOLD_PERCENTAGE;

    let meetsSilverCriteria =
        student.cgpa >= SILVER_CGPA &&
        student.attendance >= SILVER_ATTENDANCE &&
        percentage >= SILVER_PERCENTAGE;

    let scholarshipStatus;

    if (isDisqualified) {

        scholarshipStatus = "Not Eligible";

    }
    else if (meetsGoldCriteria) {

        scholarshipStatus = "Gold Scholarship";

    }
    else if (meetsSilverCriteria) {

        scholarshipStatus = "Silver Scholarship";

    }
    else {

        scholarshipStatus = "Not Eligible";

    }

    return {
        status: scholarshipStatus,
        isPassing: isPassing,
        isDisqualified: isDisqualified,
        meetsGoldCriteria: meetsGoldCriteria,
        meetsSilverCriteria: meetsSilverCriteria
    };

}


/* =========================================
   ACADEMIC WARNING SYSTEM
========================================= */

function calculateAcademicStatus(student, percentage) {

    /*
       || is used again: a single serious weakness is
       enough to place the student in that category.
       The critical test runs FIRST so the worst case wins.
    */
    let isCritical =
        percentage < PASS_PERCENTAGE ||
        student.cgpa <= CRITICAL_CGPA ||
        student.attendance < CRITICAL_ATTENDANCE;

    let needsWarning =
        percentage < WARNING_PERCENTAGE ||
        student.cgpa < WARNING_CGPA ||
        student.attendance < WARNING_ATTENDANCE;

    let academicStatus;

    if (isCritical) {

        academicStatus = "Critical";

    }
    else if (needsWarning) {

        academicStatus = "Academic Warning";

    }
    else {

        academicStatus = "Good Standing";

    }

    return academicStatus;

}


/* =========================================
   OPERATORS DEMONSTRATION
   (built from the real student data)
========================================= */

function buildOperatorReport(student, academics, grade, result, scholarship) {

    // ---- Arithmetic operators ----
    let arithmetic = [
        "+ &rarr; total marks: " +
            student.marks.assignment + " + " +
            student.marks.midterm + " + " +
            student.marks.finalExam + " = " +
            academics.obtainedMarks,

        "- &rarr; marks lost: " +
            academics.maximumMarks + " - " +
            academics.obtainedMarks + " = " +
            academics.marksLost,

        "/ and * &rarr; percentage: (" +
            academics.obtainedMarks + " / " +
            academics.maximumMarks + ") * 100 = " +
            academics.percentage.toFixed(2) + "%",

        "/ &rarr; average per component: " +
            academics.obtainedMarks + " / 3 = " +
            academics.averageComponentMarks.toFixed(2),

        "% &rarr; marks above the last full ten: " +
            academics.obtainedMarks + " % 10 = " +
            academics.marksAboveLastFullTen
    ];

    // ---- Comparison operators ----
    let comparison = [
        "&gt; &rarr; above class average (" +
            CLASS_AVERAGE_PERCENTAGE + "%): " +
            (academics.percentage > CLASS_AVERAGE_PERCENTAGE),

        "&lt; &rarr; attendance short of " +
            SILVER_ATTENDANCE + "%: " +
            (student.attendance < SILVER_ATTENDANCE),

        "&gt;= &rarr; percentage &gt;= pass mark (" +
            PASS_PERCENTAGE + "%): " +
            (academics.percentage >= PASS_PERCENTAGE),

        "&lt;= &rarr; CGPA &lt;= critical level (" +
            CRITICAL_CGPA + "): " +
            (student.cgpa <= CRITICAL_CGPA),

        "=== &rarr; grade is exactly \"A\": " +
            (grade === "A"),

        "!== &rarr; result is not \"Failed\": " +
            (result !== "Failed")
    ];

    // ---- Logical operators ----
    let logical = [
        "&amp;&amp; &rarr; Gold criteria (CGPA and attendance " +
            "and percentage): " + scholarship.meetsGoldCriteria,

        "&amp;&amp; &rarr; Silver criteria (CGPA and attendance " +
            "and percentage): " + scholarship.meetsSilverCriteria,

        "|| &rarr; disqualified (not passing or low " +
            "attendance): " + scholarship.isDisqualified,

        "! &rarr; not passing: " + (!scholarship.isPassing)
    ];

    return {
        arithmetic: arithmetic,
        comparison: comparison,
        logical: logical
    };

}


/* =========================================
   OUTPUT HELPERS
========================================= */

// Turns an array of strings into list items
function buildListItems(lines) {

    let html = "";

    for (let index = 0; index < lines.length; index = index + 1) {

        html = html + "<li>" + lines[index] + "</li>";

    }

    return html;

}


// Pads a label so the plain-text report lines up
function padLabel(label) {

    let padded = label;

    while (padded.length < 20) {

        padded = padded + " ";

    }

    return padded;

}


// CSS class for each status value
function badgeModifier(status) {

    let modifier;

    if (status === "Gold Scholarship") {

        modifier = "badge-gold";

    }
    else if (status === "Silver Scholarship") {

        modifier = "badge-silver";

    }
    else if (status === "Good Standing") {

        modifier = "badge-good";

    }
    else if (status === "Academic Warning") {

        modifier = "badge-warning";

    }
    else if (status === "Critical") {

        modifier = "badge-critical";

    }
    else {

        modifier = "badge-none";

    }

    return modifier;

}


/* =========================================
   DISPLAY THE STUDENT ON THE WEBPAGE
   (every value comes from the student object)
========================================= */

function renderStudent(scenarioIndex) {

    let student = studentRecords[scenarioIndex];

    let academics = calculateAcademics(student);
    let grade = calculateGrade(academics.percentage);
    let result = calculateResult(academics.percentage);
    let scholarship = calculateScholarship(student, academics.percentage);
    let academicStatus = calculateAcademicStatus(student, academics.percentage);
    let operators = buildOperatorReport(
        student, academics, grade, result, scholarship
    );

    let percentageText = academics.percentage.toFixed(2) + "%";


    // ---- Student academic profile ----
    document.getElementById("studentProfile").innerHTML =

        "<div class='data-row'><dt>Name</dt><dd>" +
        student.name + "</dd></div>" +

        "<div class='data-row'><dt>Registration No</dt><dd>" +
        student.registrationNo + "</dd></div>" +

        "<div class='data-row'><dt>Program</dt><dd>" +
        student.program + "</dd></div>" +

        "<div class='data-row'><dt>Semester</dt><dd>" +
        student.semester + "</dd></div>" +

        "<div class='data-row'><dt>CGPA</dt><dd>" +
        student.cgpa.toFixed(2) + " / 4.00</dd></div>" +

        "<div class='data-row'><dt>Attendance</dt><dd>" +
        student.attendance + "%</dd></div>";


    // ---- Marks table ----
    document.getElementById("marksTableBody").innerHTML =

        "<tr><td>Assignment</td><td>" +
        student.marks.assignment + "</td><td>" +
        ASSIGNMENT_MAX + "</td></tr>" +

        "<tr><td>Midterm</td><td>" +
        student.marks.midterm + "</td><td>" +
        MIDTERM_MAX + "</td></tr>" +

        "<tr><td>Final Exam</td><td>" +
        student.marks.finalExam + "</td><td>" +
        FINAL_EXAM_MAX + "</td></tr>";

    document.getElementById("marksTableFoot").innerHTML =

        "<tr><th scope='row'>Total</th><td>" +
        academics.obtainedMarks + "</td><td>" +
        academics.maximumMarks + "</td></tr>";


    // ---- Percentage, grade, pass/fail ----
    document.getElementById("resultStrip").innerHTML =

        "<div class='result-item'><span class='result-label'>" +
        "Percentage</span><span class='result-value'>" +
        percentageText + "</span></div>" +

        "<div class='result-item'><span class='result-label'>" +
        "Grade</span><span class='result-value'>" +
        grade + "</span></div>" +

        "<div class='result-item'><span class='result-label'>" +
        "Result</span><span class='result-value result-" +
        result.toLowerCase() + "'>" +
        result + "</span></div>";


    // ---- Scholarship status ----
    document.getElementById("scholarshipBadge").className =
        "status-badge " + badgeModifier(scholarship.status);

    document.getElementById("scholarshipBadge").textContent =
        scholarship.status;


    // ---- Academic status ----
    document.getElementById("academicBadge").className =
        "status-badge " + badgeModifier(academicStatus);

    document.getElementById("academicBadge").textContent =
        academicStatus;


    // ---- Operators ----
    document.getElementById("arithmeticOutput").innerHTML =
        buildListItems(operators.arithmetic);

    document.getElementById("comparisonOutput").innerHTML =
        buildListItems(operators.comparison);

    document.getElementById("logicalOutput").innerHTML =
        buildListItems(operators.logical);


    // ---- Final academic report ----
    document.getElementById("reportOutput").textContent =

        "================================\n" +
        "     STUDENT ACADEMIC REPORT\n" +
        "================================\n\n" +

        padLabel("Student Name:") + student.name + "\n" +
        padLabel("Registration No:") + student.registrationNo + "\n" +
        padLabel("Program:") + student.program + "\n" +
        padLabel("Semester:") + student.semester + "\n\n" +

        padLabel("CGPA:") + student.cgpa.toFixed(2) + "\n" +
        padLabel("Attendance:") + student.attendance + "%\n\n" +

        padLabel("Assignment Marks:") + student.marks.assignment +
        " / " + ASSIGNMENT_MAX + "\n" +
        padLabel("Midterm Marks:") + student.marks.midterm +
        " / " + MIDTERM_MAX + "\n" +
        padLabel("Final Exam Marks:") + student.marks.finalExam +
        " / " + FINAL_EXAM_MAX + "\n\n" +

        padLabel("Total Marks:") + academics.obtainedMarks +
        " / " + academics.maximumMarks + "\n" +
        padLabel("Percentage:") + percentageText + "\n" +
        padLabel("Grade:") + grade + "\n" +
        padLabel("Result:") + result + "\n" +
        padLabel("Academic Status:") + academicStatus + "\n" +
        padLabel("Scholarship Status:") + scholarship.status + "\n\n" +

        "================================";

}


/* =========================================
   HOISTING OUTPUT ON THE PAGE
========================================= */

document.getElementById("hoistingOutput").textContent =

    "console.log(hoistedCourseCode);   // " + undefined + "\n" +
    "var hoistedCourseCode = \"" + hoistedCourseCode + "\";\n" +
    "console.log(hoistedCourseCode);   // \"" +
    hoistedCourseCode + "\"\n\n" +

    "console.log(letCourseCode);       // ReferenceError\n" +
    "let letCourseCode = \"" + letCourseCode + "\";\n\n" +

    "Caught error message:\n" + hoistingErrorMessage + "\n\n" +

    "var  -> hoisted AND initialised to undefined\n" +
    "let  -> hoisted but left uninitialised (TDZ)";


/* =========================================
   RUN THE APPLICATION

   TESTING: change this to 0, 1, 2 or 3
   0 = high performing   1 = average
   2 = low attendance    3 = poor performance
========================================= */

let activeScenario = 0;

renderStudent(activeScenario);
