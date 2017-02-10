/* eslint-env mocha */

import { expect } from 'chai'
import faker from 'faker'

import { sqoopClient, generateMysqlConfig, generateHdfsConfig, expectSqoopHeaders } from './index'

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
    expectSqoopHeaders(res)
  })

  test('createLinkForHdfs', async () => {
    const config = generateHdfsConfig(firstHdfsLinkName)
    const res = await sqoopClient.createLink(config)
    const jsonRes = await res.json()
    expectSqoopHeaders(res)
    expect(jsonRes.name).to.equal(firstHdfsLinkName)
  })

  test('updateLinkForMysql and getLinkByLinkName', async () => {
    const config = generateMysqlConfig(secondMysqlLinkName)
    const updateRes = await sqoopClient.updateLinkConfig(firstMysqlLinkName, config)
    expectSqoopHeaders(updateRes)
    const getLinkRes = await sqoopClient.getLinkByLinkName(secondMysqlLinkName)
    expectSqoopHeaders(getLinkRes)
  })

  test('getLinkByConnectorName', async () => {
    const connectorName = 'generic-jdbc-connector'
    const res = await sqoopClient.getLinkByConnectorName(connectorName)
    expectSqoopHeaders(res)
  })

  test('updateLinkDisable', async () => {
    await sqoopClient.updateLinkDisable(secondMysqlLinkName)
    const res = await sqoopClient.getLinkByLinkName(secondMysqlLinkName)
    expectSqoopHeaders(res)
  })

  test('updateLinkEnable', async () => {
    await sqoopClient.updateLinkEnable(secondMysqlLinkName)
    const res = await sqoopClient.getLinkByLinkName(secondMysqlLinkName)
    expectSqoopHeaders(res)
  })

  test('getLinkAll', async () => {
    const res = await sqoopClient.getLinkAll()
    expectSqoopHeaders(res)
  })

  test('deleteLink', async () => {
    const hdfsData = await sqoopClient.deleteLink(firstHdfsLinkName)
    expectSqoopHeaders(hdfsData)
    const mysqlData = await sqoopClient.deleteLink(secondMysqlLinkName)
    expectSqoopHeaders(mysqlData)
  })
})
