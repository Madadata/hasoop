'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSubmissionALL = getSubmissionALL;
exports.getSubmissionByJobName = getSubmissionByJobName;

var _setOptions = require('./setOptions');

var r = require("request-promise"); /**
                                     * Created by Chyroc on 17/1/5.
                                     */

function getSubmissionALL() {
    var options = (0, _setOptions.setGetSubmissionOptions)('all');
    return r(options).then(function (repos) {
        return repos['links'];
    }).catch(function (err) {});
}

function getSubmissionByJobName() {}
//# sourceMappingURL=get.js.map