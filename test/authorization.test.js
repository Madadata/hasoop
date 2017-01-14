import { expect } from 'chai'
import { sqoopClient } from './index'

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
