import React, { useState, useEffect } from "react";
import peopleService from "./services/people";

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

const People = ({ people, peopleState, handleDeleteContact }) => {
  // Filters out contacts based on the user input controlled by newFilter state
  const peopleToShow = people.filter((person) =>
    person.name.toLowerCase().includes(peopleState.toLowerCase())
  );

  return (
    <ul>
      {peopleToShow.map((person) => (
        <li key={person.id}>
          {person.name} {person.number} <DeleteContact id={person.id} handleDeleteContact={handleDeleteContact} contactName={person.name} />
        </li>
      ))}
    </ul>
  );
};

const DeleteContact = ({id, handleDeleteContact, contactName}) => {
  return (
    <button onClick={() => handleDeleteContact(id, contactName)}>delete</button>
  )
}

const App = () => {
  const [people, setPeople] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    peopleService
      .getAll()
      .then(initialPeople => {
        setPeople(initialPeople)
      })
  }, [])
  
  // console.log('render', people.length, 'people')

  const addContact = (e) => {
    e.preventDefault();
    const existingPerson = people.find((o) => (o.name === newName && o.number === newNumber))
    const sameNamePerson = people.find((o) => (o.name === newName))

    if (existingPerson) {
      alert(`${newName} is already added to phonebook`);
    } else if (sameNamePerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {...sameNamePerson, number: newNumber}
        peopleService
          .update(updatedPerson.id, updatedPerson)
          .then(response => {
            console.log('axios response:', response.data)
            // Update the state to show the updated contact details on the frontend.
            // If person id from state matches updated contact id, use the data from backend instead of
            // the person state from frontend
            setPeople(people.map(person => (person.id !== updatedPerson.id)  ? person : response.data))
            setNewName("");
            setNewNumber("");
          })
      }
    } else {
      const contactObject = {
        name: newName,
        number: newNumber,
        date: new Date().toISOString(),
      };

      peopleService
        .create(contactObject)
        .then(returnedContact => {
          setPeople(people.concat(returnedContact))
          setNewName("");
          setNewNumber("");
        })
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

  const handleDeleteContact = (id, contactName) => {
    if (window.confirm(`Delete ${contactName}?`)) {
      peopleService
        .deleteContact(id)
      // Update the state to filter out the deleted contact from the Frontend
      setPeople(people.filter(person => person.id !== id))
    }
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
      <People people={people} peopleState={newFilter} handleDeleteContact={handleDeleteContact} />
    </div>
  );
};

export default App;
