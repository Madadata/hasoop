/* eslint-env mocha */

import { sqoopClient, expectSqoopHeaders } from './index'

suite('version', () => {
  test('getVersion', async () => {
    const res = await sqoopClient.getVersion()
    expectSqoopHeaders(res)
  })
})
