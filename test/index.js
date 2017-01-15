/* eslint-env mocha */
import { Hasoop, version } from '../src/index'

const config = {
  'userName': 'Developer',
  'host': 'localhost',
  'port': 12000,
  'webapp': 'sqoop'
}
const sqoopClient = new Hasoop(config)

function generateMysqlConfig (linkName) {
  return {
    'linkName': linkName,
    'linkType': 'mysql',
    'host': 'mysql',
    'databaseName': 'harry',
    'username': 'root',
    'password': '1234'
  }
}

function generateHdfsConfig (linkName) {
  return {
    'linkName': linkName,
    'linkType': 'hdfs',
    'uri': 'hdfs://localhost'
  }
}

export {
  sqoopClient,
  version,
  generateMysqlConfig,
  generateHdfsConfig
}
