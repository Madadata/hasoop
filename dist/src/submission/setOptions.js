'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setStartJobOptions = setStartJobOptions;
exports.setStopJobOptions = setStopJobOptions;
exports.setGetJobStatusOptions = setGetJobStatusOptions;
exports.setGetSubmissionOptions = setGetSubmissionOptions;

var _setRequestOptions = require('../utils/setRequestOptions');

var jobUri = 'v1/job'; /**
                        * Created by Chyroc on 17/1/6.
                        */

var submissionUri = 'v1/submissions';

function setStartJobOptions(jobName) {
    return (0, _setRequestOptions.setPutOptions)('start', jobUri, jobName);
}

function setStopJobOptions(jobName) {
    return (0, _setRequestOptions.setPutOptions)('stop', jobUri, jobName);
}

function setGetJobStatusOptions(jobName) {
    return (0, _setRequestOptions.setGetOptions)('status', jobUri, jobName);
}

function setGetSubmissionOptions() {
    var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';

    if (tag == 'all') {
        return (0, _setRequestOptions.setGetOptions)(tag, submissionUri);
    }
}
//# sourceMappingURL=setOptions.js.map