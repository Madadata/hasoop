/**
 * Created by Chyroc on 17/1/15.
 */
import _ from 'lodash'
import merge from 'merge'

function splitMain (linkInfo) {
  return {
    id: _.get(linkInfo, 'id'),
    name: _.get(linkInfo, 'name'),
    enabled: _.get(linkInfo, 'enabled'),
    connectorName: _.get(linkInfo, 'connector-name'),
    creationUser: _.get(linkInfo, 'creation-user'),
    creationDate: _.get(linkInfo, 'creation-date'),
    updateUser: _.get(linkInfo, 'update-user'),
    updateDate: _.get(linkInfo, 'update-date')
  }
}

function splitLinkConfig (linkInfo) {
  const linkConfig = {}
  for (let input of linkInfo) {
    if (input.hasOwnProperty('value')) {
      const nameSplit = input.name.split('.')
      linkConfig[nameSplit[1]] = decodeURIComponent(input.value)
    }
  }
  return linkConfig
}

function splitDialect (linkInfo) {
  const linkConfig = {}
  for (let input of linkInfo) {
    if (input.hasOwnProperty('value')) {
      const nameSplit = input.name.split('.')
      linkConfig[nameSplit[1]] = decodeURIComponent(input.value)
    }
  }
  return linkConfig
}

export function splitMysqlLinkConfig (linkInfo) {
  const mainInfo = splitMain(_.get(linkInfo, 'links[0]'))
  const linkConfigInfo = splitLinkConfig(_.get(linkInfo, 'links[0].link-config-values.configs[0].inputs'))
  const dialectInfo = splitDialect(_.get(linkInfo, 'links[0].link-config-values.configs[1].inputs'))
  return merge(mainInfo, linkConfigInfo, dialectInfo)
}

export function splitHdfsLinkConfig (linkInfo) {
  const mainInfo = splitMain(_.get(linkInfo, 'links[0]'))
  const linkConfigInfo = splitLinkConfig(_.get(linkInfo, 'links[0].link-config-values.configs[0].inputs'))
  return merge(mainInfo, linkConfigInfo)
}
