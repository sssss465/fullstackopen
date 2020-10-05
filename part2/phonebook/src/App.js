import React, { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";

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
const Persons = ({ persons, search, setPersons }) => {
  const removePerson = (person) => {
    const { id, name } = person;
    if (window.confirm(`Delete ${name}`))
      personService
        .remove(id)
        .then((res) => {
          console.log(res, "removed");
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((err) => console.log(err));
  };
  return (
    <ul>
      {persons
        .filter(
          (person) =>
            person.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
        )
        .map((person) => (
          <li key={person.id}>
            {person.name} {person.number}{" "}
            <button onClick={() => removePerson(person)}>delete</button>
          </li>
        ))}
    </ul>
  );
};
const Notification = ({ message }) => {
  if (!message) {
    return null;
  }
  const { message: msg, color } = message;
  const style = {
    color: color,
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={style}>{msg}</div>;
};
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phone, setNewPhone] = useState("");
  const [search, setNewSearch] = useState("");
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((response) => {
      console.log("promise fulfilled", response);
      setPersons(response);
    });
  }, []);

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
      number: phone,
      id: persons.length + 1,
    };
    const dup = persons.find((person) => person.name === newname.name);
    if (dup) {
      // alert(`${newname.name} is already added to the phonebook`);
      if (
        window.confirm(
          `${dup.name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(dup.id, { ...dup, number: phone })
          .then((res) => {
            console.log(res, "updated");
            setPersons(
              persons
                .filter((p) => p.id !== dup.id)
                .concat({ ...dup, number: phone })
            );
            setNewName("");
            setNewPhone("");
          })
          .catch((e) => {
            setSuccess({
              message: `Information of  ${dup.name} has already been removed from the server`,
              color: "red",
            });
            setTimeout(() => setSuccess(null), 3000);
          });
      }
      return;
    }
    personService
      .create(newname)
      .then((res) => {
        setPersons([...persons, newname]);
        setNewName("");
        setNewPhone("");
        setSuccess({ message: `Added ${newname.name}`, color: "green" });
        setTimeout(() => setSuccess(null), 3000);
        console.log("posted object was", res);
      })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={success} />
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
      <Persons persons={persons} setPersons={setPersons} search={search} />
    </div>
  );
};

export default App;
