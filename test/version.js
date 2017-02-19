/* eslint-env mocha */

import { expect } from 'chai'
import {
  sqoopClient
} from './index'

suite('version', () => {
  test('getVersion', async () => {
    const data = await sqoopClient.getVersion()
    expect(data.success).to.be.true
  })
})
