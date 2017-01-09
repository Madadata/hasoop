/**
 * Created by Chyroc on 17/1/4.
 */

import {setUpdateJobOptions, setCreateOrUpdateJobOptions} from './setOptions'

const r = require('request-promise')

export function updateJob(jobName, fromLinkConf, toLinkConf) {
    //TODO
    const options = setCreateOrUpdateJobOptions(jobName, fromLinkConf, toLinkConf)
    console.log(options['body']['jobs'])
    return r(options)
        .then(function (repos) {
            return repos
        })
}

export function updateJobEnable(jobName) {
    const options = setUpdateJobOptions('enable', jobName)
    return r(options)
        .then(function (repos) {
            return repos
        })
        .catch(function (err) {
        })
}

export function updateJobDisable(jobName) {
    const options = setUpdateJobOptions('disable', jobName)
    return r(options)
        .then(function (repos) {
            return repos
        })
        .catch(function (err) {
        })
}