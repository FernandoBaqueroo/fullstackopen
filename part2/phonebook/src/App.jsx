import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import persons_services from "./services/persons_services";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [stateMessage, setStateMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    persons_services.getAll().then((response) => {
      if (response && response.data) {
        setPersons(response.data);
        setFilteredPersons(response.data);
      } else {
        console.error("No data found in the response");
      }
    });
  };

  const addPersonalData = (event) => {
    event.preventDefault();

    const personExists = persons.find((person) => person.name === newName);
    if (personExists) {
      if (window.confirm(`${newName} is already in the phonebook. Replace the old number with a new one?`)) {
        updatePerson(personExists, { ...personExists, number: newNumber });
      }
    } else {
      const dataObject = {
        name: newName, number: newNumber
      }
      createPerson(dataObject);
    }
  };

  const createPerson = (dataObject) => {
    persons_services.create(dataObject)
      .then((response) => {
        setPersons(persons.concat(response.data));
        setFilteredPersons(persons.concat(response.data));
        showMessage(`Added ${dataObject.name}`, "success");
        resetInputs();
      })
      .catch(() => showMessage("Failed to add the person.", "error"));
  };

  const updatePerson = (personToUpdate, updatedPerson) => {
    persons_services.update(personToUpdate.id, updatedPerson)
      .then((response) => {
        setPersons(persons.map((person) => (person.id !== personToUpdate.id ? person : response.data)));
        setFilteredPersons(filteredPersons.map((person) => (person.id !== personToUpdate.id ? person : response.data)));
        showMessage(`Updated ${updatedPerson.name}'s number to ${updatedPerson.number}`, "success");
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          showMessage(`Information of ${updatedPerson.name} has already been removed from the server.`, "error");
        } else {
          showMessage("Failed to update the person.", "error");
        }
        resetInputs();
        fetchData();
      });
  };

  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (!personToDelete) return console.error("Person not found");

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      persons_services.remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setFilteredPersons(filteredPersons.filter((person) => person.id !== id));
          showMessage(`Deleted ${personToDelete.name}`, "success");
        })
        .catch(() => showMessage("Failed to delete the person.", "error"));
    }s
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterNames = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchName(searchValue);
    setFilteredPersons(persons.filter((person) => person.name.toLowerCase().includes(searchValue)));
  };
  
  const resetInputs = () => {
    setNewName("");
    setNewNumber("");
  };

  const showMessage = (message, type) => {
    setStateMessage(message);
    setMessageType(type);
    setTimeout(() => setStateMessage(null), 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={stateMessage} messageType={messageType} />
      <Filter searchName={searchName} handleFilterNames={handleFilterNames} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPersonalData={addPersonalData}
      />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;