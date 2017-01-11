/**
 * Created by Chyroc on 17/1/10.
 */

import { sendGetRequest } from './utils/sendRequest'

import url from 'url'
import path from 'path'
import querystring from 'querystring'

export class Hasoop {
  constructor (config) {
    this.userName = config.userName
    this.host = config.host
    this.port = config.port
    this.weapp = config.webapp

    this.versionUri = 'version'
  }

  formatUrl ([basicPath, queryObject = {}], ...otherPath) {
    queryObject['user.name'] = this.userName
    const urlQuery = querystring.stringify(queryObject)
    const urlPath = path.join(this.weapp, basicPath, otherPath.length === 0 ? '' : path.join(otherPath))
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
    const url = this.formatUrl([this.versionUri])
    return sendGetRequest(url)
  }
}