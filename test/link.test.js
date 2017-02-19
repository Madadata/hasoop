/* eslint-env mocha */

import faker from 'faker'
import { expect } from 'chai'
import {
  sqoopClient,
  generateMysqlConfig,
  generateHdfsConfig
} from './index'

suite('link', () => {
  let firstMysqlLinkName
  let secondMysqlLinkName
  let firstHdfsLinkName

  before(() => {
    firstMysqlLinkName = faker.name.findName()
    secondMysqlLinkName = faker.name.findName()
    firstHdfsLinkName = faker.name.findName()
  })

  test('createLinkForMysql', async () => {
    const config = generateMysqlConfig(firstMysqlLinkName)
    const data = await sqoopClient.createLink(config)
    expect(data.success).to.be.true
  })

  test('createLinkForHdfs', async () => {
    const config = generateHdfsConfig(firstHdfsLinkName)
    const data = await sqoopClient.createLink(config)
    expect(data.success).to.be.true
  })

  test('getMyqlLinkByLinkName', async () => {
    const data = await sqoopClient.getLinkByLinkName(firstMysqlLinkName)
    expect(data.success).to.be.true
  })

  test('getHdfsLinkByLinkName', async () => {
    const data = await sqoopClient.getLinkByLinkName(firstHdfsLinkName)
    expect(data.success).to.be.true
  })

  test('updateLinkForMysql', async () => {
    const config = generateMysqlConfig(secondMysqlLinkName)
    const data = await sqoopClient.updateLinkConfig(firstMysqlLinkName, config)
    expect(data.success).to.be.true
  })

  test('getLinkByConnectorName', async () => {
    const connectorName = 'generic-jdbc-connector'
    const data = await sqoopClient.getLinkByConnectorName(connectorName)
    expect(data.success).to.be.true
  })

  test('updateLinkDisable', async () => {
    const data = await sqoopClient.updateLinkDisable(secondMysqlLinkName)
    expect(data.success).to.be.true
  })

  test('updateLinkEnable', async () => {
    const data = await sqoopClient.updateLinkEnable(secondMysqlLinkName)
    expect(data.success).to.be.true
  })

  test('getLinkAll', async () => {
    const data = await sqoopClient.getLinkAll()
    expect(data.success).to.be.true
  })

  test('deleteLink', async () => {
    const data = await sqoopClient.deleteLink(firstHdfsLinkName)
    expect(data.success).to.be.true
  })
})
