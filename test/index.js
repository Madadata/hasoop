/* eslint-env mocha */

import Hasoop, { version, linkType, expectSqoopHeaders } from '../src/index'

const sqoopHost = process.env.SQOOP_HOST

const sqoopClient = new Hasoop({
  'userName': 'Developer',
  'host': sqoopHost,
  'port': 12000,
  'webapp': 'sqoop'
})

function generateMysqlConfig (linkName) {
  return {
    'linkName': linkName,
    'linkType': linkType.mysql,
    'host': 'mysql',
    'databaseName': 'harry',
    'username': 'root',
    'password': '1234'
  }
}

function generateHdfsConfig (linkName) {
  return {
    'linkName': linkName,
    'linkType': linkType.hdfs,
    'uri': `hdfs://${sqoopHost}:9000`
  }
}

function generateFromMysqlToHdfsConfig (jobName, fromLinkName, toLinkName) {
  return {
    'jobName': jobName,
    'fromLinkName': fromLinkName,
    'toLinkName': toLinkName,
    'jobConfig': {
      // for mysql
      'schemaName': 'harry',
      'tableName': 'characters',
      // 'partitionColumn':'id' TODO

      // for hdfs
      'outputDirectory': `hdfs://${sqoopHost}:9000/data`
    }
  }
}

export {
  sqoopClient,
  version,
  expectSqoopHeaders,
  generateMysqlConfig,
  generateHdfsConfig,
  generateFromMysqlToHdfsConfig
}
