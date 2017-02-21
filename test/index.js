/* eslint-env mocha */

import Hasoop, { linkType } from '../src/index'
export * from '../src/index'

export const sqoopHost = process.env.SQOOP_HOST

export const sqoopClient = new Hasoop({
  userName: 'Developer',
  host: 'localhost',
  port: 12000,
  webapp: 'sqoop'
})

export function generateMysqlConfig (linkName) {
  return {
    linkName: linkName,
    linkType: linkType.mysql,
    host: 'mysql',
    databaseName: 'harry',
    username: 'root',
    password: '1234'
  }
}

export function generateHdfsConfig (linkName) {
  return {
    linkName: linkName,
    linkType: linkType.hdfs,
    uri: `hdfs://${sqoopHost}:9000`
  }
}

export function generateFromMysqlToHdfsCreateConfig (jobName, fromLinkName, toLinkName) {
  return {
    jobName: jobName,
    fromLinkName: fromLinkName,
    toLinkName: toLinkName,
    jobConfig: {
      // for mysql
      schemaName: 'harry',
      tableName: 'characters',
      // for hdfs
      outputDirectory: `hdfs://${sqoopHost}:9000/data`,
      outputFormat: 'PARQUET_FILE'
    }
  }
}

export function generateFromMysqlToHdfsUpdateConfig (jobName, fromLinkName, toLinkName) {
  return {
    jobConfig: {
      // for mysql
      schemaName: 'harry',
      tableName: 'mysql'
    }
  }
}
