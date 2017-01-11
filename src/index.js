/**
 * Created by Chyroc on 17/1/10.
 */

import { sendGetRequest } from './utils/sendRequest'

import url from 'url'
import path from 'path'
import querystring from 'querystring'

const versionUri = 'version'
const driverUri = 'v1/driver'

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

  getVersion () {
    const url = this.formatUrl([versionUri])
    return sendGetRequest(url)
  }

  getDriver () {
    const url = this.formatUrl([driverUri], 'all')
    return sendGetRequest(url)
  }
}