/* eslint-env mocha */

import { expect } from 'chai'
import { sqoopClient } from './index'

suite('job', () => {
  before(async () => {
    const mysqlLinkConfig = {
      'linkName': 'test_job_link_mysql',
      'linkType': 'mysql',
      'host': 'mysql',
      'databaseName': 'harry',
      'username': 'root',
      'password': '1234'
    }
    const hdfsLinkConfig = {
      'linkName': 'test_job_link_hdfs',
      'linkType': 'hdfs',
      'uri': 'hdfs://localhost'
    }
    await sqoopClient.createLink(mysqlLinkConfig)
    await sqoopClient.createLink(hdfsLinkConfig)

    console.log(await sqoopClient.getLinkAll())
  })

  test('getJobForEmpty', async () => {
    const data = await sqoopClient.getJobAll()
    expect(data.jobs).to.be.empty
  })

  test('createJobFromMysqlToJob', async () => {
    // data.links.map((link)=>console.log(link.name)) // delete
    console.log(await sqoopClient.getLinkAll())
    // const config = {
    //   'jobName': 'test_job_f_mysql_t_hdfs',
    //   'fromLinkName': 'test_job_link_mysql',
    //   'toLinkName': 'test_job_link_hdfs',
    //   'jobConfig': {}
    // }
    // const data = await sqoopClient.createJob(config)
  })

  test.skip('getJob', () => {
    sqoopClient.getJob()
  })

  test.skip('updateJob', () => {
    sqoopClient.updateJob()
  })

  test.skip('deleteJob', () => {
    sqoopClient.deleteJob()
  })

  test.skip('startJob', () => {
    sqoopClient.startJob()
  })

  test.skip('stopJob', () => {
    sqoopClient.stopJob()
  })
})
