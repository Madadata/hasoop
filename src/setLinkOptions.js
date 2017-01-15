/**
 * Created by Chyroc on 17/1/11.
 */
import { linkType } from './index'

export function setCreateLinkRequestBody (linkConfig) {
  if (linkConfig['linkType'] === linkType.mysql) {
    const fetchSize = linkConfig['fetchSize'] || 1000
    const identifierEnclose = linkConfig['identifierEnclose'] || '`'
    const port = linkConfig['port'] || 3306
    const connectorName = 'generic-jdbc-connector'
    const jdbcDriver = 'com.mysql.jdbc.Driver'
    const connectionString = `jdbc:mysql://${linkConfig.host}:${port}/${linkConfig.databaseName}`
    return {
      'links': [
        {
          'id': -1,
          'name': linkConfig['linkName'],
          'connector-name': connectorName,
          'enabled': true,
          'creation-date': Date.now(),
          'creation-user': null,
          'update-user': null,
          'update-date': Date.now(),
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
                    'value': linkConfig['username']
                  }, {
                    'size': 40,
                    'editable': 'ANY',
                    'validators': [],
                    'name': 'linkConfig.password',
                    'id': 70,
                    'sensitive': true,
                    'overrides': '',
                    'type': 'STRING',
                    'value': linkConfig['password']
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
      ]
    }
  } else if (linkConfig['linkType'] === linkType.hdfs) {
    const connectorName = 'hdfs-connector'
    const createHdfsLinkBody = {
      'links': [{
        'id': -1,
        'name': linkConfig['linkName'],
        'connector-name': connectorName,
        'enabled': true,
        'creation-date': Date.now(),
        'creation-user': null,
        'update-user': null,
        'update-date': Date.now(),
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
                  'value': encodeURIComponent(linkConfig['uri'])
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
      }]
    }
    if (linkConfig['hadoopConfDir']) {
      createHdfsLinkBody['links'][0]['link-config-values']['configs'][0]['inputs'][1]['value'] = encodeURIComponent(linkConfig['hadoopConfDir'])
    }
    return createHdfsLinkBody
  } else {
    throw new Error('linkType must be mysql or hdfs')
  }
}

export function setUpdateLinkRequestBody (linkConfig) {
  return setCreateLinkRequestBody(linkConfig)
}
