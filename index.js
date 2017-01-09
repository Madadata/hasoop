/**
 * Created by Chyroc on 17/1/3.
 */

import {getVersion} from './src/utils/getVersion'

import {createRole} from './src/authorization/create'
import {deleteRole} from './src/authorization/delete'
import {getRole} from './src/authorization/get'

import {getConnectorAll, getConnectorByConnectorName} from './src/connecttor/get'

import {getDriverAll} from './src/driver/get'

import {createJob} from './src/job/create'
import {deleteJob, deleteJobAll} from './src/job/delete'
import {getJobAll, getJobByConnectorName, getJobByJobName} from './src/job/get'
import {updateJob, updateJobEnable, updateJobDisable} from './src/job/update'

import {createLink} from './src/link/create'
import {deleteLink, deleteLinkAll} from './src/link/delete'
import {getLinkAll, getLinkByConnectorName, getLinkByLinkName} from './src/link/get'
import {updateLink, updateEnable, updateDisable} from './src/link/update'

import {getSubmissionALL, getSubmissionByJobName} from './src/submission/get'
import {startJob, stopJob, getJobStatus} from './src/submission/status'

export {
    // version
    getVersion,

    // authorization
    createRole,
    deleteRole,
    getRole,

    // connecttor
    getConnectorAll,
    getConnectorByConnectorName,

    // driver
    getDriverAll,

    // job
    createJob,
    deleteJob,
    deleteJobAll,
    getJobAll,
    getJobByConnectorName,
    getJobByJobName,
    updateJob,
    updateJobEnable,
    updateJobDisable,

    // link
    createLink,
    deleteLink,
    deleteLinkAll,
    getLinkAll,
    getLinkByConnectorName,
    getLinkByLinkName,
    updateLink,
    updateEnable,
    updateDisable,

    // submission
    getSubmissionALL,
    getSubmissionByJobName,
    startJob,
    stopJob,
    getJobStatus
}
