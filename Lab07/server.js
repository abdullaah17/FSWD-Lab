const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());

const DATA_FILE = "students.json";
let students = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

// Part F: persist changes back to students.json
function saveStudents() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(students, null, 2), "utf8");
}

// Task 4: shared validation for POST and PUT
function isValidStudent(body) {
    const { name, department } = body || {};
    return typeof name === "string" && name.trim() !== "" &&
        typeof department === "string" && department.trim() !== "";
}

// GET: retrieve all students
app.get("/students", (req, res) => {
    res.status(200).json(students);
});

// Task 3: filter by department
app.get("/students/department/:department", (req, res) => {
    const department = req.params.department.toLowerCase();
    const result = students.filter(
        item => item.department.toLowerCase() === department
    );

    return res.status(200).json(result);
});

// GET: retrieve one student by ID
app.get("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const student = students.find(item => item.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json(student);
});

// POST: create a student
app.post("/students", (req, res) => {
    if (!isValidStudent(req.body)) {
        return res.status(400).json({
            message: "name and department are required as non-empty strings"
        });
    }

    const { name, department } = req.body;

    const newId = students.length
        ? Math.max(...students.map(item => item.id)) + 1
        : 1;

    const newStudent = {
        id: newId,
        name: name.trim(),
        department: department.trim()
    };

    students.push(newStudent);
    saveStudents();
    return res.status(201).json(newStudent);
});

// PUT: update a student's name and department
app.put("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const student = students.find(item => item.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    if (!isValidStudent(req.body)) {
        return res.status(400).json({
            message: "name and department are required as non-empty strings"
        });
    }

    student.name = req.body.name.trim();
    student.department = req.body.department.trim();
    saveStudents();

    return res.status(200).json(student);
});

// DELETE: remove a student
app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = students.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    const [deletedStudent] = students.splice(index, 1);
    saveStudents();

    return res.status(200).json({
        message: "Student deleted successfully",
        student: deletedStudent
    });
});

// Unknown routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Malformed JSON bodies and unexpected errors
app.use((err, req, res, next) => {
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({ message: "Request body is not valid JSON" });
    }
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
