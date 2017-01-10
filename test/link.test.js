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

  test.skip('updateLink', () => {
    sqoopClient.updateLink()
  })

  test.skip('deleteLink', () => {
    sqoopClient.deleteLink()
  })

  test.skip('getLink', () => {
    sqoopClient.getLink()
  })
})