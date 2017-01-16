/* eslint-env mocha */

import { Hasoop, version, linkType } from '../src/index'

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
    'uri': 'hdfs://localhost:9000'
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
      'outputDirectory': 'hdfs://localhost:9000/output/data'
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

/**
 /v1/jobs/ - [GET] Get all jobs
 /v1/jobs?cname=[cname] - [GET] Get all jobs by connector
 /v1/job/[jname] - [GET] - Get Job
 /v1/job - [POST] - Create Job
 /v1/job/[jname] - [PUT] - Update Job
 /v1/job/[jname] - [DELETE] - Delete Job
 /v1/job/[jname]/enable - [PUT] - Enable Job
 /v1/job/[jname]/disable - [PUT] - Disable Job
 /v1/job/[jname]/start - [PUT]- Start Job
 /v1/job/[jname]/stop - [PUT]- Stop Job
 /v1/job/[jname]/status - [GET]- Get Job Status

 /v1/submissions? - [GET] - Get all job Submissions
 /v1/submissions?jname=[jname] - [GET] - Get Submissions by Job

 /v1/authorization/roles/create - [POST] - Create Role
 /v1/authorization/role/[role-name] - [DELETE] - Delete Role
 /v1/authorization/roles?principal_type=[principal-type]&principal_name=[principal-name] - [GET] Get all Roles by Principal
 /v1/authorization/principals?role_name=[rname] - [GET] Get all Principals by Role
 /v1/authorization/roles/grant - [PUT] - Grant a Role to a Principal
 /v1/authorization/roles/revoke - [PUT] - Revoke a Role from a Principal
 /v1/authorization/privileges/grant - [PUT] - Grant a Privilege to a Principal
 /v1/authorization/privileges/revoke - [PUT] - Revoke a Privilege to a Principal
 /v1/authorization/privilieges?principal_type=[principal-type]&principal_name=[principal-name]&resource_type=[resource-type]&resource_name=[resource-name] - [GET] Get all Roles by Principal (and Resource)

 **/
