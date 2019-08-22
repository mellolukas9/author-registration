import React, { useState, useEffect } from "react";
import "./styles/pure-min.css";
import "./styles/side-menu.css";
import Input from "./components/CustomerInput";
import ButtonSubmit from "./components/CustomerButton";
import $ from "jquery";

export default function App() {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    $.ajax({
      url: "https://cdc-react.herokuapp.com/api/autores",
      dataType: "json",
      success: response => {
        setList(response);
      }
    });
  });

  function sendForm(e) {
    e.preventDefault();

    $.ajax({
      url: "https://cdc-react.herokuapp.com/api/autores",
      contentType: "application/json",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        name,
        email,
        password
      }),
      success: response => {
        setList(response);
      },
      error: response => {
        console.log("error");
      }
    });
  }

  return (
    <div id="layout">
      <a href="#menu" id="menuLink" className="menu-link">
        <span />
      </a>

      <div id="menu">
        <div className="pure-menu">
          <a className="pure-menu-heading" href="#">
            Company
          </a>

          <ul className="pure-menu-list">
            <li className="pure-menu-item">
              <a href="#" className="pure-menu-link">
                Home
              </a>
            </li>
            <li className="pure-menu-item">
              <a href="#" className="pure-menu-link">
                Autor
              </a>
            </li>
            <li className="pure-menu-item">
              <a href="#" className="pure-menu-link">
                Livro
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div id="main">
        <div className="header">
          <h1>Cadastro de Autores</h1>
        </div>
        <div className="content" id="content">
          <div className="pure-form pure-form-aligned">
            <form
              className="pure-form pure-form-aligned"
              onSubmit={sendForm}
              method="post"
            >
              <Input className="pure-control-group">
                id="nome" type="text" name="nome" value={name}
                onChange={e => setName(e.target.value)}
                label="Nome"
              </Input>

              <Input>
                id="email" type="email" name="email" value={email}
                onChange={e => setEmail(e.target.value)}
                label="Email"
              </Input>

              <Input>
                id="senha" type="password" name="senha" value={password}
                onChange={e => setPassword(e.target.value)}
                label="Senha"
              </Input>

              <ButtonSubmit label="Gravar" />
            </form>
          </div>
          <div>
            <table className="pure-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>email</th>
                </tr>
              </thead>
              <tbody>
                {list.map(autor => (
                  <tr key={autor.id}>
                    <td>{autor.nome}</td>
                    <td>{autor.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
