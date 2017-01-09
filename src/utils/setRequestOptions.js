/**
 * Created by Chyroc on 17/1/4.
 */

import {userName, baseUrl} from '../constants'

export function setGetOptions(tag, uri, linkOrJobOrConnectorName = null) {
    if (tag == 'all') {
        return {
            method: 'GET',
            uri: baseUrl + uri + '/' + tag,
            qs: {
                'user.name': userName
            },
            json: true
        }
    } else if (tag == 'subName') {
        return {
            method: 'GET',
            uri: baseUrl + uri + '/' + linkOrJobOrConnectorName,
            qs: {
                'user.name': userName
            },
            json: true
        }
    } else if (tag == 'lname') {
        return {
            method: 'GET',
            uri: baseUrl + uri + '/' + linkOrJobOrConnectorName,
            qs: {
                'user.name': userName
            },
            json: true
        }
    } else if (tag == 'cname') {
        return {
            method: 'GET',
            uri: baseUrl + uri + '/' + linkOrJobOrConnectorName,
            qs: {
                'user.name': userName,
                'cname': linkOrJobOrConnectorName
            },
            json: true
        }
    } else if (tag == 'status') {
        return {
            method: 'GET',
            uri: baseUrl + uri + '/' + linkOrJobOrConnectorName + '/status',
            qs: {
                'user.name': userName
            },
            json: true
        }
    }
}

export function setPostOptions(uri, body) {
    return {
        method: 'POST',
        uri: baseUrl + uri,
        json: true,
        qs: {
            'user.name': userName
        },
        headers: {
            'content-type': 'application/json'
        },
        body: body
    }
}

export function setPutOptions(tag, uri, linkOrJobName) {
    if (tag == 'enable' || tag == 'disable') {
        return {
            method: 'PUT',
            uri: baseUrl + uri + '/' + linkOrJobName + '/' + tag,
            qs: {
                'user.name': userName
            },
            json: true
        }
    } else if (tag == 'start' || tag == 'stop') {
        return {
            method: 'PUT',
            uri: baseUrl + uri + '/' + linkOrJobName + '/' + tag,
            qs: {
                'user.name': userName
            },
            json: true
        }
    }
}

export function setDeleteOptions(linkOrJobName, uri) {
    return {
        method: 'DELETE',
        uri: baseUrl + uri + '/' + linkOrJobName,
        qs: {
            'user.name': userName
        },
        json: true
    }
}
