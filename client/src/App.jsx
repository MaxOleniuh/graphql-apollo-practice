import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_USERS } from './query/user';
import './App.css'; 
import { CREATE_USER } from './mutations/users';

const App = () => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const [newUser] = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  if (loading) {
    return <h1>Loading...</h1>; 
  }

  const addUser = e => {
    e.preventDefault();
    newUser({
      variables: {
        input: {
          username,
          age
        }
      }
    }).then(({ data }) => {
      console.log(data)
      setUsername("");
      setAge(0)
    })
  }

  const getAll = e => {
    e.preventDefault();
    refetch()
  }

  return (
    <div className="container">
      <form className="form" action="">
        <input value={username} onChange={(e) => {setUsername(e.target.value)}} type="text" placeholder="Name" /> 
        <input value={age} onChange={(e) => {setAge(+e.target.value)}} type="number" placeholder="Age" />
        <div className="btns">
          <button onClick={(e) => addUser(e)} type="button">Create</button>
          <button onClick={(e) => getAll(e)} type="button">Retrieve</button>
        </div>
      </form>
      <div>
        {users.map((user) => (
          <div key={user.id} className="user">
            {user.id}. {user.username} {user.age}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
