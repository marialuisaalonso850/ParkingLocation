import { useAuth } from "../Autenticacion/AutProvider"
import { useState, useEffect } from "react";
import { API_URL } from "../Autenticacion/constanst";
import PortalLayout from "../layout/PortalLayout";

interface Todo {
  _id: string,
  title: string,
  completed: boolean;
  idUser: string;
}

export default function Dashboard(){

  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, seTitle]= useState("");

  const auth = useAuth();

  useEffect(()=>{
    loadTodos();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    
    createTodo();
  }

  async function createTodo() {
    try {
      const response = await fetch(`${API_URL}/todos`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`
        },
        body: JSON.stringify({
          title,
        }),
      });

      if(response.ok){
        const json = await response.json();
        setTodos([json,... todos]);
      }else{

      }
    } catch (error) {
      
    }
  }

  async function loadTodos() {
    try {
      const response = await fetch(`${API_URL}/todos`,{
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`
        },
      });

      if(response.ok){
        const json = await response.json();
        setTodos(json);
      }else{

      }
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      
    }
    
  }


  return (
    <PortalLayout>
    <div className="container">
      <h1 className="Rrr">Dashboard de {auth.getUser()?.name || ""}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" className="arreglo" placeholder="nuevo to-do..." onChange={(e) => seTitle(e.target.value)} value={title}></input>
      </form>
      <div className="ig">
        <img src="../public/map.svg" alt="map" />
      </div>
      {todos.map((todo) => (<div key={todo._id}>{todo.title}</div>))}
    </div>
    </PortalLayout>
  )
}