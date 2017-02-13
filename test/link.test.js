/* eslint-env mocha */

import faker from 'faker'
import { expect } from 'chai'
import {
  sqoopClient,
  generateMysqlConfig,
  generateHdfsConfig,
  hasoopRequestDispose
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
    const res = await sqoopClient.createLink(config)
    const data = await hasoopRequestDispose('createLink', res, firstMysqlLinkName)
    expect(data.success).to.be.true
  })

  test('createLinkForHdfs', async () => {
    const config = generateHdfsConfig(firstHdfsLinkName)
    const res = await sqoopClient.createLink(config)
    const data = await hasoopRequestDispose('createLink', res, firstHdfsLinkName)
    expect(data.success).to.be.true
  })

  test('getMyqlLinkByLinkName', async () => {
    const res = await sqoopClient.getLinkByLinkName(firstMysqlLinkName)
    const data = await hasoopRequestDispose('getLinkByLinkName', res, firstMysqlLinkName)
    expect(data.success).to.be.true
  })

  test('getHdfsLinkByLinkName', async () => {
    const res = await sqoopClient.getLinkByLinkName(firstHdfsLinkName)
    const data = await hasoopRequestDispose('getLinkByLinkName', res, firstHdfsLinkName)
    expect(data.success).to.be.true
  })

  test('updateLinkForMysql', async () => {
    const config = generateMysqlConfig(secondMysqlLinkName)
    const res = await sqoopClient.updateLinkConfig(firstMysqlLinkName, config)
    const data = await hasoopRequestDispose('updateLinkConfig', res)
    expect(data.success).to.be.true
  })

  test('getLinkByConnectorName', async () => {
    const connectorName = 'generic-jdbc-connector'
    const res = await sqoopClient.getLinkByConnectorName(connectorName)
    const data = await hasoopRequestDispose('getLinkByConnectorName', res, connectorName)
    expect(data.success).to.be.true
  })

  test('updateLinkDisable', async () => {
    const res = await sqoopClient.updateLinkDisable(secondMysqlLinkName)
    const data = await hasoopRequestDispose('updateLinkDisable', res, secondMysqlLinkName)
    expect(data.success).to.be.true
  })

  test('updateLinkEnable', async () => {
    const res = await sqoopClient.updateLinkEnable(secondMysqlLinkName)
    const data = await hasoopRequestDispose('updateLinkEnable', res, secondMysqlLinkName)
    expect(data.success).to.be.true
  })

  test('getLinkAll', async () => {
    const res = await sqoopClient.getLinkAll()
    const data = await hasoopRequestDispose('getLinkAll', res)
    expect(data.success).to.be.true
  })

  test('deleteLink', async () => {
    const res = await sqoopClient.deleteLink(firstHdfsLinkName)
    const data = await hasoopRequestDispose('deleteLink', res, firstHdfsLinkName)
    expect(data.success).to.be.true
  })
})
