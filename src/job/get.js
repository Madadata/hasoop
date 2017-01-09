/**
 * Created by Chyroc on 17/1/4.
 */

import {setGetJobOptions} from './setOptions'

const r = require('request-promise')

export function getJobAll () {
  const options = setGetJobOptions('all')
  return r(options)
        .then(function (repos) {
          return repos['jobs']
        })
        .catch(function (err) {

        })
}

export function getJobByJobName (jobName) {
  const options = setGetJobOptions('subName', jobName)
  return r(options)
        .then(function (repos) {
          return repos['jobs']
        })
        .catch(function (err) {

        })
}

export function getJobByConnectorName () {
  const options = setGetJobOptions('cname', connectorName)
  return r(options)
        .then(function (repos) {
          return repos['jobs']
        })
        .catch(function (err) {

        })
}
