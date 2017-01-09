'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateJob = updateJob;
exports.updateJobEnable = updateJobEnable;
exports.updateJobDisable = updateJobDisable;

var _setOptions = require('./setOptions');

var r = require('request-promise'); /**
                                     * Created by Chyroc on 17/1/4.
                                     */

function updateJob(jobName, fromLinkConf, toLinkConf) {
    //TODO
    var options = (0, _setOptions.setCreateOrUpdateJobOptions)(jobName, fromLinkConf, toLinkConf);
    console.log(options['body']['jobs']);
    return r(options).then(function (repos) {
        return repos;
    });
}

function updateJobEnable(jobName) {
    var options = (0, _setOptions.setUpdateJobOptions)('enable', jobName);
    return r(options).then(function (repos) {
        return repos;
    }).catch(function (err) {});
}

function updateJobDisable(jobName) {
    var options = (0, _setOptions.setUpdateJobOptions)('disable', jobName);
    return r(options).then(function (repos) {
        return repos;
    }).catch(function (err) {});
}
//# sourceMappingURL=update.js.map