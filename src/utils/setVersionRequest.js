/**
 * Created by Chyroc on 17/1/11.
 */

import { formatUrl } from './formatUtils'

const versionBasicPath = 'version'

export function setGetVersionOptions (baseUrl, userName) {
  const url = formatUrl(baseUrl, userName, versionBasicPath)
  return url
}