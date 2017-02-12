import _ from 'lodash'
import { simpleVersion, version, sqoopConnectorCount, hasoopMethodTypes } from './constant'
import { splitLinkConfig, splitJobConfig, splitSubmissionConfig } from './utils'

function getVersionDispose (responseJson, responseHeaders) {
  const isRight = _.get(responseJson, 'api-versions[0]') === version
  return {isRight, data: responseJson, headers: responseHeaders}
}
function getDriverDispose (responseJson, responseHeaders) {
  const isRight = responseJson.version === simpleVersion && _.get(responseJson, ['all-config-resources', 'jarConfig.label']) === 'Classpath configuration'
  return {isRight, data: responseJson, headers: responseHeaders}
}
function getConnectorAllDispose (responseJson, responseHeaders) {
  const connectorNames = _.map(responseJson.connectors, 'name')
  const isRight = responseJson.connectors.length === sqoopConnectorCount && _.includes(connectorNames, 'generic-jdbc-connector')
  const data = isRight ? responseJson.connectors : responseJson
  return {isRight, data, headers: responseHeaders}
}
function getConnectorByConnectorNameDispose (responseJson, responseHeaders, connectorName) {
  const isRight = _.get(responseJson, 'connectors[0].name') === connectorName
  const data = isRight ? responseJson.connectors[0] : responseJson
  return {isRight, data, headers: responseHeaders}
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
  const isRight = linkConfig.name === linkName && _.includes(linkConfigKeys, 'id') && _.includes(linkConfigKeys, 'enabled') && _.includes(linkConfigKeys, 'connectorName')
  const data = isRight ? linkConfig : responseJson
  return {isRight, data, headers: responseHeaders}
}
function createLinkDispose (responseJson, responseHeaders, linkName) {
  const isRight = _.isEqual(responseJson, {name: linkName, 'validation-result': [{}]})
  const data = isRight ? responseJson.name : responseJson
  return {isRight, data, headers: responseHeaders}
}
function updateLinkConfigDispose (responseJson, responseHeaders) {
  const isRight = _.isEqual(responseJson, {'validation-result': [{}]})
  const data = isRight ? {} : responseJson
  return {isRight, data, headers: responseHeaders}
}
function updateLinkEnableDispose (responseJson, responseHeaders) {
  const isRight = _.isEqual(responseJson, {})
  const data = isRight ? {} : responseJson
  return {isRight, data, headers: responseHeaders}
}
function updateLinkDisableDispose (responseJson, responseHeaders) {
  const isRight = _.isEqual(responseJson, {})
  const data = isRight ? {} : responseJson
  return {isRight, data, headers: responseHeaders}
}
function deleteLinkDispose (responseJson, responseHeaders) {
  const isRight = _.isEqual(responseJson, {})
  const data = isRight ? {} : responseJson
  return {isRight, data, headers: responseHeaders}
}
function deleteLinkAllDispose (responseJson, responseHeaders) {
  const isRight = _.isEqual(responseJson, {})
  const data = isRight ? {} : responseJson
  return {isRight, data, headers: responseHeaders}
}
function getJobAllDispose (responseJson, responseHeaders) {
  const jobConfigs = _.map(responseJson.jobs, jobObject => splitJobConfig({jobs: [jobObject]}))
  return {isRight: true, data: jobConfigs, headers: responseHeaders}
}
function getJobByJobNameDispose (responseJson, responseHeaders, jobName) {
  const jobConfig = splitJobConfig(responseJson)
  const jobConfigKeys = _.keys(jobConfig)
  const isRight = jobConfig.topName === jobName && _.includes(jobConfigKeys, 'topName') && _.includes(jobConfigKeys, 'topEnabled') && _.includes(jobConfigKeys, 'topFromLinkName') && _.includes(jobConfigKeys, 'topToLinkName')
  const data = isRight ? jobConfig : responseJson
  return {isRight, data: data, headers: responseHeaders}
}
function getJobByConnectorNameDispose (responseJson, responseHeaders, connectorName) {
  const jobConfigs = _.map(responseJson.jobs, jobObject => splitJobConfig({jobs: [jobObject]}))
  return {isRight: true, data: jobConfigs, headers: responseHeaders}
}
function createJobDispose (responseJson, responseHeaders, jobName) {
  const isRight = _.isEqual(responseJson, { name: jobName, 'validation-result': [ {}, {}, {} ] })
  const data = isRight ? responseJson.name : responseJson
  return {isRight, data: data, headers: responseHeaders}
}
function updateJobConfigDispose (responseJson, responseHeaders) {
  const isRight = _.isEqual(responseJson, {'validation-result': [{}, {}, {}]})
  const data = isRight ? {} : responseJson
  return {isRight, data, headers: responseHeaders}
}
function updateJobEnableDispose (responseJson, responseHeaders) {
  const isRight = _.isEqual(responseJson, {})
  const data = isRight ? {} : responseJson
  return {isRight, data, headers: responseHeaders}
}
function updateJobDisableDispose (responseJson, responseHeaders) {
  const isRight = _.isEqual(responseJson, {})
  const data = isRight ? {} : responseJson
  return {isRight, data, headers: responseHeaders}
}
function deleteJobDispose (responseJson, responseHeaders) {
  const isRight = _.isEqual(responseJson, {})
  const data = isRight ? {} : responseJson
  return {isRight, data, headers: responseHeaders}
}
function deleteJobAllDispose (responseJson, responseHeaders) {
  const isRight = _.isEqual(responseJson, {})
  const data = isRight ? {} : responseJson
  return {isRight, data, headers: responseHeaders}
}
function startJobDispose (responseJson, responseHeaders, jobName) {
  const submissionConfig = splitSubmissionConfig(responseJson)
  const isRight = submissionConfig.topConfig.jobName === jobName && _.includes(['BOOTING', 'RUNNING', 'SUCCEEDED'], submissionConfig.topConfig.status) && submissionConfig.fromSchemaConfig.columns.length > 0
  const data = isRight ? submissionConfig : responseJson
  return {isRight, data, headers: responseHeaders}
}
function stopJobDispose (responseJson, responseHeaders, jobName) {
  const submissionConfig = splitSubmissionConfig(responseJson)
  const isRight = submissionConfig.topConfig.jobName === jobName && submissionConfig.topConfig.status === 'FAILED' && submissionConfig.topConfig.errorDetails === 'Application killed by user.'
  const data = isRight ? submissionConfig : responseJson
  return {isRight, data, headers: responseHeaders}
}
function jobStatusDispose (responseJson, responseHeaders, jobName) {
  const submissionConfig = splitSubmissionConfig(responseJson)
  const isRight = submissionConfig.topConfig.jobName === jobName && _.includes(['BOOTING', 'FAILURE_ON_SUBMIT', 'RUNNING', 'SUCCEEDED', 'FAILED', 'NEVER_EXECUTED', 'UNKNOWN'], submissionConfig.topConfig.status)
  const data = isRight ? submissionConfig : responseJson
  return {isRight, data, headers: responseHeaders}
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
