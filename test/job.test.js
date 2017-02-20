/* eslint-env mocha */

import faker from 'faker'
import { expect } from 'chai'
import {
  sqoopClient,
  generateMysqlConfig,
  generateHdfsConfig,
  generateFromMysqlToHdfsCreateConfig
} from './index'

suite('job', () => {
  let firstJobName
  let thirdJobName
  let firstMysqlLinkName
  let firstHdfsLinkName

  before(async () => {
    firstMysqlLinkName = faker.name.firstName()
    const firstMysqlLinkConfig = generateMysqlConfig(firstMysqlLinkName)
    await sqoopClient.createLink(firstMysqlLinkConfig)

    firstHdfsLinkName = faker.name.firstName()
    const firstHdfsLinkConfig = generateHdfsConfig(firstHdfsLinkName)
    await sqoopClient.createLink(firstHdfsLinkConfig)

    firstJobName = faker.name.firstName()

    thirdJobName = faker.name.firstName()
    const config = generateFromMysqlToHdfsCreateConfig(thirdJobName, firstMysqlLinkName, firstHdfsLinkName)
    await sqoopClient.createJob(config)
  })

  test('createJobFromMysqlToHdfsJob', async () => {
    const config = generateFromMysqlToHdfsCreateConfig(firstJobName, firstMysqlLinkName, firstHdfsLinkName)
    const data = await sqoopClient.createJob(config)
    expect(data.success).to.be.true
  })

  test('getFromMysqlToHdfsJobByJobName', async () => {
    const data = await sqoopClient.getJobByJobName(firstJobName)
    expect(data.success).to.be.true
  })

  test('getJobByConnectorName', async () => {
    const data = await sqoopClient.getJobByConnectorName('hdfs-connector')
    expect(data.success).to.be.true
  })

  test('getJobAll', async () => {
    const data = await sqoopClient.getJobAll()
    expect(data.success).to.be.true
  })

  test('updateJobDisable', async () => {
    const data = await sqoopClient.updateJobDisable(firstJobName)
    expect(data.success).to.be.true
  })

  test('updateJobEnable', async () => {
    const data = await sqoopClient.updateJobEnable(firstJobName)
    expect(data.success).to.be.true
  })

  test('deleteJob', async () => {
    const data = await sqoopClient.deleteJob(firstJobName)
    expect(data.success).to.be.true
  })

  // next 5 test is ok for ec2, so remove `skip`.
  test('FromMysqlToHdfsJobStatus When not start', async () => {
    // const data = await sqoopClient.jobStatus(thirdJobName)
    // expect(data.success).to.be.true
  })

  test('startFromMysqlToHdfsJob', async () => {
    // const data = await sqoopClient.startJob(thirdJobName)
    // expect(data.success).to.be.true
  })

  test('FromMysqlToHdfsJobStatus When start', async () => {
    // const data = await sqoopClient.jobStatus(thirdJobName)
    // expect(data.success).to.be.true
  })

  test('stopFromMysqlToHdfsJob', async () => {
    // const data = await sqoopClient.stopJob(thirdJobName)
    // expect(data.success).to.be.true
  })

  test('FromMysqlToHdfsJobStatus When stop', async () => {
    // const data = await sqoopClient.jobStatus(thirdJobName)
    // expect(data.success).to.be.true
  })
})
