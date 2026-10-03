// Lab 05 - ES6 Features, Modules, Callbacks, Promises and Async/Await

// default import + named imports + one alias (as)
import formatStudentResult, {
  DEPARTMENT_NAME,
  calculateTotal,
  calculateAverage,
  getGrade,
  getStatus as getPassStatus
} from "./studentUtils.js";


/* =========================================
   TASK 1 - Course Enrollment Manager
   (spread, rest, default parameters)
========================================= */

const coreCourses = ["Web Development", "Database Systems", "Data Structures"];
const electiveCourses = ["Artificial Intelligence", "Computer Networks", "Cloud Computing"];

const student = { name: "Abdullah", rollNumber: "BSCS-001", department: "Computer Science", semester: 6 };
const cgpaList = [3.45, 2.9, 3.75, 2.6, 2.9];

// spread merges both arrays into a new one
const allCourses = [...coreCourses, ...electiveCourses];

// spread makes a copy, so pushing to the copy does not touch allCourses
const coursesCopy = [...allCourses];
coursesCopy.push("Software Engineering");

// spread copies the object, then we override semester and add cgpa
const updatedStudent = { ...student, semester: 7, cgpa: 3.45 };

// rest parameter: all courses after the name come in as an array
function enrollStudent(name, ...courses) {
  return `${name} enrolled in ${courses.length} course(s): ${courses.join(", ")}`;
}

// rest parameter + arrow function
const calculateAverageCGPA = (...cgpas) => cgpas.reduce((sum, cgpa) => sum + cgpa, 0) / cgpas.length;

// spread turns the array into separate arguments for Math.max
const highestCGPA = Math.max(...cgpaList);

// default parameter is used when department is not passed
function getStudentInfo(name, department = "Computer Science") {
  return `${name} - Department (default): ${department}`;
}

document.getElementById("task1Output").innerHTML = `
  <p><strong>Core Courses:</strong> ${coreCourses.join(", ")}</p>
  <p><strong>Elective Courses:</strong> ${electiveCourses.join(", ")}</p>
  <hr>
  <p><strong>All Courses (${allCourses.length}):</strong> ${allCourses.join(", ")}</p>
  <p><strong>Copy after adding a course (${coursesCopy.length}):</strong> ${coursesCopy.join(", ")}</p>
  <p class="text-success">Original still has ${allCourses.length} courses</p>
  <hr>
  <p><strong>Original Student:</strong> ${student.name}, Semester ${student.semester}</p>
  <p><strong>Updated Student:</strong> ${updatedStudent.name}, Semester ${updatedStudent.semester}, CGPA ${updatedStudent.cgpa}</p>
  <hr>
  <p>${enrollStudent(student.name, "Web Development", "Database Systems", "Artificial Intelligence")}</p>
  <p><strong>Average CGPA:</strong> ${calculateAverageCGPA(...cgpaList).toFixed(2)}</p>
  <p><strong>Highest CGPA:</strong> ${highestCGPA}</p>
  <p class="mb-0">${getStudentInfo(student.name)}</p>`;


/* =========================================
   TASK 2 - Student Utility Module
   (named, default and aliased imports)
========================================= */

const task2Students = [
  { name: "Sara", rollNumber: "BSCS-023", assignment: 18, midterm: 24, finalExam: 40 },
  { name: "Ahmed", rollNumber: "BSCS-002", assignment: 15, midterm: 20, finalExam: 32 },
  { name: "Ayesha", rollNumber: "BSCS-014", assignment: 10, midterm: 14, finalExam: 24 },
  { name: "Hassan", rollNumber: "BSCS-031", assignment: 17, midterm: 22, finalExam: 36 }
];

document.getElementById("task2Department").textContent = `Department: ${DEPARTMENT_NAME}`;

const task2Cards = document.getElementById("task2Cards");

task2Students.forEach((s) => {
  // object destructuring
  const { name, rollNumber, assignment, midterm, finalExam } = s;

  const total = calculateTotal(assignment, midterm, finalExam);
  const average = calculateAverage(assignment, midterm, finalExam);
  const status = getPassStatus(total); // aliased import

  task2Cards.innerHTML += `
    <div class="col-md-6 col-lg-3">
      <div class="card p-3 h-100">
        <h6>${formatStudentResult(name, rollNumber, total)}</h6>
        Average: ${average.toFixed(2)}<br>
        Grade: ${getGrade(total)}<br>
        Status: <span class="${status === "Pass" ? "text-success" : "text-danger"}">${status}</span>
      </div>
    </div>`;
});


