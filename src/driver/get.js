/**
 * Created by Chyroc on 17/1/5.
 */

import {setGetJobOptions} from './setOptions'

const r = require('request-promise')

export function getDriverAll() {
    const options = setGetJobOptions('all')
    return r(options)
        .then(function (repos) {
            return repos['links']
        })
        .catch(function (err) {
        })
}