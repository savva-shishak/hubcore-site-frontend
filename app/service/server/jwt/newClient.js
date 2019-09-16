import Client from "./client"
import Cookies from "js-cookie"

import axios from "axios"
import mockAdapter from "axios-mock-adapter"

const client = axios.create()

//const mock = new mockAdapter(client)

// mock.onPost("/auth/login").reply(403)
// mock.onPost("/users/sigin").reply(406)
// mock.onGet("/users/").reply(200, {users: [{name:"Маша", login: "login1"}, {name:"Вася", login: "login"}]})

export default new Client({...Cookies.getJSON("jwtClient"), client})