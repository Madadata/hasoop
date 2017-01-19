/* eslint-env mocha */

import { expect } from 'chai'
import _ from 'lodash'
import faker from 'faker'

import { sqoopClient, generateMysqlConfig, generateHdfsConfig, generateFromMysqlToHdfsConfig } from './index'

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
    const data = await sqoopClient.createJob(config)
    expect(data).to.deep.equal({
      'name': firstJobName,
      'validation-result': [{}, {}, {}]
    })
  })

  test('getJobByJobName', async () => {
    const data = await sqoopClient.getJobByJobName(firstJobName)
    expect(_.get(data, 'jobs[0].name')).to.equal(firstJobName)
  })

  test('getJobByConnectorName', async () => {
    const data = await sqoopClient.getJobByConnectorName('hdfs-connector')
    const jobNames = _.map(data.jobs, 'name')
    expect(firstJobName).to.be.oneOf(jobNames)
  })

  test('updateJobFromMysqlToJob', async () => {
    const config = generateFromMysqlToHdfsConfig(secondJobName, firstMysqlLinkName, firstHdfsLinkName)
    const data = await sqoopClient.updateJobConfig(firstJobName, config)
    expect(data).to.deep.equal({'validation-result': [{}, {}, {}]})
  })

  test('getJobAll', async () => {
    const data = await sqoopClient.getJobAll()
    const jobNames = _.map(data.jobs, 'name')
    expect(secondJobName).to.be.oneOf(jobNames)
  })

  test('updateJobDisable', async () => {
    await sqoopClient.updateJobDisable(secondJobName)
    const data = await sqoopClient.getJobByJobName(secondJobName)
    expect(_.get(data, 'jobs[0].enabled')).to.be.false
  })

  test('updateJobEnable', async () => {
    await sqoopClient.updateJobEnable(secondJobName)
    const data = await sqoopClient.getJobByJobName(secondJobName)
    expect(_.get(data, 'jobs[0].enabled')).to.be.true
  })

  test('deleteJob', async () => {
    const data = await sqoopClient.deleteJob(secondJobName)
    expect(data).to.be.empty
  })

  test('jobStatus When not start', async () => {
    const data = await sqoopClient.jobStatus(thirdJobName)
    expect(_.get(data, 'submissions[0].job-name')).to.equal(thirdJobName)
    expect(_.get(data, 'submissions[0].status')).to.equal('NEVER_EXECUTED')
  })

  test.skip('startJob', async () => {
    const data = await sqoopClient.startJob(thirdJobName)
    console.log(_.get(data, 'cause.message'))
    console.log(data)
  })

  test.skip('jobStatus When start', async () => {
    const data = await sqoopClient.jobStatus(thirdJobName)
    // expect(_.get(data, 'submissions[0].job-name')).to.equal(thirdJobName)
    console.log(_.get(data, 'submissions[0].job-name'), _.get(data, 'submissions[0].status'))
    // expect(_.get(data, 'submissions[0].status')).to.equal('NEVER_EXECUTED')
  })

  test.skip('stopJob', () => {
    sqoopClient.stopJob()
  })

  test.skip('jobStatus When stop', () => {

  })
})
