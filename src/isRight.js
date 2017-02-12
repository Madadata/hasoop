import _ from 'lodash'
import keymirror from 'keymirror'
import { splitLinkConfig, splitJobConfig, splitSubmissionConfig } from './utils'

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
  const isOk = _.get(responseJson, 'api-versions[0]') === 'v1'
  return {isRight: isOk, data: responseJson, headers: responseHeaders}
}
function getDriverDispose (responseJson, responseHeaders) {
  const isOk = responseJson.version === '1' && _.get(responseJson, ['all-config-resources', 'jarConfig.label']) === 'Classpath configuration'
  return {isRight: isOk, data: responseJson, headers: responseHeaders}
}
function getConnectorAllDispose (responseJson, responseHeaders) {
  const connectorNames = _.map(responseJson.connectors, 'name')
  const isOk = responseJson.connectors.length === 7 && _.includes(connectorNames, 'generic-jdbc-connector')
  const data = isOk ? responseJson.connectors : responseJson
  return {isRight: isOk, data, headers: responseHeaders}
}
function getConnectorByConnectorNameDispose (responseJson, responseHeaders, connectorName) {
  const isOk = _.get(responseJson, 'connectors[0].name') === connectorName
  const data = isOk ? responseJson.connectors[0] : responseJson
  return {isRight: isOk, data, headers: responseHeaders}
}
function getLinkAllDispose (responseJson, responseHeaders, linkName) {
  return {isRight: true, data: responseJson.links, headers: responseHeaders}
}
function getLinkByConnectorNameDispose (responseJson, responseHeaders) {
  const data = _.map(responseJson.links, linkObject => splitLinkConfig({links: [linkObject]}))
  return {isRight: true, data, headers: responseHeaders}
}
function getLinkByLinkNameDispose (responseJson, responseHeaders, linkName) {
  const linkConfig = splitLinkConfig(responseJson)
  const linkConfigKeys = _.keys(linkConfig)
  const isOk = linkConfig.name === linkName && _.includes(linkConfigKeys, 'id') && _.includes(linkConfigKeys, 'enabled') && _.includes(linkConfigKeys, 'connectorName')
  const data = isOk ? linkConfig : responseJson
  return {isRight: isOk, data, headers: responseHeaders}
}
function createLinkDispose (responseJson, responseHeaders, linkName) {
  const isOk = _.isEqual(responseJson, {name: linkName, 'validation-result': [{}]})
  const data = isOk ? responseJson.name : responseJson
  return {isRight: isOk, data, headers: responseHeaders}
}
function updateLinkConfigDispose (responseJson, responseHeaders) {
  const isOk = _.isEqual(responseJson, {'validation-result': [{}]})
  const data = isOk ? {} : responseJson
  return {isRight: isOk, data, headers: responseHeaders}
}
function updateLinkEnableDispose (responseJson, responseHeaders) {
  const isOk = _.isEqual(responseJson, {})
  const data = isOk ? {} : responseJson
  return {isRight: isOk, data, headers: responseHeaders}
}
function updateLinkDisableDispose (responseJson, responseHeaders) {
  const isOk = _.isEqual(responseJson, {})
  const data = isOk ? {} : responseJson
  return {isRight: isOk, data, headers: responseHeaders}
}
function deleteLinkDispose (responseJson, responseHeaders) {
  const isOk = _.isEqual(responseJson, {})
  const data = isOk ? {} : responseJson
  return {isRight: isOk, data, headers: responseHeaders}
}
function deleteLinkAllDispose (responseJson, responseHeaders) {
  const isOk = _.isEqual(responseJson, {})
  const data = isOk ? {} : responseJson
  return {isRight: isOk, data, headers: responseHeaders}
}
function getJobAllDispose (responseJson, responseHeaders) {
  const jobConfigs = _.map(responseJson.jobs, jobObject => splitJobConfig({jobs: [jobObject]}))
  return {isRight: true, data: jobConfigs, headers: responseHeaders}
}
function getJobByJobNameDispose (responseJson, responseHeaders, jobName) {
  const jobConfig = splitJobConfig(responseJson)
  const jobConfigKeys = _.keys(jobConfig)
  const isOK = jobConfig.topName === jobName && _.includes(jobConfigKeys, 'topName') && _.includes(jobConfigKeys, 'topEnabled') && _.includes(jobConfigKeys, 'topFromLinkName') && _.includes(jobConfigKeys, 'topToLinkName')
  const data = isOK ? jobConfig : responseJson
  return {isRight: isOK, data: data, headers: responseHeaders}
}
function getJobByConnectorNameDispose (responseJson, responseHeaders, connectorName) {
  const jobConfigs = _.map(responseJson.jobs, jobObject => splitJobConfig({jobs: [jobObject]}))
  return {isRight: true, data: jobConfigs, headers: responseHeaders}
}
function createJobDispose (responseJson, responseHeaders, jobName) {
  const isOk = _.isEqual(responseJson, { name: jobName, 'validation-result': [ {}, {}, {} ] })
  const data = isOk ? responseJson.name : responseJson
  return {isRight: isOk, data: data, headers: responseHeaders}
}
function updateJobConfigDispose (responseJson, responseHeaders) {
  const isOk = _.isEqual(responseJson, {'validation-result': [{}, {}, {}]})
  const data = isOk ? {} : responseJson
  return {isRight: isOk, data, headers: responseHeaders}
}
function updateJobEnableDispose (responseJson, responseHeaders) {
  const isOk = _.isEqual(responseJson, {})
  const data = isOk ? {} : responseJson
  return {isRight: isOk, data, headers: responseHeaders}
}
function updateJobDisableDispose (responseJson, responseHeaders) {
  const isOk = _.isEqual(responseJson, {})
  const data = isOk ? {} : responseJson
  return {isRight: isOk, data, headers: responseHeaders}
}
function deleteJobDispose (responseJson, responseHeaders) {
  const isOk = _.isEqual(responseJson, {})
  const data = isOk ? {} : responseJson
  return {isRight: isOk, data, headers: responseHeaders}
}
function deleteJobAllDispose (responseJson, responseHeaders) {
  const isOk = _.isEqual(responseJson, {})
  const data = isOk ? {} : responseJson
  return {isRight: isOk, data, headers: responseHeaders}
}
function startJobDispose (responseJson, responseHeaders, jobName) {
  const submissionConfig = splitSubmissionConfig(responseJson)
  const isOk = submissionConfig.topConfig.jobName === jobName && _.includes(['BOOTING', 'RUNNING', 'SUCCEEDED'], submissionConfig.topConfig.status) && submissionConfig.fromSchemaConfig.columns.length > 0
  const data = isOk ? submissionConfig : responseJson
  return {isRight: isOk, data, headers: responseHeaders}
}
function stopJobDispose (responseJson, responseHeaders, jobName) {
  const submissionConfig = splitSubmissionConfig(responseJson)
  const isOk = submissionConfig.topConfig.jobName === jobName && submissionConfig.topConfig.status === 'FAILED' && submissionConfig.topConfig.errorDetails === 'Application killed by user.'
  const data = isOk ? submissionConfig : responseJson
  return {isRight: isOk, data, headers: responseHeaders}
}
function jobStatusDispose (responseJson, responseHeaders, jobName) {
  const submissionConfig = splitSubmissionConfig(responseJson)
  const isOk = submissionConfig.topConfig.jobName === jobName && _.includes(['BOOTING', 'FAILURE_ON_SUBMIT', 'RUNNING', 'SUCCEEDED', 'FAILED', 'NEVER_EXECUTED', 'UNKNOWN'], submissionConfig.topConfig.status)
  const data = isOk ? submissionConfig : responseJson
  return {isRight: isOk, data, headers: responseHeaders}
}
function getSubmissionAllDispose (responseJson, responseHeaders) {
  // TODO
  return {isRight: true, data: responseJson, headers: responseHeaders}
}
function getSubmissionByJobNameDispose (responseJson, responseHeaders) {
  // TODO
  return {isRight: true, data: responseJson, headers: responseHeaders}
}

export const isRightFromHeaders = res => res.headers.get('sqoop-error-code') === '1000' && res.headers.get('sqoop-error-message') === 'OK'

export const getResponseHeaders = res => ({
  sqoopErrorCode: res.headers.get('sqoop-error-code'),
  sqoopErrorMessage: res.headers.get('sqoop-error-message'),
  sqoopInternalErrorCode: res.headers.get('sqoop-internal-error-code') || null,
  sqoopInternalErrorMessage: res.headers.get('sqoop-internal-error-message') || null
})

export async function hasoopRequestDispose (methodName, res, ...params) {
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
