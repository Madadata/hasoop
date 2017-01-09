'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getJobAll = getJobAll;
exports.getJobByJobName = getJobByJobName;
exports.getJobByConnectorName = getJobByConnectorName;

var _setOptions = require('./setOptions');

var r = require('request-promise'); /**
                                     * Created by Chyroc on 17/1/4.
                                     */

function getJobAll() {
    var options = (0, _setOptions.setGetJobOptions)('all');
    return r(options).then(function (repos) {
        return repos['jobs'];
    }).catch(function (err) {});
}

function getJobByJobName(jobName) {
    var options = (0, _setOptions.setGetJobOptions)('subName', jobName);
    return r(options).then(function (repos) {
        return repos['jobs'];
    }).catch(function (err) {});
}

function getJobByConnectorName() {
    var options = (0, _setOptions.setGetJobOptions)('cname', connectorName);
    return r(options).then(function (repos) {
        return repos['jobs'];
    }).catch(function (err) {});
}
//# sourceMappingURL=get.js.map