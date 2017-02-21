import _ from 'lodash'
import {
  simpleVersion,
  version,
  sqoopConnectorCount,
  hasoopMethodTypes,
  jobStatusTypes
} from './constant'
import {
  splitLinkConfig,
  splitJobConfig,
  splitSubmissionConfig
} from './utils'

const returnEmptyObject = responseJson => _.isEqual(responseJson, {})

const defaultEmptyData = (success, responseJson) => success ? {} : responseJson

const successGenList = {
  [hasoopMethodTypes.getVersion]: (responseJson) => _.get(responseJson, 'api-versions[0]') === version,
  [hasoopMethodTypes.getDriver]: (responseJson) => responseJson.version === simpleVersion && _.get(responseJson, ['all-config-resources', 'jarConfig.label']) === 'Classpath configuration',
  [hasoopMethodTypes.getConnectorAll]: (responseJson) => responseJson.connectors.length === sqoopConnectorCount && _.includes(_.map(responseJson.connectors, 'name'), 'generic-jdbc-connector'),
  [hasoopMethodTypes.getConnectorByConnectorName]: (responseJson, connectorName) => _.get(responseJson, 'connectors[0].name') === connectorName,
  [hasoopMethodTypes.getLinkAll]: (responseJson) => true,
  [hasoopMethodTypes.getLinkByConnectorName]: (responseJson) => true,
  [hasoopMethodTypes.getLinkByLinkName]: (responseJson, linkName) => {
    const linkConfig = splitLinkConfig(responseJson)
    return linkConfig.name === linkName && _.difference(['id', 'enabled', 'connectorName'], _.keys(linkConfig)).length === 0
  },
  [hasoopMethodTypes.createLink]: (responseJson, linkName) => _.isEqual(responseJson, {
    name: linkName,
    'validation-result': [{}]
  }),
  [hasoopMethodTypes.updateLinkConfig]: (responseJson) => _.isEqual(responseJson, {'validation-result': [{}]}),
  [hasoopMethodTypes.updateLinkEnable]: returnEmptyObject,
  [hasoopMethodTypes.updateLinkDisable]: returnEmptyObject,
  [hasoopMethodTypes.deleteLink]: returnEmptyObject,
  [hasoopMethodTypes.deleteLinkAll]: returnEmptyObject,
  [hasoopMethodTypes.getJobAll]: (responseJson) => true,
  [hasoopMethodTypes.getJobByJobName]: (responseJson, jobName) => {
    const jobConfig = splitJobConfig(responseJson)
    return jobConfig.topName === jobName && _.difference(['topName', 'topEnabled', 'topFromLinkName', 'topToLinkName'], _.keys(jobConfig)).length === 0
  },
  [hasoopMethodTypes.getJobByConnectorName]: (responseJson) => true,
  [hasoopMethodTypes.createJob]: (responseJson, jobName) => _.isEqual(responseJson, {
    name: jobName,
    'validation-result': [{}, {}, {}]
  }),
  [hasoopMethodTypes.updateJobEnable]: returnEmptyObject,
  [hasoopMethodTypes.updateJobDisable]: returnEmptyObject,
  [hasoopMethodTypes.deleteJob]: returnEmptyObject,
  [hasoopMethodTypes.deleteJobAll]: returnEmptyObject,
  [hasoopMethodTypes.startJob]: (responseJson, jobName) => {
    const submissionConfig = splitSubmissionConfig(responseJson)
    return submissionConfig.topConfig.jobName === jobName && _.includes(jobStatusTypes.startJobSucceedStatus, submissionConfig.topConfig.status) && submissionConfig.fromSchemaConfig.columns.length > 0
  },
  [hasoopMethodTypes.stopJob]: (responseJson, jobName) => {
    const submissionConfig = splitSubmissionConfig(responseJson)
    return submissionConfig.topConfig.jobName === jobName && submissionConfig.topConfig.status === 'FAILED' && submissionConfig.topConfig.errorDetails === 'Application killed by user.'
  },
  [hasoopMethodTypes.jobStatus]: (responseJson, jobName) => {
    const submissionConfig = splitSubmissionConfig(responseJson)
    return submissionConfig.topConfig.jobName === jobName && _.includes(jobStatusTypes.allJobStatus, submissionConfig.topConfig.status)
  },
  [hasoopMethodTypes.getSubmissionAll]: (responseJson) => true,
  [hasoopMethodTypes.getSubmissionByJobName]: (responseJson) => true
}

