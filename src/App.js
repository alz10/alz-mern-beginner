import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import './App.css';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [listOfFriends, setListOfFriends] = useState([]);

  const addFriend = () => {
    Axios
      .post('http://localhost:3001/addFriend', { name, age })
      .then((response) => setListOfFriends([...listOfFriends, { _id: response.data._id, name, age }]))
      .catch(err => alert(err));
  };
  
  const updateFriend = (id) => {
    const newAge = prompt('Enter New Age');

    Axios
      .put('http://localhost:3001/update', { newAge, id })
      .then(setListOfFriends(listOfFriends.map(friend => {
        return friend._id === id ? { ...friend, age: newAge } : friend;
      })
    ));
  };

  const deleteFriend = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`)
      .then(setListOfFriends(listOfFriends.filter(friend => {
        return friend._id !== id;
      })))
  };

  useEffect(() => {
    Axios
      .get('http://localhost:3001/read')
      .then((response) => setListOfFriends(response.data));
  }, []);

  return (
    <div className="App">
      <div className="inputs">
        <input 
          type="text" 
          placeholder="Friend Name" 
          onChange={(event) => setName(event.target.value)} 
        />

        <input 
          type="number" 
          placeholder="Friend Age" 
          onChange={(event) => setAge(event.target.value)} 
        />

        <button onClick={addFriend} className="inputs">Add Friend</button>
      </div>

      <div className="listOfFriends">
        {listOfFriends.map(friend => {
          return(
            <div className="friendContainer">
              <div className="friend">
                <h3>Name: {friend.name}</h3>
                <h3>Age: {friend.age}</h3>
              </div>

              <button onClick={() => updateFriend(friend._id)}>Update</button>
              <button id="remove" onClick={() => deleteFriend(friend._id)}>X</button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
