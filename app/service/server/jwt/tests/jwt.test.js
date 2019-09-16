import test from "ava"

import config from "./test.config"
import axios from 'axios'
import mockAdapter from "axios-mock-adapter"

import jwtClient from "../client"

// Тесты

/**
 * Authorization
 */
test('При отправки запроса, в шапку добавляется свойство Authorization', async t => {
  const { tokens: {token, refreshToken} } = config

  const client = axios.create()

  const mock = new mockAdapter(client)
  const jwt = new jwtClient({ client, token,  refreshToken })

  mock.onGet("/test").reply(200, "it`s work")

  await jwt.client("/test")

  t.is(mock.history.get[0].headers.Authorization, `Bearer ${token}`);
})

/**
 * ошибка 401
 */
test("При получении 401-й ошибки, автоматически выполнится запрос на получение новых токенов", async t => {
  const { tokens: {token, refreshToken}, user } = config

  const client = axios.create()

  const mock = new mockAdapter(client)
  const jwt = new jwtClient({ client, token,  refreshToken, ...user })

  const REFRESH_REQUEST = {
    login: user.login,
    refreshToken,
  }

  const REFRESH_RESPONSE = {
    token: "new token",
    refreshToken: "new refresh token"
  }

  mock.onPost("/auth/refresh", REFRESH_REQUEST).replyOnce(200, REFRESH_RESPONSE)
  mock.onGet("/test").reply(config => 
    compareAuth(config.headers.Authorization, `Bearer ${REFRESH_RESPONSE.token}`)
  )

  await jwt.client("/test")

  t.is(mock.history.get.length, 2);
  t.is(filterRefreshURLS(mock.history.post).length, 1);
})

/**
 * 2 запроса
 */
test("Программа корректно отработает при 2-х одновременных refresh запросах", async t => {
  const { tokens: {token, refreshToken}, user } = config

  const client = axios.create()

  const mock = new mockAdapter(client)
  const jwt = new jwtClient({ client, token,  refreshToken, ...user })

  const REFRESH_REQUEST = {
    login: user.login,
    refreshToken,
  }

  const REFRESH_RESPONSE = {
    token: "new token",
    refreshToken: "new refresh token"
  }

  mock.onPost("/auth/refresh", REFRESH_REQUEST).replyOnce(200, REFRESH_RESPONSE)
  mock.onGet("/test").reply(config => 
    compareAuth(config.headers.Authorization, `Bearer ${REFRESH_RESPONSE.token}`)
  )

  await Promise.all([jwt.client("/test"), jwt.client("/test")])

  t.is(mock.history.get.length, 4);
  t.is(filterRefreshURLS(mock.history.post).length, 1);
})

/**
 * не 401 ошибка
 */
test('Запрос провалится если мы получим не 401 ошибку', async t => {
  const { tokens: {token, refreshToken} } = config

  const client = axios.create()

  const mock = new mockAdapter(client)
  const jwt = new jwtClient({ client, token,  refreshToken })

  mock.onGet("/test").reply(404)

  await t.throwsAsync(async () => {
    await jwt.client("/test")
  });
});

// Интструменты

/**
 * фильтр url запросов
 * 
 * выбирает только refresh запросы
 * 
 * @param {Array} urls - массив url запросов
 */
function filterRefreshURLS(urls) {
  return urls.filter(({ url }) => url == "/auth/refresh")
}

/**
 * Аутентификация 
 * 
 * @param {String} auth - проверяемый ключ аутентификаций
 * @param {String} trueAuth - правильный ключ футентификации
 */
function compareAuth(auth, trueAuth) {
  if (auth == trueAuth) {
    return [200, 'it`s work']
  }

  return [401]
}