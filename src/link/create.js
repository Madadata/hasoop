/**
 * Created by Chyroc on 17/1/3.
 */

import {setCreateLinkOptions} from './setOptions'

const r = require("request-promise");

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

export function createLink(linkName, param) {
    //TODO 各种参数
    const options = setCreateLinkOptions(linkName, param)
    return r(options)
        .then(function (repos) {
            return repos
        })
        .catch(function (err) {

        })
}