/* eslint-env mocha */

import { expect } from 'chai'
import { sqoopClient } from './index'

suite('link', () => {
  before(async () => {
    await sqoopClient.deleteLinkAll()
  })

  test('getLinkAllForEmpty', async () => {
    const data = await sqoopClient.getLinkAll()
    expect(data).to.have.property('links')
    expect(data['links']).to.have.lengthOf(0)
  })

  test('createLinkForMysql', async () => {
    const config = {
      'linkName': 'test_link_1',
      'linkType': 'mysql',
      'host': 'mysqlhost',
      'databaseName': 'same',
      'username': 'root',
      'password': '1234'
    }
    const data = await sqoopClient.createLink(config)
    console.log(JSON.stringify(data))
    expect(data['name']).to.equal('test_link_1')
  })

  test('updateLinkForMysql and getLinkByLinkName', async () => {
    const oldLinkName = 'test_link_1'
    const config = {
      'linkName': 'test_link_2',
      'linkType': 'mysql',
      'host': 'mysqlhost',
      'databaseName': 'same',
      'username': 'root',
      'password': '1234'
    }
    const updateData = await sqoopClient.updateLinkConfig(oldLinkName, config)
    console.log(JSON.stringify(updateData))
    const data = await sqoopClient.getLinkByLinkName('test_link_2')
    expect(data['links'][0]['name']).to.hasOwnProperty('test_link_2')
  }
  )

  test('getLinkByConnectorName', async () => {
    const connectorName = 'generic-jdbc-connector'
    const data = await sqoopClient.getLinkByConnectorName(connectorName)
    expect(data['links'][0]['name']).to.hasOwnProperty('test_link_2')
  })

  test('updateLinkDisable', async () => {
    const linkName = 'test_link_2'
    await sqoopClient.updateLinkDisable(linkName)
    const data = await sqoopClient.getLinkByLinkName(linkName)
    expect(data['links'][0]['enabled']).to.equal(false)
  })

  test('updateLinkEnable', async () => {
    const linkName = 'test_link_2'
    await sqoopClient.updateLinkEnable(linkName)
    const data = await sqoopClient.getLinkByLinkName(linkName)
    expect(data['links'][0]['enabled']).to.equal(true)
  })

  test('getLinkAll', async () => {
    const data = await sqoopClient.getLinkAll()
    expect(data['links']).to.have.lengthOf(1)
    expect(data['links'][0]['name']).to.equal('test_link_2')
  })

  test('deleteLink and deleteLinkAll', async () => {
    await sqoopClient.deleteLinkAll()
    const data = await sqoopClient.getLinkAll()
    expect(data).to.have.property('links')
    expect(data['links']).to.have.lengthOf(0)
  })
})
