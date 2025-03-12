import { useState, useEffect } from 'react'
import "./App.css"
import Todo from './components/Todo'
import TodoForm from './components/TodoForm'
import Motivational from './components/Motivational'


function App() {
  const [todos, setTodos] = useState(()=> {
    const savedTodos = localStorage.getItem("todos")
    return savedTodos ? JSON.parse(savedTodos) : [];
  })

  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos));
  },[todos]);

  const addTodo = (text,category) =>{
    const newTodos = [...todos, 
      {
      id: Math.floor(Math.random() * 10000), 
      text,
      category,
      isCompleted: false,
    }]

    setTodos(newTodos)
}

const removeTodo = (id) =>{
  
  const filteredTodos = todos.filter((todo) => todo.id !== id);
  setTodos(filteredTodos)
}


const completeTodo = (id) => {
  const updatedTodos = todos.map((t) =>
    t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
  );
  setTodos(updatedTodos);
};

const motivationalQuotes = [
"  “Faça ou não faça, não há tentativa.” – Mestre Yoda, Star Wars: Episódio V – O Império Contra-Ataca."
,"“A vida é como uma caixa de chocolates, você nunca sabe o que vai encontrar.” – Forrest Gump.",
"“Acreditar é a nossa força, é o que nos faz seguir em frente.” – O Senhor dos Anéis: A Sociedade do Anel."
,"“A coragem é a resistência ao medo, domínio do medo, não ausência do medo.” – O Espetacular Homem-Aranha."
,"“A única limitação é a que você coloca em si mesmo.” – O Espetacular Homem-Aranha."
,"“A vida é uma constante negociação do que você é consigo mesmo.” – O Espetacular Homem-Aranha."
,"“Não é sobre o que eu quero, é sobre o que você merece.” – Batman: O Cavaleiro das Trevas."

]

const [currentQuote, setCurrentQuote] = useState(
  motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
);

useEffect (() => {
  const interval = setInterval(() => {
    setCurrentQuote(
      motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
    )
  }, 5000);
  return () => clearInterval(interval)
})
return (
  <div className="app">
    <h1>To do list</h1>
    <div className="motivacional-quote">
      <Motivational/>
    </div>
    <div className="todo-list">
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          removeTodo={removeTodo}
          completeTodo={completeTodo}
        />
      ))}
    </div>
    <TodoForm addTodo={addTodo} />
      
  </div>
);
}

export default App;
