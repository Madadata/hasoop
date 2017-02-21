import url from 'url'
import path from 'path'
import querystring from 'querystring'
import {
  setCreateJobRequestBody
} from './setJobOptions'
import {
  setCreateLinkRequestBody,
  setUpdateLinkRequestBody
} from './setLinkOptions'
import {
  sendGetRequest,
  sendPostRequest,
  sendPutRequest,
  sendDeleteRequest
} from './sendRequest'
import {
  version,
  sqoopAction
} from './constant'
import { hasoopRequestHandle } from './handle'
export * from './constant'
export * from './handle'
export * from './utils'

const versionUri = 'version'
const driverUri = `${version}/driver`
const connectorUri = `${version}/connector`
const linkUri = `${version}/link`
const jobUri = `${version}/job`
const submissionsUri = `${version}/submissions`

/**
 * Hasoop client, get your own instance by creating an instance.
 */
export default class Hasoop {
  constructor ({userName, host, port, webapp}) {
    this.userName = userName
    this.host = host
    this.port = port
    this.weapp = webapp
  }

  /**
   * use some param to create a sqoop rest api url.
   * @param {string} basicPath - basicPath
   * @param {Object} queryObject - queryObject
   * @param {Array<string>} otherPath - other paths
   */
  formatUrl ([basicPath, queryObject = {}], ...otherPath) {
    queryObject['user.name'] = this.userName
    const urlQuery = querystring.stringify(queryObject)
    const urlPath = path.join(
      this.weapp,
      basicPath,
      ...otherPath
    )
    const urlObj = {
      protocol: 'http:',
      slashes: true,
      hostname: this.host,
      port: this.port,
      search: '?' + urlQuery,
      pathname: urlPath
    }
    return url.format(urlObj)
  }

  /**
   * get sqoop server version.
   *
   * @returns {*}
   */
  async getVersion () {
    const url = this.formatUrl([versionUri])
    return sendGetRequest(url)
      .then(res => hasoopRequestHandle('getVersion', res))
  }

  /**
   * get infos of all drivers.
   *
   * @returns {*}
   */
  async getDriver () {
    const url = this.formatUrl([driverUri], sqoopAction.all)
    return sendGetRequest(url)
      .then(res => hasoopRequestHandle('getDriver', res))
  }

  /**
   * get infos of all connectors.
   *
   * @returns {*}
   */
  getConnectorAll () {
    const url = this.formatUrl([connectorUri], sqoopAction.all)
    return sendGetRequest(url)
      .then(res => hasoopRequestHandle('getConnectorAll', res))
  }

  /**
   * get info of connector by connector name.
   *
   * @param connectorName
   * @returns {*}
   */
  getConnectorByConnectorName (connectorName) {
    const url = this.formatUrl([connectorUri], connectorName)
    return sendGetRequest(url)
      .then(res => hasoopRequestHandle('getConnectorByConnectorName', res, connectorName))
  }

  /**
   * get infos of all links.
   *
   * @returns {*}
   */
  getLinkAll () {
    const url = this.formatUrl([linkUri], sqoopAction.all)
    return sendGetRequest(url)
      .then(res => hasoopRequestHandle('getLinkAll', res))
  }

  /**
   * get info of link by connector name.
   *
   * @param connectorName
   * @returns {*}
   */
  getLinkByConnectorName (connectorName) {
    const url = this.formatUrl([linkUri, {[sqoopAction.cname]: connectorName}], sqoopAction.all)
    return sendGetRequest(url)
      .then(res => hasoopRequestHandle('getLinkByConnectorName', res))
  }

  /**
   * get info of link by link name.
   *
   * @param linkName
   * @returns {*}
   */
  getLinkByLinkName (linkName) {
    const url = this.formatUrl([linkUri], linkName)
    return sendGetRequest(url)
      .then(res => hasoopRequestHandle('getLinkByLinkName', res, linkName))
  }

  /**
   * create link.
   *
   * @param config
   * @returns {*}
   */
  createLink (config) {
    const body = setCreateLinkRequestBody(config)
    const url = this.formatUrl([linkUri])
    return sendPostRequest(url, JSON.stringify(body))
      .then(res => hasoopRequestHandle('createLink', res, config.linkName))
  }

  /**
   * update link config.
   *
   * @param oldLinkName
   * @param config
   * @returns {*}
   */
  updateLinkConfig (oldLinkName, config) {
    const body = setUpdateLinkRequestBody(config)
    const url = this.formatUrl([linkUri], oldLinkName)
    return sendPutRequest(url, JSON.stringify(body))
      .then(res => hasoopRequestHandle('updateLinkConfig', res))
  }

  /**
   * change link to enable by link name.
   *
   * @param linkName
   * @returns {*}
   */
  updateLinkEnable (linkName) {
    const url = this.formatUrl([linkUri], linkName, sqoopAction.enable)
    return sendPutRequest(url)
      .then(res => hasoopRequestHandle('updateLinkEnable', res))
  }

