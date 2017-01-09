/**
 * Created by Chyroc on 17/1/5.
 */

import {userName, baseUrl} from '../constants'

const r = require('request-promise')

function setGetVersionOptions() {
    return {
        method: 'GET',
        uri: baseUrl + 'version',
        qs: {
            'user.name': userName
        },
        json: true
    }
}


export function getVersion() {
    const options = setGetVersionOptions()
    return r(options)
        .then(function (repos) {
            return repos
        })
        .catch(function (err) {

        })
}