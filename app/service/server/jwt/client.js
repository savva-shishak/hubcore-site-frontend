import Cookies from "js-cookie";
import axios from "axios"

class Client {

  refreshRequest
  token
  refreshToken
  login

  constructor(options = {}) {
    this.setClient(options.client)
    this.token        = options.token        || this.token
    this.refreshToken = options.refreshToken || this.refreshToken
    this.login        = options.login        || this.login

    this.saveDataInBrowser()
  }

  /**
   * Изменение всех параметров клиента
   * 
   * Если в опциях есть новые значения для свойств jwt-клиента они добавляются, иначе остаются прежние
   * @param {Object} options 
   */
  setClientOptions(options = {}) {

    // если происходит логаут
    if (!options.login && !options.token && !options.refreshToken) {
      this.client.post("auth/logout", { login: this.login, refreshToken: this.refreshToken })
    }

    this.token        = options.token        || this.token
    this.refreshToken = options.refreshToken || this.refreshToken
    this.login        = options.login        || this.login

    this.saveDataInBrowser()
  }

  /**
   * Установка axios-клиента
   * 
   * @param {AxiosStatic} client 
   */
  setClient(client = axios.create()) {
    this.client = client

    this.changeInterseptorsOfClient()
  }

  /**
   * Изменение поведения axios-клиента (теперь это jwt-клиент)
   */
  changeInterseptorsOfClient() {
    this.client.interceptors.request.use(
      config => this.setAutorization(config), // что делать при каждом запросе
      err => {
        return Promise.reject(err)
      }
    )

    this.client.interceptors.response.use(r => r,
      async err => await this.tryGetNewRefresh(err) // что делать если мы получили ошибку 
    )
  }

  /**
   * Добавление токена в setAutorization. 
   * Здесь в конфиг запроса добавляется 
   * header.Authorization со значением `Bearer ${токен}`
   * необходимо при проверке логаута
   */
  setAutorization(config) {
    if (!this.token) return config

    const newConfig = {
        headers: {},
        ...config,
    }

    newConfig.headers.Authorization = `Bearer ${this.token}`
    
    return newConfig
  }

  /**
   * Новые токены 
   * 
   * Здесь меняется конфиг ошибки ответа.
   * если у клиента есть токен + статус ответа равен 401 
   * и ошибка не повторилась, 
   * то делается запрос на сервер для получение нового refresh токена 
   * и предыдущий запрос повторяется, иначе выводится ошибка
   */
  async tryGetNewRefresh(err) {
    
    // если нет токенов или статус ответа не 401 или этот запрос начинает идти по кругу (ошибка на сервере)
    if (!this.refreshToken || err.response.status !== 401 || err.config.retry) {
      return Promise.reject(err)
    }

    // задержка для 2-го refresh запроса 
    if (!this.refreshRequest){ 
      this.refreshRequest = this.client.post("/auth/refresh", {refreshToken: this.refreshToken, login: this.login})
    }
    // 2-й refresh запрос дождётся 1-го и проблем не будет
    const { data } = await this.refreshRequest 
    
    // смена токенов
    this.token        = data.token
    this.refreshToken = data.refreshToken

    // переписываем конфиг запроса
    const reRequest = {
      ...err.config,
      retry: true // на случай, если запрос 401 повторится (Ошибка на сервере)
    }

    this.saveDataInBrowser()

    // и повторяем 
    return this.client(reRequest)
  }

  saveDataInBrowser() {
    const cookies = {
      login:        this.login,
      token:        this.token,
      refreshToken: this.refreshToken
    }
    Cookies.set("jwt", cookies, {expires: 700})
  }
}

export default Client