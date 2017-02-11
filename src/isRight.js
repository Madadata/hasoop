import keymirror from 'keymirror'

export const hasoopMethodTypes = keymirror({
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
  getSubmissionByJobNam: null
})

function getVersionDispose (responseJson, responseHeaders) {
  return {isRight: true, data: responseJson, headers: responseHeaders}
}
function getDriverDispose (responseJson, responseHeaders) {
  return {isRight: true, data: responseJson, headers: responseHeaders}
}
function getConnectorAllDispose (responseJson, responseHeaders) {
  return {isRight: true, data: responseJson, headers: responseHeaders}
}
function getConnectorByConnectorNameDispose (responseJson, responseHeaders) {
  return {isRight: true, data: responseJson, headers: responseHeaders}
}
function getLinkAllDispose (responseJson, responseHeaders) {
  return {isRight: true, data: responseJson, headers: responseHeaders}
}
function getLinkByConnectorNameDispose (responseJson, responseHeaders) {
  return {isRight: true, data: responseJson, headers: responseHeaders}
}
function getLinkByLinkNameDispose (responseJson, responseHeaders) {
  return {isRight: true, data: responseJson, headers: responseHeaders}
}
function createLinkDispose (responseJson, responseHeaders) {
  return {isRight: true, data: responseJson, headers: responseHeaders}
}
function updateLinkConfigDispose (responseJson, responseHeaders) {
  return {isRight: true, data: responseJson, headers: responseHeaders}
}
function updateLinkEnableDispose (responseJson, responseHeaders) {
  return {isRight: true, data: responseJson, headers: responseHeaders}
}
function updateLinkDisableDispose (responseJson, responseHeaders) {
  return {isRight: true, data: responseJson, headers: responseHeaders}
}
function deleteLinkDispose (responseJson, responseHeaders) {
  return {isRight: true, data: responseJson, headers: responseHeaders}
}
function deleteLinkAllDispose (responseJson, responseHeaders) {
  return {isRight: true, data: responseJson, headers: responseHeaders}
}
function getJobAllDispose (responseJson, responseHeaders) {
  return {isRight: true, data: responseJson, headers: responseHeaders}
}
function getJobByJobNameDispose (responseJson, responseHeaders) {
  return {isRight: true, data: responseJson, headers: responseHeaders}
}
function getJobByConnectorNameDispose (responseJson, responseHeaders) {
  return {isRight: true, data: responseJson, headers: responseHeaders}
}
function createJobDispose (responseJson, responseHeaders) {
  return {isRight: true, data: responseJson, headers: responseHeaders}
}
function updateJobConfigDispose (responseJson, responseHeaders) {
  return {isRight: true, data: responseJson, headers: responseHeaders}
}
function updateJobEnableDispose (responseJson, responseHeaders) {
  return {isRight: true, data: responseJson, headers: responseHeaders}
}
function updateJobDisableDispose (responseJson, responseHeaders) {
  return {isRight: true, data: responseJson, headers: responseHeaders}
}
function deleteJobDispose (responseJson, responseHeaders) {
  return {isRight: true, data: responseJson, headers: responseHeaders}
}
function deleteJobAllDispose (responseJson, responseHeaders) {
  return {isRight: true, data: responseJson, headers: responseHeaders}
}
function startJobDispose (responseJson, responseHeaders) {
  return {isRight: true, data: responseJson, headers: responseHeaders}
}
function stopJobDispose (responseJson, responseHeaders) {
  return {isRight: true, data: responseJson, headers: responseHeaders}
}
function jobStatusDispose (responseJson, responseHeaders) {
  return {isRight: true, data: responseJson, headers: responseHeaders}
}
function getSubmissionAllDispose (responseJson, responseHeaders) {
  return {isRight: true, data: responseJson, headers: responseHeaders}
}
function getSubmissionByJobNameDispose (responseJson, responseHeaders) {
  return {isRight: true, data: responseJson, headers: responseHeaders}
}

const isRightFromHeaders = res => res.headers.get('sqoop-error-code') === '1000' && res.headers.get('sqoop-error-message') === 'OK'

