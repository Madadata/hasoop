'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getVersion = getVersion;

var _constants = require('../constants');

var r = require('request-promise'); /**
                                     * Created by Chyroc on 17/1/5.
                                     */

function setGetVersionOptions() {
    return {
        method: 'GET',
        uri: _constants.baseUrl + 'version',
        qs: {
            'user.name': _constants.userName
        },
        json: true
    };
}

function getVersion() {
    var options = setGetVersionOptions();
    return r(options).then(function (repos) {
        return repos;
    }).catch(function (err) {});
}
//# sourceMappingURL=getVersion.js.map