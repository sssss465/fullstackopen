import React, { useState } from "react";

const Filter = ({ search, changeSearch }) => {
  return <input value={search} onChange={changeSearch}></input>;
};
const PersonForm = ({
  submitHandler,
  newName,
  changeName,
  phone,
  changePhone,
}) => {
  return (
    <form onSubmit={submitHandler}>
      <div>
        name: <input id="yup" value={newName} onChange={changeName} />
      </div>
      <div>
        number: <input value={phone} onChange={changePhone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
const Persons = ({ persons, search }) => {
  return (
    <ul>
      {persons
        .filter((person) => person.name.toLowerCase().indexOf(search) !== -1)
        .map((person) => (
          <li key={person.name}>
            {person.name} {person.phone}
          </li>
        ))}
    </ul>
  );
};
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [phone, setNewPhone] = useState("");
  const [search, setNewSearch] = useState("");

  const changeName = (event) => {
    console.log(event.target, <a href="google.com">google.com</a>);
    setNewName(event.target.value);
  };
  const changePhone = (e) => {
    setNewPhone(e.target.value);
  };
  const changeSearch = (e) => {
    setNewSearch(e.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const newname = {
      name: newName,
      phone: phone,
    };
    const dup = persons.find((person) => person.name === newname.name);
    if (dup) {
      alert(`${newname.name} is already added to the phonebook`);
      return;
    }
    setPersons([...persons, newname]);
    setNewName("");
    setNewPhone("");
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} changeSearch={changeSearch} />
      <h2> add new people</h2>

      <h2>Numbers</h2>
      <PersonForm
        submitHandler={submitHandler}
        newName={newName}
        changeName={changeName}
        phone={phone}
        changePhone={changePhone}
      />
      <Persons persons={persons} search={search} />
    </div>
  );
};

export default App;
