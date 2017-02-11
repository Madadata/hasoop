/* eslint-env mocha */

import _ from 'lodash'
import faker from 'faker'
import { expect } from 'chai'
import { sqoopClient, generateMysqlConfig, generateHdfsConfig, generateFromMysqlToHdfsCreateConfig, generateFromMysqlToHdfsUpdateConfig, expectSqoopHeaders, splitJobConfig } from './index'

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
    const createJobResJson = await sqoopClient.createJob(config)
      .then(createJobRes => {
        expectSqoopHeaders(createJobRes)
        return createJobRes.json()
      })
    expect(createJobResJson).to.deep.equal({ name: firstJobName, 'validation-result': [ {}, {}, {} ] })
  })

  test('getFromMysqlToHdfsJobByJobName', async () => {
    const getJobByJobNameResJson = await sqoopClient.getJobByJobName(firstJobName)
      .then(getJobByJobNameRes => {
        expectSqoopHeaders(getJobByJobNameRes)
        return getJobByJobNameRes.json()
      })
    const jobConfig = splitJobConfig(getJobByJobNameResJson)
    expect(jobConfig.topName).to.equal(firstJobName)
    expect(jobConfig).to.have.all.keys(
      'topEnabled', 'topUpdateUser', 'topFromLinkName', 'topCreationDate',
      'topUpdateDate', 'topCreationUser', 'topId', 'topToLinkName', 'topName',
      'topFromConnectorName', 'topToConnectorName', 'driverNumExtractors',
      'driverNumLoaders', 'driverExtraJars', 'fromSchemaName', 'fromTableName',
      'fromSql', 'fromColumnList', 'fromPartitionColumn', 'toOutputDirectory',
      'fromAllowNullValueInPartitionColumn', 'fromBoundaryQuery',
      'fromCheckColumn', 'fromLastValue', 'toOverrideNullValue', 'toAppendMode',
      'toNullValue', 'toOutputFormat', 'toCompression', 'toCustomCompression'
      )
  })

  test('getJobByConnectorName', async () => {
    const getJobByConnectorNameResJson = await sqoopClient.getJobByConnectorName('hdfs-connector')
      .then(getJobByConnectorNameRes => {
        expectSqoopHeaders(getJobByConnectorNameRes)
        return getJobByConnectorNameRes.json()
      })
    const jobNames = _.map(_.map(getJobByConnectorNameResJson.jobs, (jobObject) => {
      return splitJobConfig({jobs: [jobObject]})
    }), 'topName')
    expect(firstJobName).to.be.oneOf(jobNames)
  })

  test('updateJobFromMysqlToJob', async () => {
    const config = generateFromMysqlToHdfsUpdateConfig()
    const updateJobResJson = await sqoopClient.updateJobConfig(firstJobName, config)
      .then(updateJobRes => {
        expectSqoopHeaders(updateJobRes)
        return updateJobRes.json()
      })
    expect(updateJobResJson).to.deep.equal({'validation-result': [{}, {}, {}]})
    const getJobResJson = await sqoopClient.getJobByJobName(firstJobName)
      .then(getJobRes => {
        expectSqoopHeaders(getJobRes)
        return getJobRes.json()
      })
    const getJobResJsonConfig = splitJobConfig(getJobResJson)
    expect(getJobResJsonConfig.fromTableName).to.equal(config.jobConfig.tableName)
  })

  test('getJobAll', async () => {
    const getJobAllResJson = await sqoopClient.getJobAll()
      .then(getJobAllRes => {
        expectSqoopHeaders(getJobAllRes)
        return getJobAllRes.json()
      })
    const jobNames = _.map(_.map(getJobAllResJson.jobs, (jobObject) => {
      return splitJobConfig({jobs: [jobObject]})
    }), 'topName')
    expect(firstJobName).to.be.oneOf(jobNames)
  })

  test('updateJobDisable', async () => {
    const updateJobDisableResJson = await sqoopClient.updateJobDisable(firstJobName)
      .then(updateJobDisableRes => {
        expectSqoopHeaders(updateJobDisableRes)
        return updateJobDisableRes.json()
      })
    expect(updateJobDisableResJson).to.be.empty
    const getJobByJobNameResJson = await sqoopClient.getJobByJobName(firstJobName)
      .then(getJobByJobNameRes => {
        expectSqoopHeaders(getJobByJobNameRes)
        return getJobByJobNameRes.json()
      })
    const jobConfig = splitJobConfig(getJobByJobNameResJson)
    expect(jobConfig.topEnabled).to.be.false
  })

  test('updateJobEnable', async () => {
    const updateJobEnableResJson = await sqoopClient.updateJobEnable(firstJobName)
      .then(updateJobEnableRes => {
        expectSqoopHeaders(updateJobEnableRes)
        return updateJobEnableRes.json()
      })
    expect(updateJobEnableResJson).to.be.empty
    const getJobByJobNameResJson = await sqoopClient.getJobByJobName(firstJobName)
      .then(getJobByJobNameRes => {
        expectSqoopHeaders(getJobByJobNameRes)
        return getJobByJobNameRes.json()
      })
    const jobConfig = splitJobConfig(getJobByJobNameResJson)
    expect(jobConfig.topEnabled).to.be.true
  })

  test('deleteJob', async () => {
    const deleteJobResJson = await sqoopClient.deleteJob(firstJobName)
      .then(deleteJobRes => {
        expectSqoopHeaders(deleteJobRes)
        return deleteJobRes.json()
      })
    expect(deleteJobResJson).to.be.empty
    const getJobByJobNameRes = await sqoopClient.getJobByJobName(firstJobName)
    expect(getJobByJobNameRes.headers.get('sqoop-error-code')).to.equal('2000')
    expect(getJobByJobNameRes.headers.get('sqoop-error-message')).to.equal('ERROR')
    expect(getJobByJobNameRes.headers.get('sqoop-internal-error-code')).to.equal('SERVER_0006')
    expect(getJobByJobNameRes.headers.get('sqoop-internal-error-message')).to.equal(`SERVER_0006:Entity requested doesn't exist - Job: ${firstJobName} doesn't exist`)
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
