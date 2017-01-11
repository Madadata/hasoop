/**
 * Created by Chyroc on 17/1/10.
 */

import { sendGetRequest } from './utils/sendRequest'

const url = require('url');

export class Hasoop {
  constructor (config) {
    this.userName = config.userName
    this.host = config.host
    this.port = config.port
    this.weapp = config.webapp

    this.versionUri = 'version'
    this.driverUri = 'v1/driver'
  }

  formatUrl ([basicPath, queryString = {}], ...otherPath) {
    queryString['user.name'] = this.userName
    const query = Object.keys(queryString)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(queryString[k]))
      .join('&')
    let path = [this.weapp, basicPath, otherPath].join('/')
    path = path.substring(0, path.length - 1)
    const urlObj = {
      protocol: 'http:',
      slashes: true,
      hostname: this.host,
      port: this.port,
      search: '?' + query,
      pathname: path
    }
    return url.format(urlObj);
  }

  getVersion () {
    const url = this.formatUrl([this.versionUri])
    return sendGetRequest(url)
  }

  getDriver () {
    const url = this.formatUrl([this.driverUri],'all')
    return sendGetRequest(url)
  }
}