/* =========================================
   TASK 3 - Online Examination Workflow
   (callbacks, nested callbacks, error-first)
========================================= */

// adds one line to an output box
function addLine(boxId, text, className = "") {
  const line = document.createElement("div");
  line.className = className;
  line.textContent = text;
  document.getElementById(boxId).appendChild(line);
}

// seconds passed since start, used to show the delays
const secondsSince = (start) => ((Date.now() - start) / 1000).toFixed(1);

function verifyStudent(roll, callback) {
  setTimeout(() => callback(`Student ${roll} verified`), 1000);
}

function loadExamPaper(callback) {
  setTimeout(() => callback("Exam paper loaded"), 1500);
}

function submitAnswers(callback) {
  setTimeout(() => callback("Answers submitted"), 2000);
}

function generateResult(callback) {
  setTimeout(() => callback("Result generated: 82 marks"), 1000);
}

// Part A - nested callbacks
function runExamPartA() {
  const box = "task3PartA";
  const start = Date.now();
  document.getElementById(box).innerHTML = "";

  /*
    CALLBACK HELL: every step has to go inside the callback of the
    previous step, so the code keeps moving to the right like a pyramid.
    With more steps (and error checks at each level) it becomes hard
    to read, debug and maintain.
  */
  verifyStudent("BSCS-001", (msg1) => {
    addLine(box, `Step 1: ${msg1}  (after ${secondsSince(start)}s)`);
    loadExamPaper((msg2) => {
      addLine(box, `Step 2: ${msg2}  (after ${secondsSince(start)}s)`);
      submitAnswers((msg3) => {
        addLine(box, `Step 3: ${msg3}  (after ${secondsSince(start)}s)`);
        generateResult((msg4) => {
          addLine(box, `Step 4: ${msg4}  (after ${secondsSince(start)}s)`);
          addLine(box, "Exam completed successfully!", "text-success fw-bold");
        });
      });
    });
  });

  // this line runs before any step finishes -> proves the code is asynchronous
  addLine(box, "Exam workflow started...", "text-primary");
}

// Part B - error-first callback: callback(error, data)
function verifyStudentSafe(roll, callback) {
  setTimeout(() => {
    if (roll.trim() === "") {
      callback("Roll number is required", null);
    } else {
      callback(null, `Student ${roll} verified`);
    }
  }, 1000);
}

function runExamPartB(roll, box) {
  const start = Date.now();
  document.getElementById(box).innerHTML = "";

  verifyStudentSafe(roll, (error, msg1) => {
    // if verification fails, stop here so the other steps never run
    if (error) {
      addLine(box, `Error: ${error}`, "text-danger fw-bold");
      return;
    }
    addLine(box, `Step 1: ${msg1}  (after ${secondsSince(start)}s)`);
    loadExamPaper((msg2) => {
      addLine(box, `Step 2: ${msg2}  (after ${secondsSince(start)}s)`);
      submitAnswers((msg3) => {
        addLine(box, `Step 3: ${msg3}  (after ${secondsSince(start)}s)`);
        generateResult((msg4) => {
          addLine(box, `Step 4: ${msg4}  (after ${secondsSince(start)}s)`);
          addLine(box, "Exam completed successfully!", "text-success fw-bold");
        });
      });
    });
  });

  addLine(box, "Exam workflow started...", "text-primary");
}

document.getElementById("runPartA").addEventListener("click", runExamPartA);
document.getElementById("runValid").addEventListener("click", () => runExamPartB("BSCS-001", "task3Valid"));
document.getElementById("runEmpty").addEventListener("click", () => runExamPartB("", "task3Empty"));


/* =========================================
   TASK 4 - University Result Portal
   (promises, async/await, Promise.all)
========================================= */

// simulated database
const database = [
  { name: "Ali", rollNumber: "BSCS-001", department: "Computer Science", semester: 6, assignment: 20, midterm: 22, finalExam: 40 },
  { name: "Ahmed", rollNumber: "BSCS-002", department: "Computer Science", semester: 5, assignment: 15, midterm: 20, finalExam: 32 },
  { name: "Sara", rollNumber: "BSCS-023", department: "Computer Science", semester: 4, assignment: 18, midterm: 24, finalExam: 40 },
  { name: "Ayesha", rollNumber: "BSCS-014", department: "Computer Science", semester: 3, assignment: 10, midterm: 14, finalExam: 24 },
  { name: "Hassan", rollNumber: "BSCS-031", department: "Computer Science", semester: 7, assignment: 17, midterm: 22, finalExam: 36 }
];

