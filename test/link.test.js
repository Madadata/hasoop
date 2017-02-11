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
    const json = await sqoopClient.createLink(config)
      .then(res => {
        expectSqoopHeaders(res)
        return res.json()
      })
    expect(json).to.deep.equal({'name': firstMysqlLinkName, 'validation-result': [{}]})
  })

  test('createLinkForHdfs', async () => {
    const config = generateHdfsConfig(firstHdfsLinkName)
    const json = await sqoopClient.createLink(config)
      .then(res => {
        expectSqoopHeaders(res)
        return res.json()
      })
    expect(json).to.deep.equal({'name': firstHdfsLinkName, 'validation-result': [{}]})
  })

  test('getMyqlLinkByLinkName', async () => {
    const getLinkResJson = await sqoopClient.getLinkByLinkName(firstMysqlLinkName)
      .then(getLinkRes => {
        expectSqoopHeaders(getLinkRes)
        return getLinkRes.json()
      })
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
    const getLinkResJson = await sqoopClient.getLinkByLinkName(firstHdfsLinkName)
      .then(getLinkRes => {
        expectSqoopHeaders(getLinkRes)
        return getLinkRes.json()
      })
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
      .then(updateRes => {
        expectSqoopHeaders(updateRes)
        return updateRes.json()
      })
    expect(updateResJson).to.deep.equal({ 'validation-result': [ {} ] })
    const getLinkResJson = await sqoopClient.getLinkByLinkName(secondMysqlLinkName)
      .then(getLinkRes => {
        expectSqoopHeaders(getLinkRes)
        return getLinkRes.json()
      })
    const linkConfig = splitLinkConfig(getLinkResJson)
    expect(linkConfig.name).to.equal(secondMysqlLinkName)
  })

  test('getLinkByConnectorName', async () => {
    const connectorName = 'generic-jdbc-connector'
    const json = await sqoopClient.getLinkByConnectorName(connectorName)
      .then(res => {
        expectSqoopHeaders(res)
        return res.json()
      })
    const linkNames = _.map(_.map(json.links, (linkObject) => {
      return splitLinkConfig({links: [linkObject]})
    }), 'name')
    expect(secondMysqlLinkName).to.be.oneOf(linkNames)
  })

  test('updateLinkDisable', async () => {
    await sqoopClient.updateLinkDisable(secondMysqlLinkName)
    const json = await sqoopClient.getLinkByLinkName(secondMysqlLinkName)
      .thrn(res => {
        expectSqoopHeaders(res)
        return res.json()
      })
    console.log('json', json)
    // expect(_.get(json, 'links[0].enabled')).to.be.false

    const getLinkResJson = await sqoopClient.getLinkByLinkName(secondMysqlLinkName)
      .then(getLinkRes => {
        expectSqoopHeaders(getLinkRes)
        return getLinkRes.json()
      })

    console.log('link config', splitLinkConfig(getLinkResJson))
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
