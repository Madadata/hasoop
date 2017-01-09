/**
 * Created by Chyroc on 17/1/3.
 */

const r = require('request-promise')

import {setGetConnectorOptions} from './setOptions'

export function getConnectorAll () {
  const options = setGetConnectorOptions('all')
  return r(options)
        .then(function (repos) {
          return repos
        })
        .catch(function (err) {
        })
}
export function getConnectorByConnectorName (connectorName) {
  const options = setGetConnectorOptions('subName', connectorName)
  return r(options)
        .then(function (repos) {
          return repos
        })
        .catch(function (err) {
        })
}
