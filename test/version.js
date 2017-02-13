/* eslint-env mocha */

import { expect } from 'chai'
import {
  sqoopClient,
  hasoopRequestDispose
 } from './index'

suite('version', () => {
  test('getVersion', async () => {
    const res = await sqoopClient.getVersion()
    const data = await hasoopRequestDispose('getVersion', res)
    expect(data.success).to.be.true
  })
})
