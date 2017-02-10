import url from 'url'
import _ from 'lodash'
import path from 'path'
import keyMirror from 'keymirror'
import querystring from 'querystring'

import { sendGetRequest, sendPostRequest, sendPutRequest, sendDeleteRequest } from './sendRequest'
import { setCreateLinkRequestBody, setUpdateLinkRequestBody } from './setLinkOptions'
import { setCreateJobRequestBody, setUpdateJobRequestBody } from './setJobOptions'
import { splitJobConfig } from './utils'

export * from './utils'

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

export const linkType = keyMirror({
  mysql: null,
  hdfs: null
})

const sqoopAction = keyMirror({
  start: null,
  stop: null,
  status: null,

  all: null,
  jname: null,
  cname: null,

  enable: null,
  disable: null
})

export const version = 'v1'
const versionUri = 'version'
const driverUri = `${version}/driver`
const connectorUri = `${version}/connector`
const linkUri = `${version}/link`
const jobUri = `${version}/job`
const submissionsUri = `${version}/submissions`

/**
 * Hasoop client, get your own instance by creating an instance.
 */
export const HASOOP_METHODS = keyMirror({
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

export default class Hasoop {
  constructor (config) {
    this.userName = config.userName
    this.host = config.host
    this.port = config.port
    this.weapp = config.webapp
  }

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

  async doMethod (methodName, ...params) {
    if (!Object.keys(HASOOP_METHODS).includes(methodName)) {
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

  /** version */
  getVersion () {
    const url = this.formatUrl([versionUri])
    return sendGetRequest(url)
  }

  /** driver */
  getDriver () {
    const url = this.formatUrl([driverUri], sqoopAction.all)
    return sendGetRequest(url)
  }

  /**  connector */
  getConnectorAll () {
    const url = this.formatUrl([connectorUri], sqoopAction.all)
    return sendGetRequest(url)
  }

  getConnectorByConnectorName (connectorName) {
    const url = this.formatUrl([connectorUri], connectorName)
    return sendGetRequest(url)
  }

  /** link */
  getLinkAll () {
    const url = this.formatUrl([linkUri], sqoopAction.all)
    return sendGetRequest(url)
  }

  getLinkByConnectorName (connectorName) {
    const url = this.formatUrl([linkUri, {[sqoopAction.cname]: connectorName}], sqoopAction.all)
    return sendGetRequest(url)
  }

  getLinkByLinkName (linkName) {
    const url = this.formatUrl([linkUri], linkName)
    return sendGetRequest(url)
  }

  createLink (config) {
    const body = setCreateLinkRequestBody(config)
    const url = this.formatUrl([linkUri])
    return sendPostRequest(url, JSON.stringify(body))
  }

  updateLinkConfig (oldLinkName, config) {
    const body = setUpdateLinkRequestBody(config)
    const url = this.formatUrl([linkUri], oldLinkName)
    return sendPutRequest(url, JSON.stringify(body))
  }

  updateLinkEnable (linkName) {
    const url = this.formatUrl([linkUri], linkName, sqoopAction.enable)
    return sendPutRequest(url)
  }

  updateLinkDisable (linkName) {
    const url = this.formatUrl([linkUri], linkName, sqoopAction.disable)
    return sendPutRequest(url)
  }

  deleteLink (linkName) {
    const url = this.formatUrl([linkUri], linkName)
    return sendDeleteRequest(url)
  }

  async deleteLinkAll () {
    const data = await this.doMethod(HASOOP_METHODS.getLinkAll)
    const deleteList = data.links.map(link => this.deleteLink(link.name))
    return await Promise.all(deleteList)
  }

  // job
  getJobAll () {
    const url = this.formatUrl([jobUri], sqoopAction.all)
    return sendGetRequest(url)
  }

  getJobByJobName (JobName) {
    const url = this.formatUrl([jobUri], JobName)
    return sendGetRequest(url)
  }

  getJobByConnectorName (connectorName) {
    const url = this.formatUrl([jobUri, {
      [sqoopAction.cname]: connectorName
    }],
      sqoopAction.all
    )
    return sendGetRequest(url)
  }

  async createJob (config) {
    const fromLinkInfo = await this.doMethod(HASOOP_METHODS.getLinkByLinkName, config['fromLinkName'])
    const toLinkInfo = await this.doMethod(HASOOP_METHODS.getLinkByLinkName, config['toLinkName'])
    const body = setCreateJobRequestBody(config.jobName, config.jobConfig, fromLinkInfo, toLinkInfo)
    const url = this.formatUrl([jobUri])
    return sendPostRequest(url, JSON.stringify(body))
  }

  async updateJobConfig (oldJobName, config) {
    const oldJobConfig = splitJobConfig(await this.doMethod(HASOOP_METHODS.getJobByJobName, oldJobName))
    const fromLinkInfo = await this.doMethod(HASOOP_METHODS.getLinkByLinkName, config['fromLinkName'])
    const toLinkInfo = await this.doMethod(HASOOP_METHODS.getLinkByLinkName, config['toLinkName'])
    const body = setUpdateJobRequestBody(config.jobName, config.jobConfig, fromLinkInfo, toLinkInfo, oldJobConfig.topId)
    const url = this.formatUrl([jobUri], oldJobName)
    return sendPutRequest(url, JSON.stringify(body))
  }

  updateJobEnable (jobName) {
    const url = this.formatUrl([jobUri], jobName, sqoopAction.enable)
    return sendPutRequest(url)
  }

  updateJobDisable (jobName) {
    const url = this.formatUrl([jobUri], jobName, sqoopAction.disable)
    return sendPutRequest(url)
  }

  deleteJob (jobName) {
    const url = this.formatUrl([jobUri], jobName)
    return sendDeleteRequest(url)
  }

  async deleteJobAll () {
    const data = await this.doMethod(HASOOP_METHODS.getJobAll)
    const deleteList = data.jobs.map(job => this.deleteJob(job.name))
    return await Promise.all(deleteList)
  }

  startJob (jobName) {
    const url = this.formatUrl([jobUri], jobName, sqoopAction.start)
    return sendPutRequest(url)
  }

  stopJob (jobName) {
    const url = this.formatUrl([jobUri], jobName, sqoopAction.stop)
    return sendPutRequest(url)
  }

  jobStatus (jobName) {
    const url = this.formatUrl([jobUri], jobName, sqoopAction.status)
    return sendGetRequest(url)
  }

  // submission
  getSubmissionAll () {
    const url = this.formatUrl([submissionsUri], sqoopAction.all)
    return sendGetRequest(url)
  }

  getSubmissionByJobName (jobName) {
    const url = this.formatUrl([submissionsUri, {[sqoopAction.jname]: jobName}], sqoopAction.all)
    return sendGetRequest(url)
  }
}
