/**
 * Created by Chyroc on 17/1/10.
 */

import { sendGetRequest, senPostRequest, senPutRequest, senDeleteRequest } from './sendRequest'
import { setCreateLinkRequestBody, setUpdateLinkRequestBody } from './setLinkOptions'

import url from 'url'
import path from 'path'
import querystring from 'querystring'

const versionUri = 'version'
const driverUri = 'v1/driver'
const connectorUri = 'v1/connector'
const linkUri = 'v1/link'

export class Hasoop {
  constructor (config) {
    this.userName = config.userName
    this.host = config.host
    this.port = config.port
    this.weapp = config.webapp
  }

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

  //version
  getVersion () {
    const url = this.formatUrl([versionUri])
    return sendGetRequest(url)
  }

  //driver
  getDriver () {
    const url = this.formatUrl([driverUri], 'all')
    return sendGetRequest(url)
  }

  //connector
  getConnectorAll () {
    const url = this.formatUrl([connectorUri], 'all')
    return sendGetRequest(url)
  }

  getConnectorByConnectorName (connectorName) {
    const url = this.formatUrl([connectorUri], connectorName)
    return sendGetRequest(url)
  }

  //link
  createLink (config) {
    const body = setCreateLinkRequestBody(config)
    const url = this.formatUrl([linkUri])
    return senPostRequest(url, JSON.stringify(body))
  }

  updateLinkConfig (oldLinkName, config) {
    const body = setUpdateLinkRequestBody(config)
    const url = this.formatUrl([linkUri], oldLinkName)
    return senPutRequest(url, JSON.stringify(body))
  }

  updateLinkEnable (linkName) {
    const url = this.formatUrl([linkUri], linkName, 'enable')
    return senPutRequest(url)
  }

  updateLinkDisable (linkName) {
    const url = this.formatUrl([linkUri], linkName, 'disable')
    return senPutRequest(url)
  }

  getLinkAll () {
    const url = this.formatUrl([linkUri], 'all')
    return sendGetRequest(url)
  }

  getLinkByConnectorName (connectorName) {
    const url = this.formatUrl([linkUri, {'cname': connectorName}], 'all')
    return sendGetRequest(url)
  }

  getLinkByLinkName (linkName) {
    const url = this.formatUrl([linkUri], linkName)
    return sendGetRequest(url)
  }

  deleteLink (linkName) {
    const url = this.formatUrl([linkUri], linkName)
    return senDeleteRequest(url)
  }

  async deleteLinkAll () {
    const data = await this.getLinkAll()
    const links = data['links']
    for (let i = 0; i < links.length; i++) {
      await this.deleteLink(links[i]['name'])
    }
  }
}
