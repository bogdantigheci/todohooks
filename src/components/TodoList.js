import React, { useContext } from 'react';
import TodosContext from '../utils/context';
import { Icon } from 'react-icons-kit';
import { ic_mode_edit } from 'react-icons-kit/md/ic_mode_edit';
import { ic_delete } from 'react-icons-kit/md/ic_delete';
import axios from 'axios';

const TodoList = () => {
  const { state, dispatch } = useContext(TodosContext);
  const title =
    state.todos.length > 0 ? `${state.todos.length} Todos` : 'Nothing to do!';
  return (
    <div className="container mx-auto max-w-md text-center font-mono">
      <h1 className="text-purple">{title}</h1>
      <ul className="list-reset text-white p-0">
        {state.todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center bg-purple border-black border border-2 my-2 py-4 shadow-lg rounded"
          >
            <span
              onDoubleClick={() => {
                axios
                  .patch(`https://todohooksapi.vercel.app/todos/${todo.id}`, {
                    complete: !todo.complete,
                  })
                  .then((res) =>
                    dispatch({ type: 'TOGGLE_TODO', payload: res.data })
                  );
              }}
              className={`flex-1 ml-12 cursor-pointer ${
                todo.complete && 'line-through text-grey-darkest'
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() =>
                dispatch({ type: 'SET_CURRENT_TODO', payload: todo })
              }
            >
              <Icon size={32} style={{ color: 'green' }} icon={ic_mode_edit} />
            </button>
            <button
              onClick={() => {
                axios
                  .delete(`https://todohooksapi.vercel.app/todos/${todo.id}`)
                  .then((res) =>
                    dispatch({ type: 'REMOVE_TODO', payload: todo })
                  );
              }}
            >
              <Icon size={32} style={{ color: 'red' }} icon={ic_delete} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