// promise: resolve with the student or reject if not found
function findStudent(rollNumber) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const found = database.find((s) => s.rollNumber === rollNumber.trim().toUpperCase());
      found ? resolve(found) : reject("Student not found");
    }, 1000);
  });
}

// promise: resolve with the calculated result
function calculateResult(student) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // object destructuring
      const { assignment, midterm, finalExam } = student;
      const marks = [assignment, midterm, finalExam];

      const total = calculateTotal(...marks); // spread
      const average = total / marks.length;

      resolve({
        ...student, // spread keeps the student details in the result
        total,
        average,
        grade: getGrade(total),
        status: getPassStatus(total) // arrow function + ternary from the module
      });
    }, 1000);
  });
}

// full card used by Part A, B and C
function resultCard({ name, rollNumber, department, semester, total, average, grade, status }) {
  return `
    <div class="card p-3 my-2">
      <h6>Student: ${name}</h6>
      Roll No: ${rollNumber}<br>
      Department: ${department}<br>
      Semester: ${semester}<br>
      Total: ${total}<br>
      Average: ${average.toFixed(2)}<br>
      Grade: ${grade}<br>
      Status: <span class="${status === "Pass" ? "text-success" : "text-danger"}">${status}</span>
    </div>`;
}

const errorLine = (message) => `<div class="text-danger fw-bold">Error: ${message}</div>`;

// Part A - promise chain with then / catch / finally
function searchWithPromiseChain(rollNumber) {
  const box = document.getElementById("task4PartA");
  box.innerHTML = `<div class="text-primary">Searching...</div>`;

  findStudent(rollNumber)
    .then((student) => calculateResult(student))
    .then((result) => {
      box.innerHTML += resultCard(result);
    })
    .catch((error) => {
      box.innerHTML += errorLine(error);
    })
    .finally(() => {
      box.innerHTML += `<div class="text-muted">Search completed</div>`;
    });
}

searchWithPromiseChain("BSCS-001");

// Part B - same work with async / await
async function showResult(rollNumber) {
  const box = document.getElementById("searchResult");
  const button = document.getElementById("searchBtn");
  button.disabled = true; // stop double clicks while loading
  box.innerHTML = `<div class="text-primary">Searching...</div>`;

  try {
    const student = await findStudent(rollNumber);
    const result = await calculateResult(student);
    box.innerHTML += resultCard(result);
  } catch (error) {
    box.innerHTML += errorLine(error);
  } finally {
    box.innerHTML += `<div class="text-muted">Search completed</div>`;
    button.disabled = false;
  }
}

// Part C - search form
document.getElementById("searchForm").addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading
  showResult(document.getElementById("rollInput").value);
});

// Part D - load all results at the same time with Promise.all
async function loadAllResults() {
  const box = document.getElementById("allResults");
  const stats = document.getElementById("allStats");
  const button = document.getElementById("loadAllBtn");
  button.disabled = true;
  box.innerHTML = `<div class="text-primary">Loading all results...</div>`;
  stats.innerHTML = "";

  try {
    // map gives an array of promises, Promise.all waits for all of them
    const results = await Promise.all(database.map((s) => calculateResult(s)));

    box.innerHTML = results.map(({ name, rollNumber, grade, status }) => `
      <div class="col-md-6 col-lg-4">
        <div class="card p-3 h-100">
          <h6>Student: ${name}</h6>
          Roll No: ${rollNumber}<br>
          Grade: ${grade}<br>
          Status: <span class="${status === "Pass" ? "text-success" : "text-danger"}">${status}</span>
        </div>
      </div>`).join("");

    const passed = results.filter((r) => r.status === "Pass").length;
    stats.innerHTML = `
      <h6>Final Statistics</h6>
      Total Students: ${results.length}<br>
      Passed Students: ${passed}<br>
      Failed Students: ${results.length - passed}`;
  } catch (error) {
    box.innerHTML = errorLine(error);
  } finally {
    button.disabled = false;
  }
}

document.getElementById("loadAllBtn").addEventListener("click", loadAllResults);
