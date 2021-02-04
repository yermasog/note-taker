//Dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");

//Sets up the Express app
var app = express();
var PORT = process.env.PORT || 3035;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
//notes DATA
var notes = []

//Routes
// * GET `/notes` - Should return the `notes.html` file.
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

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
    let newNote = req.body;
    let data = fs.readFileSync("db/db.json");
    let notes = JSON.parse(data);
    notes.push(newNote)
    fs.writeFile("db/db.json", JSON.stringify(notes), function (error) {
        if (error) {
            throw error
        }
        console.log("hell yeah");
    })

    res.json(newNote);
});

// * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
//when someone wants to delete - go to this link and do this function
app.delete("/api/notes/:id", function (req, res) {
    //read the data in this file (which is a string)
    let dataString = fs.readFileSync("db/db.json");
    //give me back the data in an array
    let notes = JSON.parse(dataString);
    //delete note is the id of what was clicked which is found in the request parameters
    let deleteNote = req.params.id;
    //filter through the notes array for the objects that are NOT deletenote and return them
    let newArray = notes.filter(note => note.id != deleteNote)
    //   console.log(newArray);
    //   console.log(deleteNote);
    //write the new array without the object that I deleted to my file
    fs.writeFile("db/db.json", JSON.stringify(newArray), function (error) {
        if (error) {
            throw error
        }
        console.log("hell yeah");
    })
    //ends the request 
    res.json(newArray)
})



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT);
});
