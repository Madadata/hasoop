/**
 * Created by Chyroc on 17/1/11.
 */

export function setCreateLinkRequestBody (linkName, linkConfig) {
  let connectorName
  let jdbcDriver
  let connectionString
  let fetchSize = linkConfig.hasOwnProperty('fetchSize') ? linkConfig['fetchSize'] : 1000
  fetchSize = fetchSize.toString()
  let identifierEnclose = linkConfig.hasOwnProperty('identifierEnclose') ? linkConfig['identifierEnclose'] : '`'
  if (linkConfig['linkType'] === 'mysql') {
    const port = linkConfig.hasOwnProperty('port') ? linkConfig['port'] : 3306
    connectorName = 'generic-jdbc-connector'
    jdbcDriver = 'com.mysql.jdbc.Driver'
    connectionString = 'jdbc:mysql://' + linkConfig['host'] + ':' + port + '/' + linkConfig['databaseName']
  } else {

  }
  return {
    'links': [{
      'id': -1,
      'name': linkName,
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
                'value': fetchSize
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
    }]
  }
}
