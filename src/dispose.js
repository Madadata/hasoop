import _ from 'lodash'
import { simpleVersion, version, sqoopConnectorCount, hasoopMethodTypes } from './constant'
import { splitLinkConfig, splitJobConfig, splitSubmissionConfig } from './utils'

const isRightGenList = {
  [hasoopMethodTypes.getVersion]: (responseJson) => _.get(responseJson, 'api-versions[0]') === version,
  [hasoopMethodTypes.getDriver]: (responseJson) => responseJson.version === simpleVersion && _.get(responseJson, ['all-config-resources', 'jarConfig.label']) === 'Classpath configuration',
  [hasoopMethodTypes.getConnectorAll]: (responseJson) => responseJson.connectors.length === sqoopConnectorCount && _.includes(_.map(responseJson.connectors, 'name'), 'generic-jdbc-connector'),
  [hasoopMethodTypes.getConnectorByConnectorName]: (responseJson, connectorName) => _.get(responseJson, 'connectors[0].name') === connectorName,
  [hasoopMethodTypes.getLinkAll]: (responseJson) => true,
  [hasoopMethodTypes.getLinkByConnectorName]: (responseJson) => true,
  [hasoopMethodTypes.getLinkByLinkName]: (responseJson, linkName) => {
    const linkConfig = splitLinkConfig(responseJson)
    const linkConfigKeys = _.keys(linkConfig)
    return linkConfig.name === linkName && _.includes(linkConfigKeys, 'id') && _.includes(linkConfigKeys, 'enabled') && _.includes(linkConfigKeys, 'connectorName')
  },
  [hasoopMethodTypes.createLink]: (responseJson, linkName) => _.isEqual(responseJson, {name: linkName, 'validation-result': [{}]}),
  [hasoopMethodTypes.updateLinkConfig]: (responseJson) => _.isEqual(responseJson, {'validation-result': [{}]}),
  [hasoopMethodTypes.updateLinkEnable]: (responseJson) => _.isEqual(responseJson, {}),
  [hasoopMethodTypes.updateLinkDisable]: (responseJson) => _.isEqual(responseJson, {}),
  [hasoopMethodTypes.deleteLink]: (responseJson) => _.isEqual(responseJson, {}),
  [hasoopMethodTypes.deleteLinkAll]: (responseJson) => _.isEqual(responseJson, {}),
  [hasoopMethodTypes.getJobAll]: (responseJson) => _.map(responseJson.jobs, jobObject => splitJobConfig({jobs: [jobObject]})),
  [hasoopMethodTypes.getJobByJobName]: (responseJson, jobName) => {
    const jobConfig = splitJobConfig(responseJson)
    const jobConfigKeys = _.keys(jobConfig)
    return jobConfig.topName === jobName && _.includes(jobConfigKeys, 'topName') && _.includes(jobConfigKeys, 'topEnabled') && _.includes(jobConfigKeys, 'topFromLinkName') && _.includes(jobConfigKeys, 'topToLinkName')
  },
  [hasoopMethodTypes.getJobByConnectorName]: (responseJson) => true,
  [hasoopMethodTypes.createJob]: (responseJson, jobName) => _.isEqual(responseJson, { name: jobName, 'validation-result': [ {}, {}, {} ] }),
  [hasoopMethodTypes.updateJobConfig]: (responseJson) => _.isEqual(responseJson, {'validation-result': [{}, {}, {}]}),
  [hasoopMethodTypes.updateJobEnable]: (responseJson) => _.isEqual(responseJson, {}),
  [hasoopMethodTypes.updateJobDisable]: (responseJson) => _.isEqual(responseJson, {}),
  [hasoopMethodTypes.deleteJob]: (responseJson) => _.isEqual(responseJson, {}),
  [hasoopMethodTypes.deleteJobAll]: (responseJson) => _.isEqual(responseJson, {}),
  [hasoopMethodTypes.startJob]: (responseJson, jobName) => {
    const submissionConfig = splitSubmissionConfig(responseJson)
    return submissionConfig.topConfig.jobName === jobName && _.includes(['BOOTING', 'RUNNING', 'SUCCEEDED'], submissionConfig.topConfig.status) && submissionConfig.fromSchemaConfig.columns.length > 0
  },
  [hasoopMethodTypes.stopJob]: (responseJson, jobName) => {
    const submissionConfig = splitSubmissionConfig(responseJson)
    return submissionConfig.topConfig.jobName === jobName && submissionConfig.topConfig.status === 'FAILED' && submissionConfig.topConfig.errorDetails === 'Application killed by user.'
  },
  [hasoopMethodTypes.jobStatus]: (responseJson, jobName) => {
    const submissionConfig = splitSubmissionConfig(responseJson)
    return submissionConfig.topConfig.jobName === jobName && _.includes(['BOOTING', 'FAILURE_ON_SUBMIT', 'RUNNING', 'SUCCEEDED', 'FAILED', 'NEVER_EXECUTED', 'UNKNOWN'], submissionConfig.topConfig.status)
  },
  [hasoopMethodTypes.getSubmissionAll]: (responseJson) => true,
  [hasoopMethodTypes.getSubmissionByJobName]: (responseJson) => true
}

