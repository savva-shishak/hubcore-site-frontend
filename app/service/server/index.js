import jwtClient from "./jwt/newClient"
import axios from "axios"
import Cookie from "js-cookie";

/**
 * Сервис приложения для взаимодействия с сервером, 
 */
class Server {
  jwt = jwtClient;
  route = axios.create();

  constructor() {
    let cookieJWT = Cookie.getJSON("jwt");

    this.jwt.setClientOptions(cookieJWT);
  }

  /**
   * сюда необходимо добавить методы, 
   * которыми будет пользоваться приложение для взаимодействия с сервером,
   * чтобы оно само не отправляло запросы.
   * 
   * Пример:
   */
  /* 
  Авторизация пользователя

  async login(logData) {
    const {status, data} = route.post("определённый url", logData);

    if (stutus == 404) {
      return;
    }

    const tokens = {
      token: data.token,
      refreshToken: data.refreshToken
    }

    jwt.setClientOptions(tokens)

    return data
  }
  */
}

export default new Server();