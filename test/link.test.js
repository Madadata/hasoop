/**
 * Created by Chyroc on 17/1/10.
 */

import { expect } from 'chai'
import { Hasoop } from '../src/index'

const sqoopClient = new Hasoop('')

suite('link', () => {
  test('createLink', () => {
    sqoopClient.createLink()
  })

  test('updateLink', () => {
    sqoopClient.updateLink()
  })

  test('deleteLink', () => {
    sqoopClient.deleteLink()
  })

  test('getLink', () => {
    sqoopClient.getLink()
  })
})