const getResponseHeaders = res => [{
  sqoopErrorCode: res.headers.get('sqoop-error-code'),
  sqoopErrorMessage: res.headers.get('sqoop-error-message'),
  sqoopInternalErrorCode: res.headers.get('sqoop-internal-error-code') || null,
  sqoopInternalErrorMessage: res.headers.get('sqoop-internal-error-message') || null
}]

export async function isHasoopRequestRight (methodName, res) {
  if (!Object.keys(hasoopMethodTypes).includes(methodName)) {
    throw new Error(`hasoop method ${methodName} is not supported`)
  }

  const responseJson = await res.json()
  const responseHeaders = getResponseHeaders(res)

  if (!isRightFromHeaders(res)) {
    return {isRight: false, data: responseJson, headers: responseHeaders}
  }
  switch (methodName) {
    case hasoopMethodTypes.getVersion:
      return getVersionDispose(responseJson, responseHeaders)
    case hasoopMethodTypes.getDriver:
      return getDriverDispose(responseJson, responseHeaders)
    case hasoopMethodTypes.getConnectorAll:
      return getConnectorAllDispose(responseJson, responseHeaders)
    case hasoopMethodTypes.getConnectorByConnectorName:
      return getConnectorByConnectorNameDispose(responseJson, responseHeaders)
    case hasoopMethodTypes.getLinkAll:
      return getLinkAllDispose(responseJson, responseHeaders)
    case hasoopMethodTypes.getLinkByConnectorName:
      return getLinkByConnectorNameDispose(responseJson, responseHeaders)
    case hasoopMethodTypes.getLinkByLinkName:
      return getLinkByLinkNameDispose(responseJson, responseHeaders)
    case hasoopMethodTypes.createLink:
      return createLinkDispose(responseJson, responseHeaders)
    case hasoopMethodTypes.updateLinkConfig:
      return updateLinkConfigDispose(responseJson, responseHeaders)
    case hasoopMethodTypes.updateLinkEnable:
      return updateLinkEnableDispose(responseJson, responseHeaders)
    case hasoopMethodTypes.updateLinkDisable:
      return updateLinkDisableDispose(responseJson, responseHeaders)
    case hasoopMethodTypes.deleteLink:
      return deleteLinkDispose(responseJson, responseHeaders)
    case hasoopMethodTypes.deleteLinkAll:
      return deleteLinkAllDispose(responseJson, responseHeaders)
    case hasoopMethodTypes.getJobAll:
      return getJobAllDispose(responseJson, responseHeaders)
    case hasoopMethodTypes.getJobByJobName:
      return getJobByJobNameDispose(responseJson, responseHeaders)
    case hasoopMethodTypes.getJobByConnectorName:
      return getJobByConnectorNameDispose(responseJson, responseHeaders)
    case hasoopMethodTypes.createJob:
      return createJobDispose(responseJson, responseHeaders)
    case hasoopMethodTypes.updateJobConfig:
      return updateJobConfigDispose(responseJson, responseHeaders)
    case hasoopMethodTypes.updateJobEnable:
      return updateJobEnableDispose(responseJson, responseHeaders)
    case hasoopMethodTypes.updateJobDisable:
      return updateJobDisableDispose(responseJson, responseHeaders)
    case hasoopMethodTypes.deleteJob:
      return deleteJobDispose(responseJson, responseHeaders)
    case hasoopMethodTypes.deleteJobAll:
      return deleteJobAllDispose(responseJson, responseHeaders)
    case hasoopMethodTypes.startJob:
      return startJobDispose(responseJson, responseHeaders)
    case hasoopMethodTypes.stopJob:
      return stopJobDispose(responseJson, responseHeaders)
    case hasoopMethodTypes.jobStatus:
      return jobStatusDispose(responseJson, responseHeaders)
    case hasoopMethodTypes.getSubmissionAll:
      return getSubmissionAllDispose(responseJson, responseHeaders)
    case hasoopMethodTypes.getSubmissionByJobName:
      return getSubmissionByJobNameDispose(responseJson, responseHeaders)
    default:
      throw new Error(`hasoop method ${methodName} is not supported`)
  }
}
