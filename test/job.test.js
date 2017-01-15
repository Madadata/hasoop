/* eslint-env mocha */

import { expect } from 'chai'
import faker from 'faker'
import { sqoopClient, generateMysqlConfig, generateHdfsConfig, generateFromMysqlToHdfsConfig } from './index'

suite('job', () => {
  let firstMysqlLinkName
  let secondMysqlLinkName
  let firstHdfsLinkName

  before(async () => {
    firstMysqlLinkName = faker.name.findName()
    const firstMysqlLinkConfig = generateMysqlConfig(firstMysqlLinkName)
    await sqoopClient.createLink(firstMysqlLinkConfig)

    secondMysqlLinkName = faker.name.findName()
    const secondMysqlLinkConfig = generateMysqlConfig(secondMysqlLinkName)
    await sqoopClient.createLink(secondMysqlLinkConfig)

    firstHdfsLinkName = faker.name.findName()
    const firstHdfsLinkConfig = generateHdfsConfig(firstHdfsLinkName)
    await sqoopClient.createLink(firstHdfsLinkConfig)
  })

  test('getJobForEmpty', async () => {
    const data = await sqoopClient.getJobAll()
    expect(data.jobs).to.be.empty
  })

  test('createJobFromMysqlToJob', async () => {
    const config = generateFromMysqlToHdfsConfig()
    const data = await sqoopClient.createJob(config)
    console.log(data)
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
