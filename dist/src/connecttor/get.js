'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getConnectorAll = getConnectorAll;
exports.getConnectorByConnectorName = getConnectorByConnectorName;

var _setOptions = require('./setOptions');

/**
 * Created by Chyroc on 17/1/3.
 */

var r = require("request-promise");

function getConnectorAll() {
    var options = (0, _setOptions.setGetConnectorOptions)('all');
    return r(options).then(function (repos) {
        return repos;
    }).catch(function (err) {});
}
function getConnectorByConnectorName(connectorName) {
    var options = (0, _setOptions.setGetConnectorOptions)('subName', connectorName);
    return r(options).then(function (repos) {
        return repos;
    }).catch(function (err) {});
}
//# sourceMappingURL=get.js.map