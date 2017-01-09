"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createLink = createLink;

var _setOptions = require("./setOptions");

var r = require("request-promise");

// const mysqlParam = {
//     'uniqueLinkName': 'qwertyuio',
//     'DatabaseType': 'mysql',
//     'connectionHost': '',
//     'connectionPort': '',
//     'connectionDatabaseName': '',
//     'username': '',
//     'password': '',
//     'identifierEnclose': '`'
// }
//
// const s3Param = {
//     'DatabaseType': 's3'
// }

/**
 * Created by Chyroc on 17/1/3.
 */

function createLink(linkName, param) {
    //TODO 各种参数
    var options = (0, _setOptions.setCreateLinkOptions)(linkName, param);
    return r(options).then(function (repos) {
        return repos;
    }).catch(function (err) {});
}
//# sourceMappingURL=create.js.map