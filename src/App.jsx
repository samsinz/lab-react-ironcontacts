import logo from "./logo.svg";
import "./App.css";
import Contacts from "./contacts.json";
import { useLayoutEffect, useState } from "react";

function App() {
  const [contacts, setContacts] = useState(Contacts.slice(4,9));
  const [popularitySorted, setPopularity] = useState(true);
  const [nameSorted, setName] = useState(true);

  function getRandomContact() {
    const remainingContacts = [...Contacts].filter(x => !contacts.includes(x))
    const randomNb = Math.random() * remainingContacts.length;
    const [randomContact] = remainingContacts.slice(randomNb, randomNb+1)
    const copy = [...contacts]
    copy.push(randomContact)
    setContacts(copy)
  }

  function sortPopularity(){
    const copy = [...contacts]
    if (popularitySorted){
      copy.sort((a, b) => a.popularity - b.popularity)
      setPopularity(false)
    } else {
      copy.sort((a, b) => b.popularity - a.popularity)
      setPopularity(true)
    }
    setContacts(copy)
  }

  function sortName(){
    const copy = [...contacts]
    if (nameSorted){
      copy.sort((a,b) => a.name.localeCompare(b.name))
      setName(false)
    } else {
      copy.sort((a,b) => b.name.localeCompare(a.name))
      setName(true)
    }
    setContacts(copy)
  }

  function handleDelete(idToDelete){
    setContacts([...contacts].filter(x => x.id !== idToDelete))
  }

  return (
    <div className="App">
      <h1>IronContacts</h1>

      <button onClick={getRandomContact}>Add Random Contact</button>
      <button onClick={sortPopularity}>Sort by popularity</button>
      <button onClick={sortName}>Sorty by name</button>

      <table>
        <tbody>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>

          </tr>
          {contacts.map((element) => {
            return (
              <tr key={element.id}>
                <td>
                  <img src={element.pictureUrl} alt="" />
                </td>
                <td>
                  <p>{element.name}</p>
                </td>
                <td>
                  <p>{element.popularity.toFixed(2)}</p>
                </td>
                <td>
                  <p>{element.wonOscar && '🏆'}</p>
                </td>
                <td>
                  <p>{element.wonEmmy && '🏆'}</p>
                </td>
                <td>
                  <button onClick={() => handleDelete(element.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
