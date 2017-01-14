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

  // test('createLinkForMysql', async () => {
  //   const linkName = 'test_link_1'
  //   const config = {
  //     'linkType': 'mysql',
  //     'host': 'mysqlhost',
  //     'databaseName': 'testdatabase',
  //     'username': 'root',
  //     'password': '1234',
  //   }
  //   const data = await sqoopClient.createLink(linkName, config)
  //   console.log(JSON.stringify(data))
  // })

  test.skip('updateLinkConfig', () => {
    sqoopClient.updateLinkConfig()
  })

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

  test.skip('getLinkByLinkName', () => {
    sqoopClient.getLinkByLinkName()
  })

  test('deleteLinkAll', async () => {
    await sqoopClient.deleteLinkAll()
    const data = await sqoopClient.getLinkAll()
    expect(data).to.have.property('links')
    expect(data['links']).to.have.lengthOf(0)
  })

})