'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLinkAll = getLinkAll;
exports.getLinkByLinkName = getLinkByLinkName;
exports.getLinkByConnectorName = getLinkByConnectorName;

var _setOptions = require('./setOptions');

var r = require("request-promise"); /**
                                     * Created by Chyroc on 17/1/3.
                                     */

function getLinkAll() {
    var options = (0, _setOptions.setGetLinkOptions)('all');
    return r(options).then(function (repos) {
        return repos['links'];
    }).catch(function (err) {});
}

function getLinkByLinkName(linkName) {
    var options = (0, _setOptions.setGetLinkOptions)('subName', linkName);
    return r(options).then(function (repos) {
        return repos;
    }).catch(function (err) {});
}

function getLinkByConnectorName(connectorName) {
    var options = (0, _setOptions.setGetLinkOptions)('cname', connectorName);
    return r(options).then(function (repos) {
        return repos;
    }).catch(function (err) {});
}
//# sourceMappingURL=get.js.map