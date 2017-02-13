export const splitLinkConfigTestData = {
  info: {
    'links': [
      {
        'id': 121,
        'enabled': true,
        'update-user': 'Developer',
        'link-config-values': {
          'configs': [
            {
              'id': 17,
              'validators': [

              ],
              'inputs': [
                {
                  'id': 67,
                  'validators': [

                  ],
                  'overrides': '',
                  'name': 'linkConfig.jdbcDriver',
                  'value': 'com.mysql.jdbc.Driver',
                  'type': 'STRING',
                  'editable': 'ANY',
                  'size': 128,
                  'sensitive': false
                },
                {
                  'id': 68,
                  'validators': [

                  ],
                  'overrides': '',
                  'name': 'linkConfig.connectionString',
                  'value': 'jdbc%3Amysql%3A%2F%2Fmysql%3A3306%2Fharry',
                  'type': 'STRING',
                  'editable': 'ANY',
                  'size': 2000,
                  'sensitive': false
                },
                {
                  'id': 69,
                  'validators': [

                  ],
                  'overrides': '',
                  'name': 'linkConfig.username',
                  'value': 'root',
                  'type': 'STRING',
                  'editable': 'ANY',
                  'size': 40,
                  'sensitive': false
                },
                {
                  'id': 70,
                  'validators': [

                  ],
                  'overrides': '',
                  'name': 'linkConfig.password',
                  'type': 'STRING',
                  'editable': 'ANY',
                  'size': 40,
                  'sensitive': true
                },
                {
                  'id': 71,
                  'validators': [

                  ],
                  'overrides': '',
                  'name': 'linkConfig.fetchSize',
                  'value': '1000',
                  'type': 'INTEGER',
                  'editable': 'ANY',
                  'sensitive': false
                },
                {
                  'id': 72,
                  'sensitive-pattern': '',
                  'validators': [

                  ],
                  'overrides': '',
                  'name': 'linkConfig.jdbcProperties',
                  'type': 'MAP',
                  'editable': 'ANY',
                  'sensitive': false
                }
              ],
              'name': 'linkConfig',
              'type': 'LINK'
            },
            {
              'id': 18,
              'validators': [

              ],
              'inputs': [
                {
                  'id': 73,
                  'validators': [

                  ],
                  'overrides': '',
                  'name': 'dialect.identifierEnclose',
                  'value': '%60',
                  'type': 'STRING',
                  'editable': 'ANY',
                  'size': 5,
                  'sensitive': false
                }
              ],
              'name': 'dialect',
              'type': 'LINK'
            }
          ],
          'validators': [

          ]
        },
        'name': 'Toby',
        'connector-name': 'generic-jdbc-connector',
        'creation-date': 1486952494764,
        'update-date': 1486952494764,
        'creation-user': 'Developer'
      }
    ]
  },
  config: {
    'id': 121,
    'enabled': true,
    'updateUser': 'Developer',
    'name': 'Toby',
    'connectorName': 'generic-jdbc-connector',
    'creationDate': 1486952494764,
    'updateDate': 1486952494764,
    'creationUser': 'Developer',
    'jdbcDriver': 'com.mysql.jdbc.Driver',
    'connectionString': 'jdbc:mysql://mysql:3306/harry',
    'username': 'root',
    'password': null,
    'fetchSize': '1000',
    'jdbcProperties': null,
    'identifierEnclose': '`'
  }
}

