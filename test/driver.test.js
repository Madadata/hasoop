/* eslint-env mocha */

import { expect } from 'chai'
import {
  sqoopClient,
  hasoopRequestDispose
 } from './index'

suite('driver', () => {
  test('getDriver', async () => {
    const res = await sqoopClient.getDriver()
    const data = await hasoopRequestDispose('getDriver', res)
    expect(data.success).to.be.true
  })
})
