/**
 * Created by Chyroc on 17/1/10.
 */

import { expect } from 'chai'
import { Hasoop } from '../src/index'

const sqoopClient = new Hasoop('')

suite('authorization', () => {
  test.skip('createRole', () => {
    sqoopClient.createRole()
  })

  test.skip('deleteRole', () => {
    sqoopClient.deleteRole()
  })

  test.skip('getRole', () => {
    sqoopClient.getRole()
  })
})
