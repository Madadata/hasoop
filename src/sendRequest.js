/**
 * Created by Chyroc on 17/1/10.
 */

import fetch from 'isomorphic-fetch'

function sendRequest (method, url, body = null) {
  return fetch(url, {method: method, body: body})
    .catch(err => console.log(err))
}

export function sendGetRequest (url, body = null) {
  return body ? sendRequest('GET', url, body) : sendRequest('GET', url)
}

export function sendPostRequest (url, body = null) {
  return body ? sendRequest('POST', url, body) : sendRequest('POST', url)
}

export function sendPutRequest (url, body = null) {
  return body ? sendRequest('PUT', url, body) : sendRequest('PUT', url)
}

export function sendDeleteRequest (url, body = null) {
  return body ? sendRequest('DELETE', url, body) : sendRequest('DELETE', url)
}
