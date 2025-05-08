const express = require('express');

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const getMaxId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(p => p.id))
        : 0
    return maxId;
}

const app = express();
app.use(express.json());

app.get('/', (request, response) => {
    response.send('<h1>Phonebook</h1>');
});

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/api/info', (request, response) => {
    const numPersons = persons.length;
    const currentTime = new Date();
    response.send(
        `
        <p>Phonebook has info for ${numPersons} </p>
        <p>Request time: ${currentTime}</p>
        `
    );
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(p => p.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).end('Person not found');
    }
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(p => p.id === id);

    if (person) {
        persons = persons.filter(p => p.id !== id);
        response.status(200).end(
            `${person.name} was deleted succesfuly!`
        );
    } else {
        response.status(404).end('Person not found'); s
    }
});

app.post('/api/persons/', (request, response) => {
    const newId = getMaxId() + 1;
    const { name, number } = request.body;

    //! 1. Comprobations
    //! If name or number is missing
    if (!name || !number) {
        return response.status(400).json({
            error: 'Name or number is missing'
        });
    }

    //! If names already exists
    if (persons.find(p => p.name.toLowerCase().trim() === name.toLowerCase().trim())) {
        return response.status(400).json({
            error: 'Name must be unique'
        });
    }

    //? 2. Build the object
    const newPerson = {
        id: newId,
        name,
        number,
    }

    //? 3. Post the object to the API
    persons = persons.concat(newPerson);
    response.status(201).json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});