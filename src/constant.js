import keyMirror from 'keymirror'

/**
 * type of all connectors, currently supporting generic (databases) and HDFS.
 */
export const connectorType = keyMirror({
  generic: null,
  hdfs: null
})

/**
 * specific types within generic types.
 */
export const genericType = keyMirror({
  mysql: null
})

/**
 * type of all links, currently supporting mysql and hdfs.
 */
export const linkType = keyMirror({
  mysql: null,
  hdfs: null
})

/**
 * action of sqoop, used in sqoop rest api querySting / params / body.
 */
export const sqoopAction = keyMirror({
  start: null,
  stop: null,
  status: null,

  all: null,
  jname: null,
  cname: null,

  enable: null,
  disable: null
})

export const simpleVersion = '1'
export const version = 'v1'
export const sqoopConnectorCount = 7

/**
 * type of all hasoop method
 */
export const hasoopMethodTypes = keyMirror({
   // version
  getVersion: null,
   // driver
  getDriver: null,
   // connector
  getConnectorAll: null,
  getConnectorByConnectorName: null,
   // link
  getLinkAll: null,
  getLinkByConnectorName: null,
  getLinkByLinkName: null,
  createLink: null,
  updateLinkConfig: null,
  updateLinkEnable: null,
  updateLinkDisable: null,
  deleteLink: null,
  deleteLinkAll: null,
   // job
  getJobAll: null,
  getJobByJobName: null,
  getJobByConnectorName: null,
  createJob: null,
  updateJobConfig: null,
  updateJobEnable: null,
  updateJobDisable: null,
  deleteJob: null,
  deleteJobAll: null,
   // submission
  startJob: null,
  stopJob: null,
  jobStatus: null,
  getSubmissionAll: null,
  getSubmissionByJobName: null
})

export const jobStatusTypes = {
  allJobStatus: ['BOOTING', 'FAILURE_ON_SUBMIT', 'RUNNING', 'SUCCEEDED', 'FAILED', 'NEVER_EXECUTED', 'UNKNOWN'],
  startJobSucceedStatus: ['BOOTING', 'RUNNING', 'SUCCEEDED']
}
