import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import { Button } from "antd"
import { AuthContext } from "../../context/AuthContext"
import "./Header.module.scss"

function Header() {
  const auth = useContext(AuthContext)

  return (
    <header>
      <nav>
        <ul>
          {/*<li><NavLink to="/">Домашня сторінка</NavLink></li>*/}
          <li>
            <NavLink to="/clients">Клієнти</NavLink>
          </li>
          <li>
            <NavLink to="/contracts">Контракти</NavLink>
          </li>
          <li>
            <NavLink to="/ttns">Товарні накладні</NavLink>
          </li>
          <li>
            <NavLink to="/products">Товари</NavLink>
          </li>
          <li>
            <NavLink to="/containers">Тара</NavLink>
          </li>
          <li>
            <Button type="link" onClick={auth.logout}>
              Вийти
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
