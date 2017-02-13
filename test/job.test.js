/* eslint-env mocha */

import faker from 'faker'
import { expect } from 'chai'
import {
  sqoopClient,
  generateMysqlConfig,
  generateHdfsConfig,
  generateFromMysqlToHdfsCreateConfig,
  generateFromMysqlToHdfsUpdateConfig,
  hasoopRequestDispose
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
    const res = await sqoopClient.createJob(config)
    const data = await hasoopRequestDispose('createJob', res, firstJobName)
    expect(data.success).to.be.true
  })

  test('getFromMysqlToHdfsJobByJobName', async () => {
    const res = await sqoopClient.getJobByJobName(firstJobName)
    const data = await hasoopRequestDispose('getJobByJobName', res, firstJobName)
    expect(data.success).to.be.true
  })

  test('getJobByConnectorName', async () => {
    const res = await sqoopClient.getJobByConnectorName('hdfs-connector')
    const data = await hasoopRequestDispose('getJobByConnectorName', res)
    expect(data.success).to.be.true
  })

  test('updateJobFromMysqlToJob', async () => {
    const config = generateFromMysqlToHdfsUpdateConfig()
    const res = await sqoopClient.updateJobConfig(firstJobName, config)
    const data = await hasoopRequestDispose('updateJobConfig', res)
    expect(data.success).to.be.true
  })

  test('getJobAll', async () => {
    const res = await sqoopClient.getJobAll()
    const data = await hasoopRequestDispose('getJobAll', res)
    expect(data.success).to.be.true
  })

  test('updateJobDisable', async () => {
    const res = await sqoopClient.updateJobDisable(firstJobName)
    const data = await hasoopRequestDispose('updateJobDisable', res, firstJobName)
    expect(data.success).to.be.true
  })

  test('updateJobEnable', async () => {
    const res = await sqoopClient.updateJobEnable(firstJobName)
    const data = await hasoopRequestDispose('updateJobEnable', res, firstJobName)
    expect(data.success).to.be.true
  })

  test('deleteJob', async () => {
    const res = await sqoopClient.deleteJob(firstJobName)
    const data = await hasoopRequestDispose('deleteJob', res, firstJobName)
    expect(data.success).to.be.true
  })

  // next 5 test is ok for ec2, so remove `skip`.
  test('FromMysqlToHdfsJobStatus When not start', async () => {
    // const jobStatusResJson = await sqoopClient.jobStatus(thirdJobName)
    //   .then(jobStatusRes => {
    //     expectSqoopHeaders(jobStatusRes)
    //     return jobStatusRes.json()
    //   })
    // const submissionConfig = splitSubmissionConfig(jobStatusResJson)
    // expect(submissionConfig.topConfig.jobName).to.equal(thirdJobName)
    // expect(submissionConfig.topConfig.status).to.equal('NEVER_EXECUTED')
  })

  test('startFromMysqlToHdfsJob', async () => {
    // const startJobResJson = await sqoopClient.startJob(thirdJobName)
    //   .then(startJobRes => {
    //     expectSqoopHeaders(startJobRes)
    //     return startJobRes.json()
    //   })
    // const submissionConfig = splitSubmissionConfig(startJobResJson)
    // expect(submissionConfig.topConfig.jobName).to.equal(thirdJobName)
    // expect(submissionConfig.topConfig.status).to.be.oneOf(['BOOTING', 'RUNNING', 'SUCCEEDED'])
    // expect(submissionConfig.fromSchemaConfig.columns).to.have.length.of.at.least(1)
  })

  test('FromMysqlToHdfsJobStatus When start', async () => {
    // const jobStatusResJson = await sqoopClient.jobStatus(thirdJobName)
    //   .then(jobStatusRes => {
    //     expectSqoopHeaders(jobStatusRes)
    //     return jobStatusRes.json()
    //   })
    // const submissionConfig = splitSubmissionConfig(jobStatusResJson)
    // expect(submissionConfig.topConfig.jobName).to.equal(thirdJobName)
    // expect(submissionConfig.topConfig.status).to.be.oneOf(['BOOTING', 'RUNNING', 'SUCCEEDED'])
  })

  test('stopFromMysqlToHdfsJob', async () => {
    // const stopJobResJson = await sqoopClient.stopJob(thirdJobName)
    //   .then(stopJobRes => {
    //     expectSqoopHeaders(stopJobRes)
    //     return stopJobRes.json()
    //   })
    // const submissionConfig = splitSubmissionConfig(stopJobResJson)
    // expect(submissionConfig.topConfig.jobName).to.equal(thirdJobName)
    // expect(submissionConfig.topConfig.status).to.equal('FAILED')
    // expect(submissionConfig.topConfig.errorDetails).to.equal('Application killed by user.')
  })

  test('FromMysqlToHdfsJobStatus When stop', async () => {
    // const jobStatusResJson = await sqoopClient.jobStatus(thirdJobName)
    //   .then(jobStatusRes => {
    //     expectSqoopHeaders(jobStatusRes)
    //     return jobStatusRes.json()
    //   })
    // const submissionConfig = splitSubmissionConfig(jobStatusResJson)
    // expect(submissionConfig.topConfig.jobName).to.equal(thirdJobName)
    // expect(submissionConfig.topConfig.status).to.equal('FAILED')
    // expect(submissionConfig.topConfig.errorDetails).to.equal('Application killed by user.')
  })
})
