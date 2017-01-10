/**
 * Created by Chyroc on 17/1/5.
 */

import {setStartJobOptions, setStopJobOptions, setGetJobStatusOptions} from './setOptions'

const r = require('request-promise')

export function startJob (jobName) {
  const options = setStartJobOptions(jobName)
  return r(options)
    .then(function (repos) {
      console.log(repos)
      return repos
    })
    .catch(function (err) {

    })
}

export function stopJob (jobName) {
  const options = setStopJobOptions(jobName)
  return r(options)
    .then(function (repos) {
      console.log(repos)
      return repos
    })
    .catch(function (err) {

    })
}

export function getJobStatus (jobName) {
  const options = setGetJobStatusOptions(jobName)
  return r(options)
    .then(function (repos) {
      console.log(repos)
      return repos
    })
    .catch(function (err) {

    })
}

getJobStatus('movie_s3')