const dataGenList = {
  [hasoopMethodTypes.getVersion]: (isRight, responseJson) => responseJson,
  [hasoopMethodTypes.getDriver]: (isRight, responseJson) => responseJson,
  [hasoopMethodTypes.getConnectorAll]: (isRight, responseJson) => isRight ? responseJson.connectors : responseJson,
  [hasoopMethodTypes.getConnectorByConnectorName]: (isRight, responseJson) => isRight ? responseJson.connectors[0] : responseJson,
  [hasoopMethodTypes.getLinkAll]: (isRight, responseJson) => responseJson.links,
  [hasoopMethodTypes.getLinkByConnectorName]: (isRight, responseJson) => _.map(responseJson.links, linkObject => splitLinkConfig({links: [linkObject]})),
  [hasoopMethodTypes.getLinkByLinkName]: (isRight, responseJson) => isRight ? splitLinkConfig(responseJson) : responseJson,
  [hasoopMethodTypes.createLink]: (isRight, responseJson) => isRight ? responseJson.name : responseJson,
  [hasoopMethodTypes.updateLinkConfig]: (isRight, responseJson) => isRight ? {} : responseJson,
  [hasoopMethodTypes.updateLinkEnable]: (isRight, responseJson) => isRight ? {} : responseJson,
  [hasoopMethodTypes.updateLinkDisable]: (isRight, responseJson) => isRight ? {} : responseJson,
  [hasoopMethodTypes.deleteLink]: (isRight, responseJson) => isRight ? {} : responseJson,
  [hasoopMethodTypes.deleteLinkAll]: (isRight, responseJson) => isRight ? {} : responseJson,
  [hasoopMethodTypes.getJobAll]: (isRight, responseJson) => _.map(responseJson.jobs, jobObject => splitJobConfig({jobs: [jobObject]})),
  [hasoopMethodTypes.getJobByJobName]: (isRight, responseJson) => isRight ? splitJobConfig(responseJson) : responseJson,
  [hasoopMethodTypes.getJobByConnectorName]: (isRight, responseJson) => _.map(responseJson.jobs, jobObject => splitJobConfig({jobs: [jobObject]})),
  [hasoopMethodTypes.createJob]: (isRight, responseJson) => isRight ? responseJson.name : responseJson,
  [hasoopMethodTypes.updateJobConfig]: (isRight, responseJson) => isRight ? {} : responseJson,
  [hasoopMethodTypes.updateJobEnable]: (isRight, responseJson) => isRight ? {} : responseJson,
  [hasoopMethodTypes.updateJobDisable]: (isRight, responseJson) => isRight ? {} : responseJson,
  [hasoopMethodTypes.deleteJob]: (isRight, responseJson) => isRight ? {} : responseJson,
  [hasoopMethodTypes.deleteJobAll]: (isRight, responseJson) => isRight ? {} : responseJson,
  [hasoopMethodTypes.startJob]: (isRight, responseJson) => isRight ? splitSubmissionConfig(responseJson) : responseJson,
  [hasoopMethodTypes.stopJob]: (isRight, responseJson) => isRight ? splitSubmissionConfig(responseJson) : responseJson,
  [hasoopMethodTypes.jobStatus]: (isRight, responseJson) => isRight ? splitSubmissionConfig(responseJson) : responseJson,
  [hasoopMethodTypes.getSubmissionAll]: (isRight, responseJson) => responseJson,
  [hasoopMethodTypes.getSubmissionByJobName]: (isRight, responseJson) => responseJson
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

  const disposeMethodGen = (isRightGen, dataGen) => {
    (responseJson, headers, ...otherParams) => {
      const isRight = isRightGen(responseJson, ...otherParams)
      const data = dataGen(isRight, responseJson, ...otherParams)
      return { isRight, data, headers }
    }
  }

  const isRightGen = isRightGenList[methodName]
  const dataGen = dataGenList[methodName]
  const disposeMethod = disposeMethodGen(isRightGen, dataGen)
  return disposeMethod(responseJson, responseHeaders, ...params)
}
