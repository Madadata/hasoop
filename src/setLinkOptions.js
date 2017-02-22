/**
 * Created by Chyroc on 17/1/11.
 */

import _ from 'lodash'

import { linkType } from './index'

/**
 * @ignore
 */
function setCreateLinkRequestMainBody (linkName, connectorName) {
  return {
    'id': -1,
    'name': linkName,
    'connector-name': connectorName,
    'enabled': true,
    'creation-date': Date.now(),
    'creation-user': null,
    'update-user': null,
    'update-date': Date.now()
  }
}

/**
 * @ignore
 */
function setCreateLinkRequestMysqlBody (jdbcDriver, connectionString, fetchSize, identifierEnclose, linkConfig) {
  return {
    'link-config-values': {
      'configs': [
        {
          'validators': [],
          'inputs': [
            {
              'size': 128,
              'editable': 'ANY',
              'validators': [],
              'name': 'linkConfig.jdbcDriver',
              'id': 67,
              'sensitive': false,
              'overrides': '',
              'type': 'STRING',
              'value': jdbcDriver
            }, {
              'size': 2000,
              'editable': 'ANY',
              'validators': [],
              'name': 'linkConfig.connectionString',
              'id': 68,
              'sensitive': false,
              'overrides': '',
              'type': 'STRING',
              'value': encodeURIComponent(connectionString)
            }, {
              'size': 40,
              'editable': 'ANY',
              'validators': [],
              'name': 'linkConfig.username',
              'id': 69,
              'sensitive': false,
              'overrides': '',
              'type': 'STRING',
              'value': linkConfig.username
            }, {
              'size': 40,
              'editable': 'ANY',
              'validators': [],
              'name': 'linkConfig.password',
              'id': 70,
              'sensitive': true,
              'overrides': '',
              'type': 'STRING',
              'value': linkConfig.password
            }, {
              'editable': 'ANY',
              'validators': [],
              'name': 'linkConfig.fetchSize',
              'id': 71,
              'sensitive': false,
              'overrides': '',
              'type': 'INTEGER',
              'value': `${fetchSize}`
            }, {
              'editable': 'ANY',
              'validators': [],
              'name': 'linkConfig.jdbcProperties',
              'id': 72,
              'sensitive': false,
              'overrides': '',
              'type': 'MAP',
              'sensitive-pattern': ''
            }
          ],
          'name': 'linkConfig',
          'id': 17,
          'type': 'LINK'
        },
        {
          'validators': [],
          'inputs': [
            {
              'size': 5,
              'editable': 'ANY',
              'validators': [],
              'name': 'dialect.identifierEnclose',
              'id': 73,
              'sensitive': false,
              'overrides': '',
              'type': 'STRING',
              'value': encodeURIComponent(identifierEnclose)
            }
          ],
          'name': 'dialect',
          'id': 18,
          'type': 'LINK'
        }
      ],
      'validators': []
    }
  }
}

/**
 * @ignore
 */
function setCreateLinkRequestHdfsBody (linkConfig) {
  const body = {
    'link-config-values': {
      'configs': [
        {
          'validators': [],
          'inputs': [
            {
              'size': 255,
              'editable': 'ANY',
              'validators': [],
              'name': 'linkConfig.uri',
              'id': 52,
              'sensitive': false,
              'overrides': '',
              'type': 'STRING',
              'value': encodeURIComponent(linkConfig.uri)
            }, {
              'size': 255,
              'editable': 'ANY',
              'validators': [],
              'name': 'linkConfig.confDir',
              'id': 53,
              'sensitive': false,
              'overrides': '',
              'type': 'STRING'
            }, {
              'editable': 'ANY',
              'validators': [],
              'name': 'linkConfig.configOverrides',
              'id': 54,
              'sensitive': false,
              'overrides': '',
              'type': 'MAP',
              // 'value': {'key': 'value'}, TODO
              'sensitive-pattern': ''
            }
          ],
          'name': 'linkConfig',
          'id': 13,
          'type': 'LINK'
        }
      ],
      'validators': []
    }
  }
  if (linkConfig.maps) {
    _.set(body, 'link-config-values.configs[0].inputs[2].value', linkConfig.maps)
  }
  return body
}

/**
 * @ignore
 */
function setCreateJdbcLinkRequestBody (jdbcLinkProtocol, linkConfig) {
  const fetchSize = linkConfig.fetchSize || 1000
  const connectorName = 'generic-jdbc-connector'
  let identifierEnclose
  let port
  let jdbcDriver
  switch (jdbcLinkProtocol) {
    case linkType.mysql:
      identifierEnclose = linkConfig.identifierEnclose || '`'
      port = linkConfig.port || 3306
      jdbcDriver = 'com.mysql.jdbc.Driver'
      break
    case linkType.postgresql:
      identifierEnclose = linkConfig.identifierEnclose || '"'
      port = linkConfig.port || 5432
      jdbcDriver = 'org.postgresql.Driver'
      break
    default:
      throw new Error(`linkType must be ${_.join(_.keys(linkType), ', ')}`)
  }
  const connectionString = `jdbc:${jdbcLinkProtocol}://${linkConfig.host}:${port}/${linkConfig.databaseName}`
  const mainBody = setCreateLinkRequestMainBody(linkConfig.linkName, connectorName)
  const mysqlBody = setCreateLinkRequestMysqlBody(jdbcDriver, connectionString, fetchSize, identifierEnclose, linkConfig)
  return { 'links': [{ ...mainBody, ...mysqlBody }] }
}

/**
 * @ignore
 */
function setCreateHdfsLinkRequestBody (linkConfig) {
  const connectorName = 'hdfs-connector'
  const mainBody = setCreateLinkRequestMainBody(linkConfig.linkName, connectorName)
  const hdfsBody = setCreateLinkRequestHdfsBody(linkConfig)
  const createHdfsLinkBody = { 'links': [{ ...mainBody, ...hdfsBody }] }
  if (linkConfig.hadoopConfDir) {
    _.set(createHdfsLinkBody, 'links[0].link-config-values.configs[0].inputs[1].value', encodeURIComponent(linkConfig.hadoopConfDir))
  }
  return createHdfsLinkBody
}

/**
 * @ignore
 */
export function setCreateLinkRequestBody (linkConfig) {
  if (linkConfig.linkType === linkType.mysql || linkConfig.linkType === linkType.postgresql) {
    return setCreateJdbcLinkRequestBody(linkConfig.linkType, linkConfig)
  } else if (linkConfig.linkType === linkType.hdfs) {
    return setCreateHdfsLinkRequestBody(linkConfig)
  } else {
    throw new Error(`linkType must be ${_.join(_.keys(linkType), ', ')}`)
  }
}

/**
 * @ignore
 */
export function setUpdateLinkRequestBody (linkConfig) {
  return setCreateLinkRequestBody(linkConfig)
}