export const splitJobConfigTestData = {
  info: {
    'jobs': [
      {
        'driver-config-values': {
          'configs': [
            {
              'id': 22,
              'validators': [

              ],
              'inputs': [
                {
                  'id': 88,
                  'validators': [

                  ],
                  'overrides': '',
                  'name': 'throttlingConfig.numExtractors',
                  'type': 'INTEGER',
                  'editable': 'ANY',
                  'sensitive': false
                },
                {
                  'id': 89,
                  'validators': [

                  ],
                  'overrides': '',
                  'name': 'throttlingConfig.numLoaders',
                  'type': 'INTEGER',
                  'editable': 'ANY',
                  'sensitive': false
                }
              ],
              'name': 'throttlingConfig',
              'type': 'JOB'
            },
            {
              'id': 23,
              'validators': [

              ],
              'inputs': [
                {
                  'id': 90,
                  'validators': [

                  ],
                  'overrides': '',
                  'name': 'jarConfig.extraJars',
                  'type': 'LIST',
                  'editable': 'ANY',
                  'sensitive': false
                }
              ],
              'name': 'jarConfig',
              'type': 'JOB'
            }
          ],
          'validators': [

          ]
        },
        'enabled': true,
        'update-user': 'Developer',
        'from-link-name': 'Vita',
        'to-config-values': {
          'configs': [
            {
              'id': 16,
              'validators': [

              ],
              'inputs': [
                {
                  'id': 60,
                  'validators': [

                  ],
                  'overrides': '',
                  'name': 'toJobConfig.overrideNullValue',
                  'type': 'BOOLEAN',
                  'editable': 'ANY',
                  'sensitive': false
                },
                {
                  'id': 61,
                  'validators': [

                  ],
                  'overrides': '',
                  'name': 'toJobConfig.nullValue',
                  'type': 'STRING',
                  'editable': 'ANY',
                  'size': 255,
                  'sensitive': false
                },
                {
                  'id': 62,
                  'values': 'TEXT_FILE,SEQUENCE_FILE,PARQUET_FILE',
                  'validators': [

                  ],
                  'overrides': '',
                  'name': 'toJobConfig.outputFormat',
                  'value': 'TEXT_FILE',
                  'type': 'ENUM',
                  'editable': 'ANY',
                  'sensitive': false
                },
                {
                  'id': 63,
                  'values': 'NONE,DEFAULT,DEFLATE,GZIP,BZIP2,LZO,LZ4,SNAPPY,CUSTOM',
                  'validators': [

                  ],
                  'overrides': '',
                  'name': 'toJobConfig.compression',
                  'value': 'NONE',
                  'type': 'ENUM',
                  'editable': 'ANY',
                  'sensitive': false
                },
                {
                  'id': 64,
                  'validators': [

                  ],
                  'overrides': '',
                  'name': 'toJobConfig.customCompression',
                  'type': 'STRING',
                  'editable': 'ANY',
                  'size': 255,
                  'sensitive': false
                },
                {
                  'id': 65,
                  'validators': [

                  ],
                  'overrides': '',
                  'name': 'toJobConfig.outputDirectory',
                  'value': 'hdfs%3A%2F%2FsqoopHost%3A9000%2Fdata',
                  'type': 'STRING',
                  'editable': 'ANY',
                  'size': 255,
                  'sensitive': false
                },
                {
                  'id': 66,
                  'validators': [

                  ],
                  'overrides': '',
                  'name': 'toJobConfig.appendMode',
                  'type': 'BOOLEAN',
                  'editable': 'ANY',
                  'sensitive': false
                }
              ],
              'name': 'toJobConfig',
              'type': 'JOB'
            }
          ],
          'validators': [

          ]
        },
        'creation-date': 1486953132716,
        'update-date': 1486953132716,
        'creation-user': 'Developer',
        'id': 74,
        'from-config-values': {
          'configs': [
            {
              'id': 19,
              'validators': [

              ],
              'inputs': [
                {
                  'id': 74,
                  'validators': [

                  ],
                  'overrides': '',
                  'name': 'fromJobConfig.schemaName',
                  'value': 'harry',
                  'type': 'STRING',
                  'editable': 'ANY',
                  'size': 50,
                  'sensitive': false
                },
                {
                  'id': 75,
                  'validators': [

                  ],
                  'overrides': '',
                  'name': 'fromJobConfig.tableName',
                  'value': 'characters',
                  'type': 'STRING',
                  'editable': 'ANY',
                  'size': 50,
                  'sensitive': false
                },
                {
                  'id': 76,
                  'validators': [

                  ],
                  'overrides': '',
                  'name': 'fromJobConfig.sql',
                  'type': 'STRING',
                  'editable': 'ANY',
                  'size': 2000,
                  'sensitive': false
                },
                {
                  'id': 77,
                  'validators': [

                  ],
                  'overrides': '',
                  'name': 'fromJobConfig.columnList',
                  'type': 'LIST',
                  'editable': 'ANY',
                  'sensitive': false
                },
                {
                  'id': 78,
                  'validators': [

                  ],
                  'overrides': '',
                  'name': 'fromJobConfig.partitionColumn',
                  'type': 'STRING',
                  'editable': 'ANY',
                  'size': 50,
                  'sensitive': false
                },
                {
                  'id': 79,
                  'validators': [

                  ],
                  'overrides': '',
                  'name': 'fromJobConfig.allowNullValueInPartitionColumn',
                  'type': 'BOOLEAN',
                  'editable': 'ANY',
                  'sensitive': false
                },
                {
                  'id': 80,
                  'validators': [

                  ],
                  'overrides': '',
                  'name': 'fromJobConfig.boundaryQuery',
                  'type': 'STRING',
                  'editable': 'ANY',
                  'size': 50,
                  'sensitive': false
                }
              ],
              'name': 'fromJobConfig',
              'type': 'JOB'
            },
            {
              'id': 20,
              'validators': [

              ],
              'inputs': [
                {
                  'id': 81,
                  'validators': [

                  ],
                  'overrides': '',
                  'name': 'incrementalRead.checkColumn',
                  'type': 'STRING',
                  'editable': 'ANY',
                  'size': 50,
                  'sensitive': false
                },
                {
                  'id': 82,
                  'validators': [

                  ],
                  'overrides': '',
                  'name': 'incrementalRead.lastValue',
                  'type': 'STRING',
                  'editable': 'ANY',
                  'size': -1,
                  'sensitive': false
                }
              ],
              'name': 'incrementalRead',
              'type': 'JOB'
            }
          ],
          'validators': [

          ]
        },
        'to-link-name': 'Benny',
        'name': 'Alexzander',
        'from-connector-name': 'generic-jdbc-connector',
        'to-connector-name': 'hdfs-connector'
      }
    ]
  },
  config: {
    'topEnabled': true,
    'topUpdateUser': 'Developer',
    'topFromLinkName': 'Vita',
    'topCreationDate': 1486953132716,
    'topUpdateDate': 1486953132716,
    'topCreationUser': 'Developer',
    'topId': 74,
    'topToLinkName': 'Benny',
    'topName': 'Alexzander',
    'topFromConnectorName': 'generic-jdbc-connector',
    'topToConnectorName': 'hdfs-connector',
    'driverNumExtractors': null,
    'driverNumLoaders': null,
    'driverExtraJars': null,
    'fromSchemaName': 'harry',
    'fromTableName': 'characters',
    'fromSql': null,
    'fromColumnList': null,
    'fromPartitionColumn': null,
    'fromAllowNullValueInPartitionColumn': null,
    'fromBoundaryQuery': null,
    'fromCheckColumn': null,
    'fromLastValue': null,
    'toOverrideNullValue': null,
    'toNullValue': null,
    'toOutputFormat': 'TEXT_FILE',
    'toCompression': 'NONE',
    'toCustomCompression': null,
    'toOutputDirectory': 'hdfs://sqoopHost:9000/data',
    'toAppendMode': null
  }
}

