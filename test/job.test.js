/* eslint-env mocha */

import _ from 'lodash'
import faker from 'faker'
import { expect } from 'chai'
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
    const json = await res.json()
    expectSqoopHeaders(res)
    expect(json).to.deep.equal({
      'name': firstJobName,
      'validation-result': [{}, {}, {}]
    })
  })

  test('getJobByJobName', async () => {
    const res = await sqoopClient.getJobByJobName(firstJobName)
    const json = await res.json()
    expectSqoopHeaders(res)
    expect(_.get(json, 'jobs[0].name')).to.equal(firstJobName)
  })

  test('getJobByConnectorName', async () => {
    const res = await sqoopClient.getJobByConnectorName('hdfs-connector')
    const json = await res.json()
    const jobNames = _.map(json.jobs, 'name')
    expectSqoopHeaders(res)
    expect(firstJobName).to.be.oneOf(jobNames)
  })

  test('updateJobFromMysqlToJob', async () => {
    const config = generateFromMysqlToHdfsConfig(secondJobName, firstMysqlLinkName, firstHdfsLinkName)
    const res = await sqoopClient.updateJobConfig(firstJobName, config)
    const json = await res.json()

    expectSqoopHeaders(res)
    expect(json).to.deep.equal({'validation-result': [{}, {}, {}]})
  })

  test('getJobAll', async () => {
    const res = await sqoopClient.getJobAll()
    const json = await res.json()
    const jobNames = _.map(json.jobs, 'name')
    expectSqoopHeaders(res)
    expect(secondJobName).to.be.oneOf(jobNames)
  })

  test('updateJobDisable', async () => {
    await sqoopClient.updateJobDisable(secondJobName)
    const res = await sqoopClient.getJobByJobName(secondJobName)
    const json = await res.json()
    expectSqoopHeaders(res)
    expect(_.get(json, 'jobs[0].enabled')).to.be.false
  })

  test('updateJobEnable', async () => {
    await sqoopClient.updateJobEnable(secondJobName)
    const res = await sqoopClient.getJobByJobName(secondJobName)
    const json = await res.json()
    expectSqoopHeaders(res)
    expect(_.get(json, 'jobs[0].enabled')).to.be.true
  })

  test('deleteJob', async () => {
    const res = await sqoopClient.deleteJob(secondJobName)
    const json = await res.json()
    expectSqoopHeaders(res)
    expect(json).to.be.empty
  })

  test('jobStatus When not start', async () => {
    const res = await sqoopClient.jobStatus(thirdJobName)
    const json = await res.json()
    expectSqoopHeaders(res)
    expect(_.get(json, 'submissions[0].job-name')).to.equal(thirdJobName)
    expect(_.get(json, 'submissions[0].status')).to.equal('NEVER_EXECUTED')
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
