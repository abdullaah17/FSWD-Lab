// Task 2: read employees.json, display, add one employee, write back
const fs = require("fs");

const FILE = "employees.json";

const employees = JSON.parse(fs.readFileSync(FILE, "utf8"));

console.log("Current employees:");
employees.forEach(emp => {
    console.log(`${emp.id}. ${emp.name} - ${emp.position} (Rs. ${emp.salary})`);
});

// Generate a unique ID so running the script twice does not duplicate IDs
const newId = employees.length
    ? Math.max(...employees.map(emp => emp.id)) + 1
    : 1;

const newEmployee = {
    id: newId,
    name: "Zainab Malik",
    position: "Data Analyst",
    salary: 110000
};

employees.push(newEmployee);

fs.writeFileSync(FILE, JSON.stringify(employees, null, 2), "utf8");

console.log(`\nAdded: ${newEmployee.name} (id ${newEmployee.id})`);
console.log("Total employees:", employees.length);
