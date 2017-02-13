import url from 'url'
import _ from 'lodash'
import path from 'path'
import querystring from 'querystring'
import { splitJobConfig } from './utils'
import { setCreateJobRequestBody, setUpdateJobRequestBody } from './setJobOptions'
import { setCreateLinkRequestBody, setUpdateLinkRequestBody } from './setLinkOptions'
import { sendGetRequest, sendPostRequest, sendPutRequest, sendDeleteRequest } from './sendRequest'
import { version, sqoopAction, hasoopMethodTypes } from './constant'
export * from './constant'
export * from './dispose'
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
  constructor (config) {
    this.userName = config.userName
    this.host = config.host
    this.port = config.port
    this.weapp = config.webapp
  }

  /**
   * use some param to create a sqoop rest api url.
   *
   * @param basicPath
   * @param queryObject
   * @param otherPath
   * @returns {*}
   */
  formatUrl ([basicPath, queryObject = {}], ...otherPath) {
    _.set(queryObject, ['user.name'], this.userName)
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

  async launchRequest (methodName, ...params) {
    if (!Object.keys(hasoopMethodTypes).includes(methodName)) {
      throw Error(`hasoop method ${methodName} is not supported`)
    }
    const res = await this[methodName](...params)
    if (res.headers.get('sqoop-error-code') === '1000' && res.headers.get('sqoop-error-message') === 'OK') {
      return await res.json()
    } else {
      const errorMessage = res.headers.get('sqoop-internal-error-message')
      throw new Error(`Hasoop error of ${errorMessage}`)
    }
  }

  /**
   * get sqoop server version.
   *
   * @returns {*}
   */
  getVersion () {
    const url = this.formatUrl([versionUri])
    return sendGetRequest(url)
  }

  /**
   * get infos of all drivers.
   *
   * @returns {*}
   */
  getDriver () {
    const url = this.formatUrl([driverUri], sqoopAction.all)
    return sendGetRequest(url)
  }

  /**
   * get infos of all connectors.
   *
   * @returns {*}
   */
  getConnectorAll () {
    const url = this.formatUrl([connectorUri], sqoopAction.all)
    return sendGetRequest(url)
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
  }

  /**
   * get infos of all links.
   *
   * @returns {*}
   */
  getLinkAll () {
    const url = this.formatUrl([linkUri], sqoopAction.all)
    return sendGetRequest(url)
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
  }

  /**
   * delete all links on sqoop server.
   *
   * @returns {*}
   */
  async deleteLinkAll () {
    const data = await this.launchRequest(hasoopMethodTypes.getLinkAll)
    const deleteList = data.links.map(link => this.deleteLink(link.name))
    return await Promise.all(deleteList)
  }

  /**
   * get infos of all jobs.
   *
   * @returns {*}
   */
  getJobAll () {
    const url = this.formatUrl([jobUri], sqoopAction.all)
    return sendGetRequest(url)
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
  }

  /**
   * get info of job by connector name.
   *
   * @param connectorName
   * @returns {*}
   */
  getJobByConnectorName (connectorName) {
    const url = this.formatUrl([jobUri, {
      [sqoopAction.cname]: connectorName
    }],
      sqoopAction.all
    )
    return sendGetRequest(url)
  }

  /**
   * create job.
   *
   * @param config
   * @returns {*}
   */
  async createJob (config) {
    const fromLinkInfo = await this.launchRequest(hasoopMethodTypes.getLinkByLinkName, config['fromLinkName'])
    const toLinkInfo = await this.launchRequest(hasoopMethodTypes.getLinkByLinkName, config['toLinkName'])
    const body = setCreateJobRequestBody(config.jobName, config.jobConfig, fromLinkInfo, toLinkInfo)
    const url = this.formatUrl([jobUri])
    return sendPostRequest(url, JSON.stringify(body))
  }

  /**
   * update job config.
   *
   * @param oldJobName
   * @param config
   * @returns {*}
   */
  async updateJobConfig (oldJobName, config) {
    const oldJobConfig = splitJobConfig(await this.launchRequest(hasoopMethodTypes.getJobByJobName, oldJobName))
    const fromLinkInfo = await this.launchRequest(hasoopMethodTypes.getLinkByLinkName, config['fromLinkName'])
    const toLinkInfo = await this.launchRequest(hasoopMethodTypes.getLinkByLinkName, config['toLinkName'])
    const body = setUpdateJobRequestBody(config.jobName, config.jobConfig, fromLinkInfo, toLinkInfo, oldJobConfig.topId)
    const url = this.formatUrl([jobUri], oldJobName)
    return sendPutRequest(url, JSON.stringify(body))
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
  }

  /**
   * delete all jobs on sqoop server.
   *
   * @returns {*}
   */
  async deleteJobAll () {
    const data = await this.launchRequest(hasoopMethodTypes.getJobAll)
    const deleteList = data.jobs.map(job => this.deleteJob(job.name))
    return await Promise.all(deleteList)
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
  }

  /**
   * get infos of all submissions.
   *
   * @returns {*}
   */
  getSubmissionAll () {
    const url = this.formatUrl([submissionsUri], sqoopAction.all)
    return sendGetRequest(url)
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
  }
}
