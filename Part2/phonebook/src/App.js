import React, { useState, useEffect } from "react";
import axios from 'axios'

const Filter = ({ inputControlState, changeHandler }) => {
  return (
    <div>
      filter shown with:{" "}
      <input value={inputControlState} onChange={changeHandler} />
    </div>
  );
};

const PersonForm = ({ submitHandler, inputControlState, changeHandler }) => {
  return (
    <form onSubmit={submitHandler}>
      <div>
        name: <input value={inputControlState[0]} onChange={changeHandler[0]} />
      </div>
      <div>
        number:{" "}
        <input value={inputControlState[1]} onChange={changeHandler[1]} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const People = ({ persons, personsState }) => {
  // Filters out contacts based on the user input controlled by newFilter state
  const peopleToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(personsState.toLowerCase())
  );

  return (
    <ul>
      {peopleToShow.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])
  
  console.log('render', persons.length, 'persons')

  const addContact = (e) => {
    e.preventDefault();

    if (persons.find((o) => o.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const contactObject = {
        name: newName,
        number: newNumber,
        date: new Date().toISOString(),
        id: persons.length + 1,
      };

      setPersons(persons.concat(contactObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumChange = (e) => {
    console.log(newNumber);
    setNewNumber(e.target.value);
  };

  const handleFilter = (e) => {
    setNewFilter(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter inputControlState={newFilter} changeHandler={handleFilter} />

      <h2>add a new</h2>
      <PersonForm
        submitHandler={addContact}
        inputControlState={[newName, newNumber]}
        changeHandler={[handleNameChange, handleNumChange]}
      />

      <h2>Numbers</h2>
      <People persons={persons} personsState={newFilter} />
    </div>
  );
};

export default App;
