console.log("Hello from Node.js!");

// Section 4: math module
const math = require("./math");

console.log("Addition:", math.add(10, 5));
console.log("Subtraction:", math.subtract(10, 5));
console.log("Multiplication:", math.multiply(10, 5));
console.log("Division:", math.divide(10, 5));

// Task 1: calculator module
const calculator = require("./calculator");

console.log("\nCalculator module:");
console.log("12 + 4 =", calculator.add(12, 4));
console.log("12 - 4 =", calculator.subtract(12, 4));
console.log("12 * 4 =", calculator.multiply(12, 4));
console.log("12 / 4 =", calculator.divide(12, 4));

try {
    calculator.divide(12, 0);
} catch (error) {
    console.log("12 / 0 =", error.message);
}
