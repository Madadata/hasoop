/* eslint-env mocha */

import { sqoopClient, expectSqoopHeaders } from './index'

suite('driver', () => {
  test('getDriver', async () => {
    const res = await sqoopClient.getDriver()
    expectSqoopHeaders(res)
  })
})
