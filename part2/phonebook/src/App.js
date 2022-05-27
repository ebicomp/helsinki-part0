import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Person from "./components/Person";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");


  useEffect(()=>{
    personsService
    .getAll()
    .then(initialPersons => setPersons(initialPersons));
  } , []);

  const RemovePerson = id =>{
    const personToDelete = persons.find(p=>p.id === id);
    console.log(personToDelete.name);
    if (!window.confirm(`Delete ${personToDelete.name}`)) {
      return;
    }
    personsService
    .remove(id)
    .then(Response => {
      setPersons(persons.filter(person => person.id !== id))
    })
  }


  const addPerson = (event) => {
    event.preventDefault();

    if (persons.filter((p) => p.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPersonObj = {
      name: newName,
      number: newNumber,
      id:persons.length + 1
    };
    

    personsService.create(newPersonObj)
    .then(returnedPerson => {
      setPersons(persons.concat(newPersonObj));
      setNewName('');
      setNewNumber('');
    });
  };
  const newNameChangeHandler = (event) => {
    setNewName(event.target.value);
  };
  const newNumberChageHandler = (event) => {
    setNewNumber(event.target.value);
  };
  const filterChangeHandler = (event) => {
    setFilter(event.target.value);
  };
  const filteredData = filter
    ? persons.filter((p) => p.name.toLowerCase() === filter.toLowerCase())
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterChangeHandler={filterChangeHandler} filter={filter} />
      <h3>Add a new </h3>
      <PersonForm
        addPerson={addPerson}
        newNameChangeHandler={newNameChangeHandler}
        newNumberChageHandler={newNumberChageHandler}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      { filteredData.map(person=> < Person key={person.id} person ={person} RemovePerson={() => RemovePerson(person.id)} />)}
    </div>
  );
};

export default App;
