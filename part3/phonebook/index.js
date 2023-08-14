const http = require("http");
const express = require("express");
const { log } = require("console");
const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (req, res) => {
  res.send(
    "<p>Phonebook has info for " +
      persons.length +
      " people</p>" +
      "<p>" +
      new Date() +
      "</p>"
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const note = persons.find((p) => p.id === Number(id));
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((note) => note.id !== id);

  res.status(204).end();
});

const generateId = () => {
  return Math.floor(Math.random() * 10000000000000000);
};

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number missing",
    });
  }
  if (persons.find((p) => p.name == body.name)) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    ...body,
    id: generateId(),
  };

  persons = persons.concat(person);

  res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
