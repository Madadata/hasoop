/* eslint-env mocha */

import _ from 'lodash'
import faker from 'faker'
import { expect } from 'chai'

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
    const json = await res.json()
    expectSqoopHeaders(res)
    expect(json.name).to.equal(firstMysqlLinkName)
    expect(_.get(json, 'validation-result[0]')).to.be.empty
  })

  test('createLinkForHdfs', async () => {
    const config = generateHdfsConfig(firstHdfsLinkName)
    const res = await sqoopClient.createLink(config)
    const json = await res.json()
    expectSqoopHeaders(res)
    expect(json.name).to.equal(firstHdfsLinkName)
    expect(_.get(json, 'validation-result[0]')).to.be.empty
  })

  test('updateLinkForMysql and getLinkByLinkName', async () => {
    const config = generateMysqlConfig(secondMysqlLinkName)
    const updateRes = await sqoopClient.updateLinkConfig(firstMysqlLinkName, config)
    const updateResJson = await updateRes.json()
    expectSqoopHeaders(updateRes)
    expect(_.get(updateResJson, 'validation-result[0]')).to.be.empty
    const getLinkRes = await sqoopClient.getLinkByLinkName(secondMysqlLinkName)
    const getLinkResJson = await getLinkRes.json()
    expectSqoopHeaders(getLinkRes)
    expect(_.get(getLinkResJson, 'links[0].name')).to.equal(secondMysqlLinkName)
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
