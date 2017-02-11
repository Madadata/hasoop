/* eslint-env mocha */

import _ from 'lodash'
import faker from 'faker'
import { expect } from 'chai'
import {
  sqoopClient,
  generateMysqlConfig,
  generateHdfsConfig,
  expectSqoopHeaders,
  splitLinkConfig
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
    const json = await res.json()
    expectSqoopHeaders(res)
    expect(json).to.deep.equal({'name': firstMysqlLinkName, 'validation-result': [{}]})
  })

  test('createLinkForHdfs', async () => {
    const config = generateHdfsConfig(firstHdfsLinkName)
    const res = await sqoopClient.createLink(config)
    const json = await res.json()
    expectSqoopHeaders(res)
    expect(json).to.deep.equal({'name': firstHdfsLinkName, 'validation-result': [{}]})
  })

  test('getMyqlLinkByLinkName', async () => {
    const getLinkRes = await sqoopClient.getLinkByLinkName(firstMysqlLinkName)
    const getLinkResJson = await getLinkRes.json()
    expectSqoopHeaders(getLinkRes)
    const linkConfig = splitLinkConfig(getLinkResJson)
    expect(linkConfig.name).to.equal(firstMysqlLinkName)
    expect(linkConfig).to.have.all.keys(
      'id', 'enabled', 'updateUser', 'name',
      'connectorName', 'creationDate', 'updateDate', 'creationUser',
      'jdbcDriver', 'connectionString', 'username', 'password', 'fetchSize',
      'jdbcProperties', 'identifierEnclose'
    )
  })

  test('getHdfsLinkByLinkName', async () => {
    const getLinkRes = await sqoopClient.getLinkByLinkName(firstHdfsLinkName)
    const getLinkResJson = await getLinkRes.json()
    expectSqoopHeaders(getLinkRes)
    const linkConfig = splitLinkConfig(getLinkResJson)
    expect(linkConfig.name).to.equal(firstHdfsLinkName)
    expect(linkConfig).to.have.all.keys(
      'id', 'enabled', 'updateUser', 'name', 'connectorName', 'creationDate',
      'updateDate', 'creationUser', 'uri', 'confDir', 'configOverrides'
    )
  })

  test('updateLinkForMysql', async () => {
    const config = generateMysqlConfig(secondMysqlLinkName)
    const updateResJson = await sqoopClient.updateLinkConfig(firstMysqlLinkName, config)
      .then(updateRes => updateRes.json())
    expect(updateResJson).to.deep.equal({ 'validation-result': [ {} ] })
    const getLinkResJson = await sqoopClient.getLinkByLinkName(secondMysqlLinkName)
      .then(getLinkRes => getLinkRes.json())
    const linkConfig = splitLinkConfig(getLinkResJson)
    expect(linkConfig.name).to.equal(secondMysqlLinkName)
  })

  test('getLinkByConnectorName', async () => {
    const connectorName = 'generic-jdbc-connector'
    const res = await sqoopClient.getLinkByConnectorName(connectorName)
    const json = await res.json()
    const linkNames = _.map(json.links, 'name')
    expectSqoopHeaders(res)
    expect(secondMysqlLinkName).to.be.oneOf(linkNames)
  })

  test('updateLinkDisable', async () => {
    await sqoopClient.updateLinkDisable(secondMysqlLinkName)
    const res = await sqoopClient.getLinkByLinkName(secondMysqlLinkName)
    const json = await res.json()
    expectSqoopHeaders(res)
    expect(_.get(json, 'links[0].enabled')).to.be.false
  })

  test('updateLinkEnable', async () => {
    await sqoopClient.updateLinkEnable(secondMysqlLinkName)
    const res = await sqoopClient.getLinkByLinkName(secondMysqlLinkName)
    const json = await res.json()
    expectSqoopHeaders(res)
    expect(_.get(json, 'links[0].enabled')).to.be.true
  })

  test('getLinkAll', async () => {
    const res = await sqoopClient.getLinkAll()
    const json = await res.json()
    const linkNames = _.map(json.links, 'name')
    expectSqoopHeaders(res)
    expect(firstHdfsLinkName).to.be.oneOf(linkNames)
    expect(secondMysqlLinkName).to.be.oneOf(linkNames)
  })

  test('deleteLink', async () => {
    const hdfsRes = await sqoopClient.deleteLink(firstHdfsLinkName)
    const hdfsResJson = await hdfsRes.json()
    expectSqoopHeaders(hdfsRes)
    expect(hdfsResJson).to.be.empty
    const mysqlRes = await sqoopClient.deleteLink(secondMysqlLinkName)
    const mysqlResJson = await mysqlRes.json()
    expectSqoopHeaders(mysqlRes)
    expect(mysqlResJson).to.be.empty
  })
})
