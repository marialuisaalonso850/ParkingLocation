import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Autenticacion/AutProvider";

import React, { useState } from "react"
import DefaultLayout from "../layout/DefaultLayout"
import { API_URL } from "../Autenticacion/constanst";
import type{ AuthResponseError } from "../types/types";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // Cambio de "username" a "email"
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();
  const goto = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email, // Cambio de "username" a "email"
          password,
        }),
      });

      if (response.ok) {
        console.log("Usuario creado correctamente");
        setErrorResponse("");
        goto("/");
      } else {
        console.log("Algo salió mal :o");
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (auth.esAutentico) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <DefaultLayout>
      <div className="container">
        <div className="ig">
          <img src="../public/regis.svg" alt="location" />
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <img src="../public/user.svg" alt="user" className="user" />
          <h1>Signup</h1>
          {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
          <label>Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <label>Correo Electrónico</label> 
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button>Crear Usuario</button>
        </form>
      </div>
    </DefaultLayout>
  );
}