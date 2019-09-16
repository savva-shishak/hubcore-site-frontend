import jwtClient from "./jwt/newClient"
import axios from "axios"
import Cookie from "js-cookie";

class Server {
  jwt = jwtClient;
  route = axios.create();

  constructor() {
    let cookieJWT = Cookie.getJSON("jwt");

    this.jwt.setClientOptions(cookieJWT);
  }

  // ...
}

export default new Server();