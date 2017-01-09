/**
 * Created by Chyroc on 17/1/5.
 */

import {setGetSubmissionOptions} from './setOptions'

const r = require("request-promise")

export function getSubmissionALL() {
    const options = setGetSubmissionOptions('all')
    return r(options)
        .then(function (repos) {
            return repos['links']
        })
        .catch(function (err) {
        })
}

export function getSubmissionByJobName() {

}