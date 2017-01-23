/* eslint-env mocha */

import { Hasoop, version, linkType } from '../src/index'

const config = {
  'userName': 'Developer',
  'host': 'localhost',
  'port': 12000,
  'webapp': 'sqoop'
}
const sqoopClient = new Hasoop(config)

const SQOOPHOST = process.env.SQOOPHOST

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
    'uri': `hdfs://${SQOOPHOST}:9000`
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
      'outputDirectory': `hdfs://${SQOOPHOST}:9000/data`
    }
  }
}

export {
  sqoopClient,
  version,
  generateMysqlConfig,
  generateHdfsConfig,
  generateFromMysqlToHdfsConfig
}
