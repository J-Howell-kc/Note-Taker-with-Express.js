const express = require("express");
const path = require("path");
const fs = require("fs");
const uniqId = require("uniqid");
const PORT = process.env.port || 3001;

const app = express();



// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static("public"));

// GET Route for homepage
app.get("/api/notes", (req, res) => {
fs.readFile("./db/db.json", "UTF8", (error,data) => {
  res.send(data)
})
}
)
app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "UTF8", (error,data) => {
    const notes = JSON.parse(data);
    notes.push({
      id:uniqId(),
      ...req.body
    });
    fs.writeFile("./db/db.json",JSON.stringify(notes), (error, data) => {
      res.send(req.body);
    })
  })
  }
  )

  app.delete("/api/notes/:id", (req, res) => {
    fs.readFile("./db/db.json", "UTF8", (error,data) => {
      const notes = JSON.parse(data);
      const filteredNotes = notes.filter(note => note.id !== req.params.id)
      fs.writeFile("./db/db.json",JSON.stringify(filteredNotes), (error, data) => {
        res.send(req.body);
      })
    })
    }
    )

// GET Route for feedback page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
