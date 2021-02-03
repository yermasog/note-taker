//Dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");

//Sets up the Express app
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
//notes DATA
var notes = []

//Routes
// * GET `/notes` - Should return the `notes.html` file.
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

//   * GET `*` - Should return the `index.html` file
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});


// * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
// Create New notes - takes in JSON input
app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    notes.push(newNote);
    fs.writeFileSync("db/db.json", notes) {


    }


    // console.log(notes);

    // res.json(newNote);
});


// * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.




// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT);
});
