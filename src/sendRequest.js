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
  return body ? sendRequest('GET', url, body) : sendRequest('GET', url)
}

export function senPostRequest (url, body = null) {
  return body ? sendRequest('POST', url, body) : sendRequest('POST', url)
}

export function senPutRequest (url, body = null) {
  return body ? sendRequest('PUT', url, body) : sendRequest('PUT', url)
}

export function senDeleteRequest (url, body = null) {
  return body ? sendRequest('DELETE', url, body) : sendRequest('DELETE', url)
}
