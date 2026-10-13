# Lab 07: Node.js Modules, File Handling, REST APIs & Postman

## Setup
    npm install

## Parts A and B (modules and files)
| File | Run | What it shows |
|------|-----|---------------|
| app.js, math.js, calculator.js | `node app.js` | Modules + Task 1 (calculator with divide-by-zero check) |
| write.js / read.js | `node write.js` then `node read.js` | Write/read students.txt |
| readJson.js / writeJson.js | `node readJson.js`, `node writeJson.js` | Parse JSON, append a student (adds a record each run) |
| employees.js | `node employees.js` | Task 2: read, display, add, save employees.json |

## Student API (Parts D–F, Tasks 3–4)
    node server.js          # http://localhost:3000
GET/POST `/students`, GET/PUT/DELETE `/students/:id`, GET `/students/department/:department`.
Validation returns 400; unknown IDs return 404. Changes are saved to students.json.

## Assignment: Book API
    node book-api/server.js # http://localhost:3001
GET/POST `/books`, GET/PUT/DELETE `/books/:id`. Validates title, author (non-empty strings)
and price (non-negative number). Changes are saved to books.json (additional credit).

## Postman
Import `Lab07.postman_collection.json`, start both servers, and run the requests in order
(POST creates id 4 / id 5, which the PUT and DELETE requests use).
