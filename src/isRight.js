import _ from 'lodash'
import keymirror from 'keymirror'
import { splitLinkConfig } from './utils'

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
  const isOk = responseJson.version === '1' && _.get(responseJson, ['all-config-resources', 'jarConfig.label']) === 'Classpath configuration'
  return {isRight: isOk, data: responseJson, headers: responseHeaders}
}
function getConnectorAllDispose (responseJson, responseHeaders) {
  // TODO generic-jdbc-connector
  // const connectorNames = _.map(json.connectors, 'name')
  const isOk = responseJson.connectors.length === 7
  return {isRight: isOk, data: responseJson, headers: responseHeaders}
}
function getConnectorByConnectorNameDispose (responseJson, responseHeaders, connectorName) {
  const isOk = _.get(responseJson, 'connectors[0].name') === connectorName
  return {isRight: isOk, data: responseJson, headers: responseHeaders}
}
function getLinkAllDispose (responseJson, responseHeaders) {
  return {isRight: true, data: responseJson, headers: responseHeaders}
}
function getLinkByConnectorNameDispose (responseJson, responseHeaders) {
  return {isRight: true, data: responseJson, headers: responseHeaders}
}
function getLinkByLinkNameDispose (responseJson, responseHeaders, linkName) {
  const linkConfig = splitLinkConfig(responseJson)
  // TODO have key 'id', 'enabled', 'connectorName'
  const isOk = linkConfig.name === linkName
  return {isRight: isOk, data: responseJson, headers: responseHeaders}
}
function createLinkDispose (responseJson, responseHeaders, linkName) {
  const isOk = responseJson === {name: linkName, 'validation-result': [{}]}
  return {isRight: isOk, data: responseJson, headers: responseHeaders}
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

export async function isHasoopRequestRight (methodName, res, ...params) {
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
      return getVersionDispose(responseJson, responseHeaders, ...params)
    case hasoopMethodTypes.getDriver:
      return getDriverDispose(responseJson, responseHeaders, ...params)
    case hasoopMethodTypes.getConnectorAll:
      return getConnectorAllDispose(responseJson, responseHeaders, ...params)
    case hasoopMethodTypes.getConnectorByConnectorName:
      return getConnectorByConnectorNameDispose(responseJson, responseHeaders, ...params)
    case hasoopMethodTypes.getLinkAll:
      return getLinkAllDispose(responseJson, responseHeaders, ...params)
    case hasoopMethodTypes.getLinkByConnectorName:
      return getLinkByConnectorNameDispose(responseJson, responseHeaders, ...params)
    case hasoopMethodTypes.getLinkByLinkName:
      return getLinkByLinkNameDispose(responseJson, responseHeaders, ...params)
    case hasoopMethodTypes.createLink:
      return createLinkDispose(responseJson, responseHeaders, ...params)
    case hasoopMethodTypes.updateLinkConfig:
      return updateLinkConfigDispose(responseJson, responseHeaders, ...params)
    case hasoopMethodTypes.updateLinkEnable:
      return updateLinkEnableDispose(responseJson, responseHeaders, ...params)
    case hasoopMethodTypes.updateLinkDisable:
      return updateLinkDisableDispose(responseJson, responseHeaders, ...params)
    case hasoopMethodTypes.deleteLink:
      return deleteLinkDispose(responseJson, responseHeaders, ...params)
    case hasoopMethodTypes.deleteLinkAll:
      return deleteLinkAllDispose(responseJson, responseHeaders, ...params)
    case hasoopMethodTypes.getJobAll:
      return getJobAllDispose(responseJson, responseHeaders, ...params)
    case hasoopMethodTypes.getJobByJobName:
      return getJobByJobNameDispose(responseJson, responseHeaders, ...params)
    case hasoopMethodTypes.getJobByConnectorName:
      return getJobByConnectorNameDispose(responseJson, responseHeaders, ...params)
    case hasoopMethodTypes.createJob:
      return createJobDispose(responseJson, responseHeaders, ...params)
    case hasoopMethodTypes.updateJobConfig:
      return updateJobConfigDispose(responseJson, responseHeaders, ...params)
    case hasoopMethodTypes.updateJobEnable:
      return updateJobEnableDispose(responseJson, responseHeaders, ...params)
    case hasoopMethodTypes.updateJobDisable:
      return updateJobDisableDispose(responseJson, responseHeaders, ...params)
    case hasoopMethodTypes.deleteJob:
      return deleteJobDispose(responseJson, responseHeaders, ...params)
    case hasoopMethodTypes.deleteJobAll:
      return deleteJobAllDispose(responseJson, responseHeaders, ...params)
    case hasoopMethodTypes.startJob:
      return startJobDispose(responseJson, responseHeaders, ...params)
    case hasoopMethodTypes.stopJob:
      return stopJobDispose(responseJson, responseHeaders, ...params)
    case hasoopMethodTypes.jobStatus:
      return jobStatusDispose(responseJson, responseHeaders, ...params)
    case hasoopMethodTypes.getSubmissionAll:
      return getSubmissionAllDispose(responseJson, responseHeaders, ...params)
    case hasoopMethodTypes.getSubmissionByJobName:
      return getSubmissionByJobNameDispose(responseJson, responseHeaders, ...params)
    default:
      throw new Error(`hasoop method ${methodName} is not supported`)
  }
}
