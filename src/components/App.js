import React, { useContext, useReducer, useEffect, useState } from 'react';
import TodosContext from '../utils/context';
import reducer from '../utils/reducer';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import axios from 'axios';

const useAPI = (endpoint) => {
  const [data, setData] = useState([]);
  //prettier-ignore
  // eslint-disable-next-line
  useEffect(() => { getData(); }, []);

  const getData = () =>
    axios
      .get(endpoint)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));

  return data;
};

const App = () => {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const savedTodos = useAPI('https://todohooksapi.vercel.app/todos');

  //prettier-ignore
  // eslint-disable-next-line
  useEffect(()=>{dispatch({type:"GET_TODOS", payload:savedTodos})},[savedTodos])

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <div
        style={{ minHeight: '100vh' }}
        className="container-fluid mx-auto p-4 bg-blue-lighter  shadow-lg rounded"
      >
        <AddTodo />
        <TodoList />
      </div>
    </TodosContext.Provider>
  );
};

export default App;
