/**
 * Created by Chyroc on 17/1/10.
 */

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
      'databaseName': 'testdatabase',
      'username': 'root',
      'password': '1234',
    }
    const data = await sqoopClient.createLink(config)
    expect(data['name']).to.equal('test_link_1')
  })

  test('updateLinkForMysql and getLinkByLinkName', async () => {
      const oldLinkName = 'test_link_1'
      const config = {
        'linkName': 'test_link_2',
        'linkType': 'mysql',
        'host': 'mysqlhost',
        'databaseName': 'testdatabase',
        'username': 'root',
        'password': '12343456',
      }
      await sqoopClient.updateLinkConfig(oldLinkName, config)
      const data = await sqoopClient.getLinkByLinkName('test_link_2')
      expect(data['links'][0]['name']).to.hasOwnProperty('test_link_2')
    }
  )

  test.skip('updateLinkEnable', () => {
    sqoopClient.updateLinkEnable()
  })

  test.skip('updateLinkDisable', () => {
    sqoopClient.updateLinkDisable()
  })

  test.skip('deleteLink', () => {
    sqoopClient.deleteLink()
  })

  test.skip('getLinkAll', () => {
    sqoopClient.getLinkAll()
  })

  test.skip('getLinkByConnectorName', () => {
    sqoopClient.getLinkByConnectorName()
  })

  test('deleteLinkAll', async () => {
    await sqoopClient.deleteLinkAll()
    const data = await sqoopClient.getLinkAll()
    expect(data).to.have.property('links')
    expect(data['links']).to.have.lengthOf(0)
  })

})