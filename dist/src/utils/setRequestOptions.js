'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setGetOptions = setGetOptions;
exports.setPostOptions = setPostOptions;
exports.setPutOptions = setPutOptions;
exports.setDeleteOptions = setDeleteOptions;

var _constants = require('../constants');

function setGetOptions(tag, uri) {
    var linkOrJobOrConnectorName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (tag == 'all') {
        return {
            method: 'GET',
            uri: _constants.baseUrl + uri + '/' + tag,
            qs: {
                'user.name': _constants.userName
            },
            json: true
        };
    } else if (tag == 'subName') {
        return {
            method: 'GET',
            uri: _constants.baseUrl + uri + '/' + linkOrJobOrConnectorName,
            qs: {
                'user.name': _constants.userName
            },
            json: true
        };
    } else if (tag == 'lname') {
        return {
            method: 'GET',
            uri: _constants.baseUrl + uri + '/' + linkOrJobOrConnectorName,
            qs: {
                'user.name': _constants.userName
            },
            json: true
        };
    } else if (tag == 'cname') {
        return {
            method: 'GET',
            uri: _constants.baseUrl + uri + '/' + linkOrJobOrConnectorName,
            qs: {
                'user.name': _constants.userName,
                'cname': linkOrJobOrConnectorName
            },
            json: true
        };
    } else if (tag == 'status') {
        return {
            method: 'GET',
            uri: _constants.baseUrl + uri + '/' + linkOrJobOrConnectorName + '/status',
            qs: {
                'user.name': _constants.userName
            },
            json: true
        };
    }
} /**
   * Created by Chyroc on 17/1/4.
   */

function setPostOptions(uri, body) {
    return {
        method: 'POST',
        uri: _constants.baseUrl + uri,
        json: true,
        qs: {
            'user.name': _constants.userName
        },
        headers: {
            'content-type': 'application/json'
        },
        body: body
    };
}

function setPutOptions(tag, uri, linkOrJobName) {
    if (tag == 'enable' || tag == 'disable') {
        return {
            method: 'PUT',
            uri: _constants.baseUrl + uri + '/' + linkOrJobName + '/' + tag,
            qs: {
                'user.name': _constants.userName
            },
            json: true
        };
    } else if (tag == 'start' || tag == 'stop') {
        return {
            method: 'PUT',
            uri: _constants.baseUrl + uri + '/' + linkOrJobName + '/' + tag,
            qs: {
                'user.name': _constants.userName
            },
            json: true
        };
    }
}

function setDeleteOptions(linkOrJobName, uri) {
    return {
        method: 'DELETE',
        uri: _constants.baseUrl + uri + '/' + linkOrJobName,
        qs: {
            'user.name': _constants.userName
        },
        json: true
    };
}
//# sourceMappingURL=setRequestOptions.js.map