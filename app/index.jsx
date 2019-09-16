import ReactDom from "react-dom"
import React from "react"

import "bootstrap/dist/css/bootstrap.min.css"

import "./style.scss"

import App from "./components/App.jsx"

ReactDom.render(
  <App/>,
  document.getElementById("app")
)