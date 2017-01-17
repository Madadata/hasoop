/**
 * Created by Chyroc on 17/1/10.
 */

const fetch = require('isomorphic-fetch')

function sendRequest (method, url, body = null) {
  return fetch(url, {method: method, body: body})
    .then(function (res) {
      return res.json()
    })
    .catch(function (err) {
      console.log(err)
    })
}

export function sendGetRequest (url, body = null) {
  return sendRequest('GET', url, body)
}

export function senPostRequest (url, body = null) {
  return sendRequest('POST', url, body)
}

export function senPutRequest (url, body = null) {
  return sendRequest('PUT', url, body)
}

export function senDeleteRequest (url, body = null) {
  return sendRequest('DELETE', url, body)
}
