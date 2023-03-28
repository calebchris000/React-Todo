import './App.css';
import Header from './components/header';
import Todo from './components/Todo';

function App() {
  const onLocal = JSON.parse(localStorage.getItem('data'))
  const item = onLocal 
  ? onLocal.map(i => i.item)
  : []


  return (
    <div>
      <Header />
      <Todo texts={item} />
    </div>

  );
}

export default App;
