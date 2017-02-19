/* eslint-env mocha */

import { expect } from 'chai'
import {
  sqoopClient
} from './index'

suite('driver', () => {
  test('getDriver', async () => {
    const data = await sqoopClient.getDriver()
    expect(data.success).to.be.true
  })
})
