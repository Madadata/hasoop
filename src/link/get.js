/**
 * Created by Chyroc on 17/1/3.
 */

import {setGetLinkOptions} from './setOptions'

const r = require("request-promise")

export function getLinkAll() {
    const options = setGetLinkOptions('all')
    return r(options)
        .then(function (repos) {
            return repos['links']
        })
        .catch(function (err) {
        })
}

export function getLinkByLinkName(linkName) {
    const options = setGetLinkOptions('subName', linkName)
    return r(options)
        .then(function (repos) {
            return repos
        })
        .catch(function (err) {
        })
}

export function getLinkByConnectorName(connectorName) {
    const options = setGetLinkOptions('cname', connectorName)
    return r(options)
        .then(function (repos) {
            return repos
        })
        .catch(function (err) {
        })
}