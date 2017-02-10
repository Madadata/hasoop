/* eslint-env mocha */

import faker from 'faker'

import { sqoopClient, generateMysqlConfig, generateHdfsConfig, generateFromMysqlToHdfsConfig, expectSqoopHeaders } from './index'

suite('job', () => {
  let firstJobName
  let secondJobName
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
    secondJobName = faker.name.firstName()

    thirdJobName = faker.name.firstName()
    const config = generateFromMysqlToHdfsConfig(thirdJobName, firstMysqlLinkName, firstHdfsLinkName)
    await sqoopClient.createJob(config)
  })

  test('createJobFromMysqlToJob', async () => {
    const config = generateFromMysqlToHdfsConfig(firstJobName, firstMysqlLinkName, firstHdfsLinkName)
    const res = await sqoopClient.createJob(config)
    expectSqoopHeaders(res)
  })

  test('getJobByJobName', async () => {
    const res = await sqoopClient.getJobByJobName(firstJobName)
    expectSqoopHeaders(res)
  })

  test('getJobByConnectorName', async () => {
    const res = await sqoopClient.getJobByConnectorName('hdfs-connector')
    expectSqoopHeaders(res)
  })

  test('updateJobFromMysqlToJob', async () => {
    const config = generateFromMysqlToHdfsConfig(secondJobName, firstMysqlLinkName, firstHdfsLinkName)
    const res = await sqoopClient.updateJobConfig(firstJobName, config)
    expectSqoopHeaders(res)
  })

  test('getJobAll', async () => {
    const res = await sqoopClient.getJobAll()
    expectSqoopHeaders(res)
  })

  test('updateJobDisable', async () => {
    await sqoopClient.updateJobDisable(secondJobName)
    const res = await sqoopClient.getJobByJobName(secondJobName)
    expectSqoopHeaders(res)
  })

  test('updateJobEnable', async () => {
    await sqoopClient.updateJobEnable(secondJobName)
    const res = await sqoopClient.getJobByJobName(secondJobName)
    expectSqoopHeaders(res)
  })

  test('deleteJob', async () => {
    const res = await sqoopClient.deleteJob(secondJobName)
    expectSqoopHeaders(res)
  })

  test('jobStatus When not start', async () => {
    const res = await sqoopClient.jobStatus(thirdJobName)
    expectSqoopHeaders(res)
  })

  // next 4 test is ok for ec2, so remove `skip`.
  test('startJob', async () => {
    // const res = await sqoopClient.startJob(thirdJobName)
    // expectSqoopHeaders(res)
  })

  test('jobStatus When start', async () => {
    // const res = await sqoopClient.jobStatus(thirdJobName)
    // expectSqoopHeaders(res)
  })

  test('stopJob', async () => {
    // const res = await sqoopClient.stopJob(thirdJobName)
    // expectSqoopHeaders(res)
  })

  test('jobStatus When stop', async () => {
    // const res = await sqoopClient.jobStatus(thirdJobName)
    // expectSqoopHeaders(res)
  })
})
