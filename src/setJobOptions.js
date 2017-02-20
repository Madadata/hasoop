/**
 * Created by Chyroc on 17/1/15.
 */

/**
 * @ignore
 */
function setMysqlJobConfig (linkConfig, jobConfig) {
  return {
    'configs': [{
      'validators': [],
      'inputs': [{
        'size': 50,
        'editable': 'ANY',
        'validators': [],
        'name': 'fromJobConfig.schemaName',
        'id': 74,
        'sensitive': false,
        'overrides': '',
        'type': 'STRING',
        'value': jobConfig.schemaName
      }, {
        'size': 50,
        'editable': 'ANY',
        'validators': [],
        'name': 'fromJobConfig.tableName',
        'id': 75,
        'sensitive': false,
        'overrides': '',
        'type': 'STRING',
        'value': jobConfig.tableName
      }, {
        'size': 2000,
        'editable': 'ANY',
        'validators': [],
        'name': 'fromJobConfig.sql',
        'id': 76,
        'sensitive': false,
        'overrides': '',
        'type': 'STRING'
      }, {
        'editable': 'ANY',
        'validators': [],
        'name': 'fromJobConfig.columnList',
        'id': 77,
        'sensitive': false,
        'overrides': '',
        'type': 'LIST'
      }, {
        'size': 50,
        'editable': 'ANY',
        'validators': [],
        'name': 'fromJobConfig.partitionColumn',
        'id': 78,
        'sensitive': false,
        'overrides': '',
        'type': 'STRING'
      }, {
        'editable': 'ANY',
        'validators': [],
        'name': 'fromJobConfig.allowNullValueInPartitionColumn',
        'id': 79,
        'sensitive': false,
        'overrides': '',
        'type': 'BOOLEAN'
      }, {
        'size': 50,
        'editable': 'ANY',
        'validators': [],
        'name': 'fromJobConfig.boundaryQuery',
        'id': 80,
        'sensitive': false,
        'overrides': '',
        'type': 'STRING'
      }],
      'name': 'fromJobConfig',
      'id': 19,
      'type': 'JOB'
    }, {
      'validators': [],
      'inputs': [{
        'size': 50,
        'editable': 'ANY',
        'validators': [],
        'name': 'incrementalRead.checkColumn',
        'id': 81,
        'sensitive': false,
        'overrides': '',
        'type': 'STRING'
      }, {
        'size': -1,
        'editable': 'ANY',
        'validators': [],
        'name': 'incrementalRead.lastValue',
        'id': 82,
        'sensitive': false,
        'overrides': '',
        'type': 'STRING'
      }],
      'name': 'incrementalRead',
      'id': 20,
      'type': 'JOB'
    }],
    'validators': []
  }
}

/**
 * @ignore
 */
function setHdfsJobConfig (linkConfig, jobConfig) {
  return {
    'configs': [{
      'validators': [],
      'inputs': [{
        'editable': 'ANY',
        'validators': [],
        'name': 'toJobConfig.overrideNullValue',
        'id': 60,
        'sensitive': false,
        'overrides': '',
        'type': 'BOOLEAN'
      }, {
        'size': 255,
        'editable': 'ANY',
        'validators': [],
        'name': 'toJobConfig.nullValue',
        'id': 61,
        'sensitive': false,
        'overrides': '',
        'type': 'STRING'
      }, {
        'editable': 'ANY',
        'validators': [],
        'values': 'TEXT_FILE,SEQUENCE_FILE,PARQUET_FILE',
        'name': 'toJobConfig.outputFormat',
        'id': 62,
        'sensitive': false,
        'overrides': '',
        'type': 'ENUM',
        'value': 'PARQUET_FILE' // TODO
      }, {
        'editable': 'ANY',
        'validators': [],
        'values': 'NONE,DEFAULT,DEFLATE,GZIP,BZIP2,LZO,LZ4,SNAPPY,CUSTOM',
        'name': 'toJobConfig.compression',
        'id': 63,
        'sensitive': false,
        'overrides': '',
        'type': 'ENUM',
        'value': 'NONE' // TODO
      }, {
        'size': 255,
        'editable': 'ANY',
        'validators': [],
        'name': 'toJobConfig.customCompression',
        'id': 64,
        'sensitive': false,
        'overrides': '',
        'type': 'STRING'
      }, {
        'size': 255,
        'editable': 'ANY',
        'validators': [],
        'name': 'toJobConfig.outputDirectory',
        'id': 65,
        'sensitive': false,
        'overrides': '',
        'type': 'STRING',
        'value': encodeURIComponent(jobConfig.outputDirectory)
      }, {
        'editable': 'ANY',
        'validators': [],
        'name': 'toJobConfig.appendMode',
        'id': 66,
        'sensitive': false,
        'overrides': '',
        'type': 'BOOLEAN'
      }],
      'name': 'toJobConfig',
      'id': 16,
      'type': 'JOB'
    }],
    'validators': []
  }
}

/**
 * @ignore
 */
function setJobConfig () {
  return {
    'configs': [{
      'validators': [],
      'inputs': [{
        'editable': 'ANY',
        'validators': [],
        'name': 'throttlingConfig.numExtractors',
        'id': 88,
        'sensitive': false,
        'overrides': '',
        'type': 'INTEGER'
      }, {
        'editable': 'ANY',
        'validators': [],
        'name': 'throttlingConfig.numLoaders',
        'id': 89,
        'sensitive': false,
        'overrides': '',
        'type': 'INTEGER'
      }],
      'name': 'throttlingConfig',
      'id': 22,
      'type': 'JOB'
    }, {
      'validators': [],
      'inputs': [{
        'editable': 'ANY',
        'validators': [],
        'name': 'jarConfig.extraJars',
        'id': 90,
        'sensitive': false,
        'overrides': '',
        'type': 'LIST'
      }],
      'name': 'jarConfig',
      'id': 23,
      'type': 'JOB'
    }],
    'validators': []
  }
}

/**
 * @ignore
 */
export function setCreateJobRequestBody (jobName, jobConfig, fromLinkInfo, toLinkInfo, jobId = -1) {
  return {
    'jobs': [{
      'id': jobId,
      'name': jobName,
      'creation-date': Date.now(),
      'creation-user': null,
      'update-user': null,
      'update-date': Date.now(),
      'enabled': true,
      'from-link-name': fromLinkInfo.name,
      'from-connector-name': fromLinkInfo.connectorName,
      'to-link-name': fromLinkInfo.name,
      'to-connector-name': toLinkInfo.connectorName,
      'to-config-values': setHdfsJobConfig(toLinkInfo, jobConfig),
      'from-config-values': setMysqlJobConfig(fromLinkInfo, jobConfig),
      'driver-config-values': setJobConfig()
    }]
  }
}
