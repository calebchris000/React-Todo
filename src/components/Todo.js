import './Todo.css';
import { FaPlusCircle, FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const Todo = (props) => {
  /*eslint-disable */
    const { texts } = props;
    /* eslint-enable */

  const [value, setValue] = useState('');
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    if (texts) {
      setTodo(texts);
    }
  }, [texts]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('data'));
    const obj = [];
    todo.forEach((item, index) => {
      obj.push({ item, index, isCompleted: local[index].isCompleted });
    });
    if (obj.length !== 0) {
      localStorage.setItem('data', JSON.stringify(obj));
    }
    setValue('');
  }, [todo]);

  function handleInput(event) {
    setValue(event.target.value);
  }

  function handleClick(val) {
    setTodo([...todo, val]);
  }

  function handleDelete(index) {
    const solve = todo.filter((x) => todo.indexOf(x) !== index);
    setTodo(solve);
  }

  function handleCheckBox(index) {
    const get = JSON.parse(localStorage.getItem('data'));
    get[index].isCompleted = !get[index].isCompleted;
    localStorage.setItem('data', JSON.stringify(get));
  }

  const inputChecked = (index) => {
    const get = JSON.parse(localStorage.getItem('data'));
    return get[index].isCompleted;
  };

  return (
    <div className="todoWrapper">
      <div className="todo">
        <input id="input" value={value} onChange={(event) => handleInput(event)} placeholder="Your Todo..." />
        <button id="submit" onClick={() => handleClick(value)} type="button">
          <FaPlusCircle />
        </button>
      </div>
      <div className="itemWrap">
        {
                    todo.map((i, index) => (
                        /*eslint-disable */
                        <div className="item" key={index}>
                            {/* eslint-enable */}
                          <div className="checkWrapper">
                            <input className="check" onChange={() => handleCheckBox(index)} type="checkbox" defaultChecked={inputChecked(index)} />
                            <p>{i}</p>
                          </div>

                          <button type="button" onClick={() => handleDelete(index)} className="trash">
                            <FaTrash />
                            { }
                          </button>
                        </div>
                    ))
                }
      </div>
    </div>
  );
};

export default Todo;
