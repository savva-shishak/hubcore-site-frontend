import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

import "./nav.scss"

import menu from "./Menu"

export default observer(class extends Component {

  render() {
    return (
      <div className={"app-menu " + (menu.getToggle? "open": "close")}>
        <ul className="list-group">
          <Link className="list-group-item list-group-item-action" to="/">Главная</Link>

          <Link className="list-group-item list-group-item-action" to="/rating">Рейтинг</Link>

          <Link className="list-group-item list-group-item-action" to="/personalHub">Личный Хаб</Link>

          <Link className="list-group-item list-group-item-action" to="/projects">Проекты</Link>

          <Link className="list-group-item list-group-item-action" to="/techSupport">Техподдержка</Link>

          <Link className="list-group-item list-group-item-action" to="/articles">Статьи</Link>

          <Link className="list-group-item list-group-item-action" to="/voting">Голосования</Link>

          <Link className="list-group-item list-group-item-action" to="/financing">Финансирование</Link>

          <Link className="list-group-item list-group-item-action" to="/marketplace">Маркетплейс</Link>

          <Link className="list-group-item list-group-item-action" to="/burse">Биржа</Link>

          <Link className="list-group-item list-group-item-action" to="/profile">Профиль</Link>
        </ul>
      </div>    
    );}
  }
)