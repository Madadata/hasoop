/**
 * Created by Chyroc on 17/1/3.
 */

import {setUpdateOptions} from './setOptions'

const r = require('request-promise')

export function updateEnable (linkName) {
  const options = setUpdateOptions('enable', linkName)
  return r(options)
    .then(function (repos) {
      return repos
    })
    .catch(function (err) {
    })
}

export function updateDisable (linkName) {
  const options = setUpdateOptions('disable', linkName)
  return r(options)
    .then(function (repos) {
      return repos
    })
    .catch(function (err) {
    })
}
export function updateLink (linkName) {
  // TODO
}
