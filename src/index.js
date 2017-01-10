/**
 * Created by Chyroc on 17/1/10.
 */

import { getVersion } from './version'

export class Hasoop {
  constructor (config) {
    this.config = config
    this.userName = config.userName
    this.baseUrl = config.host + ':' + config.port + '/' + config.webapp
  }

  getVersion = getVersion

}