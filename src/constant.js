import keyMirror from 'keyMirror'

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

/**
 * type of all hasoop method
 */
export const hasoopMethod = keyMirror({
  getVersion: null,
  getDriver: null,
  getConnectorAll: null,
  getConnectorByConnectorName: null,
  getLinkAll: null,
  getLinkByConnectorName: null,
  getLinkByLinkName: null,
  createLink: null,
  updateLinkConfig: null,
  updateLinkEnable: null,
  updateLinkDisable: null,
  deleteLink: null,
  deleteLinkAll: null,
  getJobAll: null,
  getJobByJobName: null,
  getJobByConnectorName: null,
  createJob: null,
  updateJobConfig: null,
  updateJobEnable: null,
  updateJobDisable: null,
  deleteJob: null,
  deleteJobAll: null,
  startJob: null,
  stopJob: null,
  jobStatus: null,
  getSubmissionAll: null,
  getSubmissionByJobName: null
})
