/**
 * Created by Chyroc on 17/1/10.
 */

import { expect } from 'chai'
import { sqoopClient } from './index'

suite('link', () => {
  test('getLinkAllForEmpty', async () => {
    const data = await sqoopClient.getLinkAll()
    expect(data).to.have.property('links')
    expect(data['links']).to.have.lengthOf(0)
  })

  test.skip('createLinkForMysql', async () => {
    //TODO wait for jdbc
    // const linkName = 'test_link_1'
    // const config = {
    //   'linkType': 'mysql',
    //   'host': 'mysqlhost',
    //   'databaseName': 'testdatabase',
    //   'username': 'root',
    //   'password': '1234',
    // }
    // const data = await sqoopClient.createLink(linkName, config)
    // console.log(JSON.stringify(data))
  })

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

  test.skip('getLinkAllForEmpty', () => {
    sqoopClient.getLinkAll()
  })

  test.skip('getLinkByConnectorName', () => {
    sqoopClient.getLinkByConnectorName()
  })

  test.skip('getLinkByLinkName', () => {
    sqoopClient.getLinkByLinkName()
  })
})