/* eslint-env mocha */
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
