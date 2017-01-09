/**
 * Created by Chyroc on 17/1/6.
 */

import {setGetOptions, setPutOptions} from '../utils/setRequestOptions'

const jobUri = 'v1/job'
const submissionUri = 'v1/submissions'

export function setStartJobOptions(jobName) {
    return setPutOptions('start', jobUri, jobName)
}

export function setStopJobOptions(jobName) {
    return setPutOptions('stop', jobUri, jobName)
}

export function setGetJobStatusOptions(jobName) {
    return setGetOptions('status', jobUri, jobName)
}

export function setGetSubmissionOptions(tag = 'all') {
    if (tag == 'all') {
        return setGetOptions(tag, submissionUri)
    }
}