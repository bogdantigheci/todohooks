import React, { useState, useContext, useEffect } from 'react';
import TodosContext from '../utils/context';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const AddTodo = () => {
  const [todo, setTodo] = useState('');
  const [error, setError] = useState(null);
  const {
    state: { currentTodo = {} },
    dispatch,
  } = useContext(TodosContext);

  //prettier-ignore
  // eslint-disable-next-line
  useEffect(() => {if (currentTodo.text) {setTodo(currentTodo.text);}else{setTodo('')}}, [currentTodo.id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentTodo.text) {
      axios
        .patch(`https://todohooksapi.vercel.app/todos/${currentTodo.id}`, {
          text: todo,
        })
        .then((res) => dispatch({ type: 'UPDATE_TODO', payload: res.data }));
    } else {
      if (!todo) {
        return setError('You cannot add an empty todo!');
      } else {
        axios
          .post('https://todohooksapi.vercel.app/todos/', {
            id: uuidv4(),
            text: todo,
            complete: false,
          })
          .then((res) => {
            dispatch({ type: 'ADD_TODO', payload: res.data });
          });
      }
    }
    setTodo('');
    setError(null);
  };

  return (
    <React.Fragment>
      <form className="flex justify-center p-5" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add new todo..."
          className="border-blue border-solid border-2 p-2 rounded text-blue"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
      </form>
      {error ? <div className="text-center text-red">{error}</div> : ''}
    </React.Fragment>
  );
};

export default AddTodo;
