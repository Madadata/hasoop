/**
 * Created by Chyroc on 17/1/10.
 */

import { sendGetRequest, senPostRequest } from './sendRequest'
import { setCreateLinkRequestBody } from './setLinkOptions'

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
    return url.format(urlObj);
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
  createLink (linkName, config) {
    const body = setCreateLinkRequestBody(linkName, config)
    // console.log(JSON.stringify(body))
    const url = this.formatUrl([linkUri])
    return senPostRequest(url, body)
  }

  updateLinkConfig () {

  }

  updateLinkEnable () {

  }

  updateLinkDisable () {

  }

  deleteLink () {

  }

  getLinkAll () {
    const url = this.formatUrl([linkUri], 'all')
    return sendGetRequest(url)
  }

  getLinkByConnectorName () {

  }

  getLinkByLinkName () {

  }
}