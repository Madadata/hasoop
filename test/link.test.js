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
    const updateLinkDisableJson = await sqoopClient.updateLinkDisable(secondMysqlLinkName)
      .then(res => {
        expectSqoopHeaders(res)
        return res.json()
      })
    expect(updateLinkDisableJson).to.be.empty
    const getLinkByLinkNameJson = await sqoopClient.getLinkByLinkName(secondMysqlLinkName)
      .then(res => {
        expectSqoopHeaders(res)
        return res.json()
      })
    const linkConfig = splitLinkConfig(getLinkByLinkNameJson)
    expect(linkConfig.name).to.equal(secondMysqlLinkName)
    expect(linkConfig.enabled).to.be.false
  })

  test('updateLinkEnable', async () => {
    const updateLinkEnableJson = await sqoopClient.updateLinkEnable(secondMysqlLinkName)
      .then(res => {
        expectSqoopHeaders(res)
        return res.json()
      })
    expect(updateLinkEnableJson).to.be.empty
    const getLinkByLinkNameJson = await sqoopClient.getLinkByLinkName(secondMysqlLinkName)
      .then(res => {
        expectSqoopHeaders(res)
        return res.json()
      })
    const linkConfig = splitLinkConfig(getLinkByLinkNameJson)
    expect(linkConfig.name).to.equal(secondMysqlLinkName)
    expect(linkConfig.enabled).to.be.true
  })

  test('getLinkAll', async () => {
    const getLinkAllResJson = await sqoopClient.getLinkAll()
      .then(getLinkAllRes => {
        expectSqoopHeaders(getLinkAllRes)
        return getLinkAllRes.json()
      })
    const linkNames = _.map(_.map(getLinkAllResJson.links, (linkObject) => {
      return splitLinkConfig({links: [linkObject]})
    }), 'name')
    expect(firstHdfsLinkName).to.be.oneOf(linkNames)
    expect(secondMysqlLinkName).to.be.oneOf(linkNames)
  })

  test('deleteLink', async () => {
    const deleteLinkResJson = await sqoopClient.deleteLink(firstHdfsLinkName)
      .then(deleteLinkRes => {
        expectSqoopHeaders(deleteLinkRes)
        return deleteLinkRes.json()
      })
    expect(deleteLinkResJson).to.be.empty
    const getLinkByLinkNameRes = await sqoopClient.getLinkByLinkName(firstHdfsLinkName)
    expect(getLinkByLinkNameRes.headers.get('sqoop-error-code')).to.equal('2000')
    expect(getLinkByLinkNameRes.headers.get('sqoop-error-message')).to.equal('ERROR')
    expect(getLinkByLinkNameRes.headers.get('sqoop-internal-error-code')).to.equal('SERVER_0006')
    expect(getLinkByLinkNameRes.headers.get('sqoop-internal-error-message')).to.equal(`SERVER_0006:Entity requested doesn't exist - Invalid link name: ${firstHdfsLinkName} doesn't exist`)
  })
})