const dataGenList = {
  [hasoopMethodTypes.getVersion]: (success, responseJson) => responseJson,
  [hasoopMethodTypes.getDriver]: (success, responseJson) => responseJson,
  [hasoopMethodTypes.getConnectorAll]: (success, responseJson) => success ? responseJson.connectors : responseJson,
  [hasoopMethodTypes.getConnectorByConnectorName]: (success, responseJson) => success ? responseJson.connectors[0] : responseJson,
  [hasoopMethodTypes.getLinkAll]: (success, responseJson) => responseJson.links,
  [hasoopMethodTypes.getLinkByConnectorName]: (success, responseJson) => _.map(responseJson.links, linkObject => splitLinkConfig({links: [linkObject]})),
  [hasoopMethodTypes.getLinkByLinkName]: (success, responseJson) => success ? splitLinkConfig(responseJson) : responseJson,
  [hasoopMethodTypes.createLink]: (success, responseJson) => success ? responseJson.name : responseJson,
  [hasoopMethodTypes.updateLinkConfig]: defaultEmptyData,
  [hasoopMethodTypes.updateLinkEnable]: defaultEmptyData,
  [hasoopMethodTypes.updateLinkDisable]: defaultEmptyData,
  [hasoopMethodTypes.deleteLink]: defaultEmptyData,
  [hasoopMethodTypes.deleteLinkAll]: defaultEmptyData,
  [hasoopMethodTypes.getJobAll]: (success, responseJson) => _.map(responseJson.jobs, jobObject => splitJobConfig({jobs: [jobObject]})),
  [hasoopMethodTypes.getJobByJobName]: (success, responseJson) => success ? splitJobConfig(responseJson) : responseJson,
  [hasoopMethodTypes.getJobByConnectorName]: (success, responseJson) => _.map(responseJson.jobs, jobObject => splitJobConfig({jobs: [jobObject]})),
  [hasoopMethodTypes.createJob]: (success, responseJson) => success ? responseJson.name : responseJson,
  [hasoopMethodTypes.updateJobEnable]: defaultEmptyData,
  [hasoopMethodTypes.updateJobDisable]: defaultEmptyData,
  [hasoopMethodTypes.deleteJob]: defaultEmptyData,
  [hasoopMethodTypes.deleteJobAll]: defaultEmptyData,
  [hasoopMethodTypes.startJob]: (success, responseJson) => success ? splitSubmissionConfig(responseJson) : responseJson,
  [hasoopMethodTypes.stopJob]: (success, responseJson) => success ? splitSubmissionConfig(responseJson) : responseJson,
  [hasoopMethodTypes.jobStatus]: (success, responseJson) => success ? splitSubmissionConfig(responseJson) : responseJson,
  [hasoopMethodTypes.getSubmissionAll]: (success, responseJson) => responseJson,
  [hasoopMethodTypes.getSubmissionByJobName]: (success, responseJson) => responseJson
}

export const successFromHeaders = res => res.headers.get('sqoop-error-code') === '1000' && res.headers.get('sqoop-error-message') === 'OK'

export const getResponseHeaders = res => ({
  sqoopErrorCode: res.headers.get('sqoop-error-code'),
  sqoopErrorMessage: res.headers.get('sqoop-error-message'),
  sqoopInternalErrorCode: res.headers.get('sqoop-internal-error-code') || null,
  sqoopInternalErrorMessage: res.headers.get('sqoop-internal-error-message') || null
})

export async function hasoopRequestHandle (methodName, res, ...params) {
  if (!Object.keys(hasoopMethodTypes).includes(methodName)) {
    throw new Error(`hasoop method ${methodName} is not exist`)
  }

  const responseJson = await res.json()
  const responseHeaders = getResponseHeaders(res)
  if (!successFromHeaders(res)) {
    return {success: false, data: responseJson, headers: responseHeaders}
  }

  const handleMethodGen = (successGen, dataGen) => (responseJson, headers, ...otherParams) => {
    const success = successGen(responseJson, ...otherParams)
    const data = dataGen(success, responseJson, ...otherParams)
    return {success, data, headers}
  }

  const successGen = successGenList[methodName]
  const dataGen = dataGenList[methodName]
  const handleMethod = handleMethodGen(successGen, dataGen)
  return handleMethod(responseJson, responseHeaders, ...params)
}
