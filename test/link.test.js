/**
 * Created by Chyroc on 17/1/10.
 */

import { expect } from 'chai'
import { Hasoop } from '../src/index'

const sqoopClient = new Hasoop('')

suite('link', () => {
  test.skip('createLink', () => {
    sqoopClient.createLink()
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

  test.skip('getLinkAll', () => {
    sqoopClient.getLinkAll()
  })

  test.skip('getLinkByConnectorName', () => {
    sqoopClient.getLink()
  })

  test.skip('getLinkByLinkName', () => {
    sqoopClient.getLink()
  })
})