'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateEnable = updateEnable;
exports.updateDisable = updateDisable;
exports.updateLink = updateLink;

var _setOptions = require('./setOptions');

var r = require("request-promise"); /**
                                     * Created by Chyroc on 17/1/3.
                                     */

function updateEnable(linkName) {
    var options = (0, _setOptions.setUpdateOptions)('enable', linkName);
    return r(options).then(function (repos) {
        return repos;
    }).catch(function (err) {});
}

function updateDisable(linkName) {
    var options = (0, _setOptions.setUpdateOptions)('disable', linkName);
    return r(options).then(function (repos) {
        return repos;
    }).catch(function (err) {});
}
function updateLink(linkName) {
    //TODO
}
//# sourceMappingURL=update.js.map