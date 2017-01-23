/* eslint-env mocha */

import { expect } from 'chai'
import _ from 'lodash'
import faker from 'faker'

import { sqoopClient, generateMysqlConfig, generateHdfsConfig } from './index'

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
    expect(data.name).to.equal(firstMysqlLinkName)
    expect(_.get(data, 'validation-result[0]')).to.be.empty
  })

  test('createLinkForHdfs', async () => {
    const config = generateHdfsConfig(firstHdfsLinkName)
    const data = await sqoopClient.createLink(config)
    expect(data.name).to.equal(firstHdfsLinkName)
    expect(_.get(data, 'validation-result[0]')).to.be.empty
  })

  test('updateLinkForMysql and getLinkByLinkName', async () => {
    const config = generateMysqlConfig(secondMysqlLinkName)
    const updateData = await sqoopClient.updateLinkConfig(firstMysqlLinkName, config)
    expect(_.get(updateData, 'validation-result[0]')).to.be.empty
    const data = await sqoopClient.getLinkByLinkName(secondMysqlLinkName)
    expect(_.get(data, 'links[0].name')).to.equal(secondMysqlLinkName)
  })

  test('getLinkByConnectorName', async () => {
    const connectorName = 'generic-jdbc-connector'
    const data = await sqoopClient.getLinkByConnectorName(connectorName)
    const linkNames = _.map(data.links, 'name')
    expect(secondMysqlLinkName).to.be.oneOf(linkNames)
  })

  test('updateLinkDisable', async () => {
    await sqoopClient.updateLinkDisable(secondMysqlLinkName)
    const data = await sqoopClient.getLinkByLinkName(secondMysqlLinkName)
    expect(_.get(data, 'links[0].enabled')).to.be.false
  })

  test('updateLinkEnable', async () => {
    await sqoopClient.updateLinkEnable(secondMysqlLinkName)
    const data = await sqoopClient.getLinkByLinkName(secondMysqlLinkName)
    expect(_.get(data, 'links[0].enabled')).to.be.true
  })

  test('getLinkAll', async () => {
    const data = await sqoopClient.getLinkAll()
    const linkNames = _.map(data.links, 'name')
    expect(firstHdfsLinkName).to.be.oneOf(linkNames)
    expect(secondMysqlLinkName).to.be.oneOf(linkNames)
  })

  test('deleteLink', async () => {
    const hdfsData = await sqoopClient.deleteLink(firstHdfsLinkName)
    expect(hdfsData).to.be.empty
    const mysqlData = await sqoopClient.deleteLink(secondMysqlLinkName)
    expect(mysqlData).to.be.empty
  })
})
