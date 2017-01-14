/* eslint-env mocha */

import { sqoopClient } from './index'
import { suite } from 'mocha'

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
