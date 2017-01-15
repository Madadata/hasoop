/* eslint-env mocha */

import { expect } from 'chai'
import _ from 'lodash'
import { sqoopClient } from './index'

suite('link', () => {
  before(async () => {
    await sqoopClient.deleteLinkAll()
  })

  test('getLinkAllForEmpty', async () => {
    const data = await sqoopClient.getLinkAll()
    expect(data.links).to.be.empty
  })

  test('createLinkForMysql', async () => {
    const config = {
      'linkName': 'test_link_1',
      'linkType': 'mysql',
      'host': 'mysql',
      'databaseName': 'harry',
      'username': 'root',
      'password': '1234'
    }
    const data = await sqoopClient.createLink(config)
    expect(data.name).to.equal('test_link_1')
    expect(_.get(data, 'validation-result[0]')).to.be.empty
  })

  test('createLinkForHdfs', async () => {
    const config = {
      'linkName': 'test_link_hdfs',
      'linkType': 'hdfs',
      'uri': 'hdfs://localhost'
    }
    const data = await sqoopClient.createLink(config)
    expect(data.name).to.equal('test_link_hdfs')
    expect(_.get(data, 'validation-result[0]')).to.be.empty
  })

  test('updateLinkForMysql and getLinkByLinkName', async () => {
    const oldLinkName = 'test_link_1'
    const config = {
      'linkName': 'test_link_2',
      'linkType': 'mysql',
      'host': 'mysql',
      'databaseName': 'harry',
      'username': 'root',
      'password': '1234'
    }
    const updateData = await sqoopClient.updateLinkConfig(oldLinkName, config)
    expect(_.get(updateData, 'validation-result[0]')).to.be.empty
    const data = await sqoopClient.getLinkByLinkName('test_link_2')
    expect(_.get(data, 'links[0].name')).to.equal('test_link_2')
  }
  )

  test('getLinkByConnectorName', async () => {
    const connectorName = 'generic-jdbc-connector'
    const data = await sqoopClient.getLinkByConnectorName(connectorName)
    expect(_.get(data, 'links[0].name')).to.equal('test_link_2')
  })

  test('updateLinkDisable', async () => {
    const linkName = 'test_link_2'
    await sqoopClient.updateLinkDisable(linkName)
    const data = await sqoopClient.getLinkByLinkName(linkName)
    expect(_.get(data, 'links[0].enabled')).to.be.false
  })

  test('updateLinkEnable', async () => {
    const linkName = 'test_link_2'
    await sqoopClient.updateLinkEnable(linkName)
    const data = await sqoopClient.getLinkByLinkName(linkName)
    expect(_.get(data, 'links[0].enabled')).to.be.true
  })

  test('getLinkAll', async () => {
    const data = await sqoopClient.getLinkAll()
    expect(data.links).to.have.lengthOf(2)
    expect(_.get(data, 'links[0].name')).to.equal('test_link_hdfs')
    expect(_.get(data, 'links[1].name')).to.equal('test_link_2')
  })

  test.skip('deleteLink and deleteLinkAll', async () => {
    await sqoopClient.deleteLinkAll()
    const data = await sqoopClient.getLinkAll()
    expect(data.links).to.be.empty
  })
})
