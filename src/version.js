/**
 * Created by Chyroc on 17/1/10.
 */

import { sendGetRequest } from './utils/sendRequest'
import { setGetVersionOptions } from './utils/setVersionRequest'

export function getVersion () {
  const url = setGetVersionOptions(this.baseUrl, this.userName)
  return sendGetRequest(url)
}