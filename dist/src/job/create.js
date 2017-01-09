'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createJob = createJob;

var _setOptions = require('./setOptions');

var r = require('request-promise');

// const fromLinkConf = {
//     'type': 'mysql',
//     'schemaName': 'test',
//     'tableName': 'test',
//     'linkName': 'edf',
// }
// const toLinkConf = {
//     'type': 'hdfs',
//     'putputDir': '/sqoop2/ali',
//     'linkName': 'edf',
// }

/**
 * Created by Chyroc on 17/1/4.
 */

function createJob(jobName, fromLinkConf, toLinkConf) {
    //TODO
    var options = (0, _setOptions.setCreateOrUpdateJobOptions)(jobName, fromLinkConf, toLinkConf);
    console.log(options['body']['jobs']);
    return r(options).then(function (repos) {
        return repos;
    });
}
//# sourceMappingURL=create.js.map