  /**
   * change link to disable by link name.
   *
   * @param linkName
   * @returns {*}
   */
  updateLinkDisable (linkName) {
    const url = this.formatUrl([linkUri], linkName, sqoopAction.disable)
    return sendPutRequest(url)
      .then(res => hasoopRequestHandle('updateLinkDisable', res))
  }

  /**
   * delete link by link name.
   *
   * @param linkName
   * @returns {*}
   */
  deleteLink (linkName) {
    const url = this.formatUrl([linkUri], linkName)
    return sendDeleteRequest(url)
      .then(res => hasoopRequestHandle('deleteLink', res))
  }

  /**
   * get infos of all jobs.
   *
   * @returns {*}
   */
  getJobAll () {
    const url = this.formatUrl([jobUri], sqoopAction.all)
    return sendGetRequest(url)
      .then(res => hasoopRequestHandle('getJobAll', res))
  }

  /**
   * get info of job by job name.
   *
   * @param JobName
   * @returns {*}
   */
  getJobByJobName (JobName) {
    const url = this.formatUrl([jobUri], JobName)
    return sendGetRequest(url)
      .then(res => hasoopRequestHandle('getJobByJobName', res, JobName))
  }

  /**
   * get info of job by connector name.
   *
   * @param connectorName
   * @returns {*}
   */
  getJobByConnectorName (connectorName) {
    const url = this.formatUrl([jobUri, {[sqoopAction.cname]: connectorName}],
      sqoopAction.all
    )
    return sendGetRequest(url)
      .then(res => hasoopRequestHandle('getJobByConnectorName', res))
  }

  /**
   * create job.
   *
   * @param config
   * @returns {*}
   */
  async createJob (config) {
    const fromLinkInfo = await this.getLinkByLinkName(config['fromLinkName'])
    const toLinkInfo = await this.getLinkByLinkName(config['toLinkName'])
    const body = setCreateJobRequestBody(config.jobName, config.jobConfig, fromLinkInfo.data, toLinkInfo.data)
    const url = this.formatUrl([jobUri])
    return sendPostRequest(url, JSON.stringify(body))
      .then(res => hasoopRequestHandle('createJob', res, config.jobName))
  }

  /**
   * change job to enable by job name.
   *
   * @param jobName
   * @returns {*}
   */
  updateJobEnable (jobName) {
    const url = this.formatUrl([jobUri], jobName, sqoopAction.enable)
    return sendPutRequest(url)
      .then(res => hasoopRequestHandle('updateJobEnable', res, jobName))
  }

  /**
   * change job to disable by job name.
   *
   * @param jobName
   * @returns {*}
   */
  updateJobDisable (jobName) {
    const url = this.formatUrl([jobUri], jobName, sqoopAction.disable)
    return sendPutRequest(url)
      .then(res => hasoopRequestHandle('updateJobDisable', res, jobName))
  }

  /**
   * delete job by job name.
   *
   * @param jobName
   * @returns {*}
   */
  deleteJob (jobName) {
    const url = this.formatUrl([jobUri], jobName)
    return sendDeleteRequest(url)
      .then(res => hasoopRequestHandle('deleteJob', res, jobName))
  }

  /**
   * start job by job name.
   *
   * @param jobName
   * @returns {*}
   */
  startJob (jobName) {
    const url = this.formatUrl([jobUri], jobName, sqoopAction.start)
    return sendPutRequest(url)
      .then(res => hasoopRequestHandle('startJob', res, jobName))
  }

  /**
   * stop job by job name.
   *
   * @param jobName
   * @returns {*}
   */
  stopJob (jobName) {
    const url = this.formatUrl([jobUri], jobName, sqoopAction.stop)
    return sendPutRequest(url)
      .then(res => hasoopRequestHandle('stopJob', res, jobName))
  }

  /**
   * get status of job by job name.
   *
   * @param jobName
   * @returns {*}
   */
  jobStatus (jobName) {
    const url = this.formatUrl([jobUri], jobName, sqoopAction.status)
    return sendGetRequest(url)
      .then(res => hasoopRequestHandle('jobStatus', res, jobName))
  }

  /**
   * get infos of all submissions.
   *
   * @returns {*}
   */
  getSubmissionAll () {
    const url = this.formatUrl([submissionsUri], sqoopAction.all)
    return sendGetRequest(url)
      .then(res => hasoopRequestHandle('getSubmissionAll', res))
  }

  /**
   * get info of submission by job name.
   *
   * @param jobName
   * @returns {*}
   */
  getSubmissionByJobName (jobName) {
    const url = this.formatUrl([submissionsUri, {[sqoopAction.jname]: jobName}], sqoopAction.all)
    return sendGetRequest(url)
      .then(res => hasoopRequestHandle('getSubmissionByJobName', res))
  }
}
