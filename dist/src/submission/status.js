'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.startJob = startJob;
exports.stopJob = stopJob;
exports.getJobStatus = getJobStatus;

var _setOptions = require('./setOptions');

var r = require('request-promise'); /**
                                     * Created by Chyroc on 17/1/5.
                                     */

function startJob(jobName) {
    var options = (0, _setOptions.setStartJobOptions)(jobName);
    return r(options).then(function (repos) {
        console.log(repos);
        return repos;
    }).catch(function (err) {});
}

function stopJob(jobName) {
    var options = (0, _setOptions.setStopJobOptions)(jobName);
    return r(options).then(function (repos) {
        console.log(repos);
        return repos;
    }).catch(function (err) {});
}

function getJobStatus(jobName) {
    var options = (0, _setOptions.setGetJobStatusOptions)(jobName);
    return r(options).then(function (repos) {
        console.log(repos);
        return repos;
    }).catch(function (err) {});
}

getJobStatus('movie_s3');
//# sourceMappingURL=status.js.map