import _ from 'lodash'
import { simpleVersion, version, sqoopConnectorCount, hasoopMethodTypes, jobStatusTypes } from './constant'
import { splitLinkConfig, splitJobConfig, splitSubmissionConfig } from './utils'

const returnEmptyObject = responseJson => _.isEqual(responseJson, {})

const defaultEmptyData = (isRight, responseJson) => isRight ? {} : responseJson

const isRightGenList = {
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
  [hasoopMethodTypes.createLink]: (responseJson, linkName) => _.isEqual(responseJson, {name: linkName, 'validation-result': [{}]}),
  [hasoopMethodTypes.updateLinkConfig]: (responseJson) => _.isEqual(responseJson, {'validation-result': [{}]}),
  [hasoopMethodTypes.updateLinkEnable]: returnEmptyObject,
  [hasoopMethodTypes.updateLinkDisable]: returnEmptyObject,
  [hasoopMethodTypes.deleteLink]: returnEmptyObject,
  [hasoopMethodTypes.deleteLinkAll]: returnEmptyObject,
  [hasoopMethodTypes.getJobAll]: (responseJson) => _.map(responseJson.jobs, jobObject => splitJobConfig({jobs: [jobObject]})),
  [hasoopMethodTypes.getJobByJobName]: (responseJson, jobName) => {
    const jobConfig = splitJobConfig(responseJson)
    return jobConfig.topName === jobName && _.difference(['topName', 'topEnabled', 'topFromLinkName', 'topToLinkName'], _.keys(jobConfig)).length === 0
  },
  [hasoopMethodTypes.getJobByConnectorName]: (responseJson) => true,
  [hasoopMethodTypes.createJob]: (responseJson, jobName) => _.isEqual(responseJson, { name: jobName, 'validation-result': [ {}, {}, {} ] }),
  [hasoopMethodTypes.updateJobConfig]: (responseJson) => _.isEqual(responseJson, {'validation-result': [{}, {}, {}]}),
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
  [hasoopMethodTypes.getVersion]: (isRight, responseJson) => responseJson,
  [hasoopMethodTypes.getDriver]: (isRight, responseJson) => responseJson,
  [hasoopMethodTypes.getConnectorAll]: (isRight, responseJson) => isRight ? responseJson.connectors : responseJson,
  [hasoopMethodTypes.getConnectorByConnectorName]: (isRight, responseJson) => isRight ? responseJson.connectors[0] : responseJson,
  [hasoopMethodTypes.getLinkAll]: (isRight, responseJson) => responseJson.links,
  [hasoopMethodTypes.getLinkByConnectorName]: (isRight, responseJson) => _.map(responseJson.links, linkObject => splitLinkConfig({links: [linkObject]})),
  [hasoopMethodTypes.getLinkByLinkName]: (isRight, responseJson) => isRight ? splitLinkConfig(responseJson) : responseJson,
  [hasoopMethodTypes.createLink]: (isRight, responseJson) => isRight ? responseJson.name : responseJson,
  [hasoopMethodTypes.updateLinkConfig]: defaultEmptyData,
  [hasoopMethodTypes.updateLinkEnable]: defaultEmptyData,
  [hasoopMethodTypes.updateLinkDisable]: defaultEmptyData,
  [hasoopMethodTypes.deleteLink]: defaultEmptyData,
  [hasoopMethodTypes.deleteLinkAll]: defaultEmptyData,
  [hasoopMethodTypes.getJobAll]: (isRight, responseJson) => _.map(responseJson.jobs, jobObject => splitJobConfig({jobs: [jobObject]})),
  [hasoopMethodTypes.getJobByJobName]: (isRight, responseJson) => isRight ? splitJobConfig(responseJson) : responseJson,
  [hasoopMethodTypes.getJobByConnectorName]: (isRight, responseJson) => _.map(responseJson.jobs, jobObject => splitJobConfig({jobs: [jobObject]})),
  [hasoopMethodTypes.createJob]: (isRight, responseJson) => isRight ? responseJson.name : responseJson,
  [hasoopMethodTypes.updateJobConfig]: defaultEmptyData,
  [hasoopMethodTypes.updateJobEnable]: defaultEmptyData,
  [hasoopMethodTypes.updateJobDisable]: defaultEmptyData,
  [hasoopMethodTypes.deleteJob]: defaultEmptyData,
  [hasoopMethodTypes.deleteJobAll]: defaultEmptyData,
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