export const splitSubmissionConfigTestData = {
  info: {
    'submissions': [
      {
        'progress': -1,
        'last-update-date': 1486957792852,
        'external-id': 'job_1484031718812_0057',
        'last-udpate-user': 'Developer',
        'job-name': 'Ines',
        'status': 'BOOTING',
        'creation-date': 1486957792852,
        'to-schema': {
          'created': 1484033075725,
          'name': 'NullSchema',
          'columns': [

          ]
        },
        'external-link': 'http://local006:8088/proxy/application_1484031718812_0057/',
        'creation-user': 'Developer',
        'from-schema': {
          'created': 1486957793658,
          'name': '`same`.`movie`',
          'columns': [
            {
              'signed': true,
              'byteSize': 4,
              'name': 'id',
              'nullable': true,
              'type': 'FIXED_POINT'
            },
            {
              'signed': true,
              'byteSize': 4,
              'name': 'movie_id',
              'nullable': true,
              'type': 'FIXED_POINT'
            },
            {
              'name': 'title',
              'charSize': null,
              'nullable': true,
              'type': 'TEXT'
            },
            {
              'name': 'sub_title',
              'charSize': null,
              'nullable': true,
              'type': 'TEXT'
            },
            {
              'name': 'actor',
              'charSize': null,
              'nullable': true,
              'type': 'TEXT'
            },
            {
              'name': 'director',
              'charSize': null,
              'nullable': true,
              'type': 'TEXT'
            },
            {
              'name': 'year',
              'charSize': null,
              'nullable': true,
              'type': 'TEXT'
            },
            {
              'name': 'trailer',
              'charSize': null,
              'nullable': true,
              'type': 'TEXT'
            },
            {
              'name': 'img',
              'charSize': null,
              'nullable': true,
              'type': 'TEXT'
            },
            {
              'name': 'cover',
              'charSize': null,
              'nullable': true,
              'type': 'TEXT'
            },
            {
              'signed': true,
              'byteSize': 4,
              'name': 'mid',
              'nullable': true,
              'type': 'FIXED_POINT'
            }
          ]
        }
      }
    ]
  },
  config: {
    'topConfig': {
      'progress': -1,
      'lastUpdateDate': 1486957792852,
      'externalId': 'job_1484031718812_0057',
      'lastUdpateUser': 'Developer',
      'jobName': 'Ines',
      'status': 'BOOTING',
      'creationDate': 1486957792852,
      'externalLink': 'http://local006:8088/proxy/application_1484031718812_0057/',
      'creationUser': 'Developer'
    },
    'fromSchemaConfig': {
      'created': 1486957793658,
      'name': '`same`.`movie`',
      'columns': [
        {
          'signed': true,
          'byteSize': 4,
          'name': 'id',
          'nullable': true,
          'type': 'FIXED_POINT'
        },
        {
          'signed': true,
          'byteSize': 4,
          'name': 'movie_id',
          'nullable': true,
          'type': 'FIXED_POINT'
        },
        {
          'name': 'title',
          'charSize': null,
          'nullable': true,
          'type': 'TEXT'
        },
        {
          'name': 'sub_title',
          'charSize': null,
          'nullable': true,
          'type': 'TEXT'
        },
        {
          'name': 'actor',
          'charSize': null,
          'nullable': true,
          'type': 'TEXT'
        },
        {
          'name': 'director',
          'charSize': null,
          'nullable': true,
          'type': 'TEXT'
        },
        {
          'name': 'year',
          'charSize': null,
          'nullable': true,
          'type': 'TEXT'
        },
        {
          'name': 'trailer',
          'charSize': null,
          'nullable': true,
          'type': 'TEXT'
        },
        {
          'name': 'img',
          'charSize': null,
          'nullable': true,
          'type': 'TEXT'
        },
        {
          'name': 'cover',
          'charSize': null,
          'nullable': true,
          'type': 'TEXT'
        },
        {
          'signed': true,
          'byteSize': 4,
          'name': 'mid',
          'nullable': true,
          'type': 'FIXED_POINT'
        }
      ]
    },
    'toSchemaConfig': {
      'created': 1484033075725,
      'name': 'NullSchema',
      'columns': [

      ]
    }
  }
}
