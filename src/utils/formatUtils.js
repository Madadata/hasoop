/**
 * Created by Chyroc on 17/1/10.
 */

export function formatUrl (baseUrl, userName, versionBasicPath, queryString = {}, ...otherPath) {
  const uri = [baseUrl, versionBasicPath, ...otherPath].join('/')
  queryString['user.name'] = userName
  const query = Object.keys(queryString)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(queryString[k]))
    .join('&')
  return uri + '?' + query
}