/**
 * Created by Chyroc on 17/1/10.
 */

const fetch = require('isomorphic-fetch')

function sendRequest (method, url, body = null) {
  fetch(url, {method: method, body: body})
    .then(function (res) {
      console.log(res.json())
      return res.json()
    })
    .catch(function (err) {
      console.log(err)
    })
}

export function sendGetRequest (url, body = null) {
  return sendRequest('GET', url, body)
}

export function senPostRequest (url, body) {
  return sendRequest('POST', url, body)
}

export function senPutRequest (url, body) {
  return sendRequest('PUT', url, body)
}

export function senDeleteRequest (url, body = null) {
  return sendRequest('DELETE', url, body)
}
