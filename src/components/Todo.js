import './Todo.css';
import { FaPlusCircle, FaTrash } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';

const Todo = () => {
  const [todoText, setTodoText] = useState('');
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const onLocal = JSON.parse(localStorage.getItem('data'));
    if (onLocal) {
      const items = onLocal.map((i) => i.item);
      setCollection(items);
    }
  }, []);

  function handleInput(event) {
    setTodoText(event.target.value);
  }

  function handleSubmit() {
    setCollection([...collection, todoText]);
    setTodoText('');
  }

  function handleCheck(index) {
    const onLocal = JSON.parse(localStorage.getItem('data'));
    onLocal[index].isCompleted = !onLocal[index].isCompleted;
    localStorage.setItem('data', JSON.stringify(onLocal));
  }

  function handleIsChecked(index) {
    const onLocal = JSON.parse(localStorage.getItem('data'));
    if (onLocal && onLocal[index]) {
      return onLocal[index].isCompleted;
    }
    return false;
  }

  function handleTrash(index) {
    const onLocal = JSON.parse(localStorage.getItem('data'));
    onLocal.splice(index, 1);
    const newArr = onLocal.map((x) => x.item);
    setCollection(newArr);
  }

  useEffect(() => {
    const obj = [];
    collection.forEach((item, index) => {
      // const isChecked = handleIsChecked(index);
      obj.push({ item, index, isCompleted: false });
    });
    if (obj.length !== 0) {
      localStorage.setItem('data', JSON.stringify(obj));
    }
  }, [collection]);

  return (
    <div className="todoWrapper">
      <div className="todo">
        <input type="text" value={todoText} id="input" onChange={(event) => handleInput(event)} placeholder="Your Todo..." />
        <button id="submit" type="button" onClick={() => handleSubmit()}>
          <FaPlusCircle />
        </button>
      </div>
      {collection.map((value, index) => (
        <div className="item" key={collection.indexOf(value)}>
          <div className="dual">
            <input className="check" type="checkbox" onChange={() => handleCheck(index)} defaultChecked={handleIsChecked(index) || false} />
            <p>{value}</p>
          </div>
          <button type="button" className="trash" onClick={() => handleTrash(index)}>
            <FaTrash />
            { }
          </button>
        </div>
      ))}
    </div>
  );
};
export default Todo;
