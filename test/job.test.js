/* eslint-env mocha */

import { expect } from 'chai'
import faker from 'faker'
import { sqoopClient, generateMysqlConfig, generateHdfsConfig, generateFromMysqlToHdfsConfig } from './index'

suite('job', () => {
  let firstJobName
  let secondJobName
  let firstMysqlLinkName
  let firstHdfsLinkName

  before(async () => {
    firstMysqlLinkName = faker.name.findName()
    const firstMysqlLinkConfig = generateMysqlConfig(firstMysqlLinkName)
    await sqoopClient.createLink(firstMysqlLinkConfig)

    firstHdfsLinkName = faker.name.findName()
    const firstHdfsLinkConfig = generateHdfsConfig(firstHdfsLinkName)
    await sqoopClient.createLink(firstHdfsLinkConfig)

    firstJobName = faker.name.findName()
    secondJobName = faker.name.findName()
  })

  test('createJobFromMysqlToJob', async () => {
    const config = generateFromMysqlToHdfsConfig(firstJobName, firstMysqlLinkName, firstHdfsLinkName)
    const data = await sqoopClient.createJob(config)
    expect(data).to.deep.equal({
      'name': firstJobName,
      'validation-result': [{}, {}, {}]
    })
  })

  test.skip('updateJobFromMysqlToJob and getJobByJobName', async () => {
    const config = generateFromMysqlToHdfsConfig(secondJobName, firstMysqlLinkName, firstHdfsLinkName)
    // console.log(config)
    const updateData = await sqoopClient.updateJobConfig(secondJobName, config)
    // console.log(secondJobName)
    console.log(updateData)
    // expect(_.get(updateData, 'validation-result[0]')).to.be.empty
    // const data = await sqoopClient.getLinkByLinkName(secondMysqlLinkName)
    // expect(_.get(data, 'links[0].name')).to.equal(secondMysqlLinkName)
  })

  test('getJobAll', async () => {
    const data = await sqoopClient.getJobAll()
    const jobNames = []
    data['jobs'].map((job) => jobNames.push(job['name']))
    expect(firstJobName).to.be.oneOf(jobNames)
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
