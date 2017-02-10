/* eslint-env mocha */

import _ from 'lodash'
import { expect } from 'chai'
import { sqoopClient, version, expectSqoopHeaders } from './index'

suite('version', () => {
  test('getVersion', async () => {
    const res = await sqoopClient.getVersion()
    const json = await res.json()
    expectSqoopHeaders(res)
    expect(_.get(json, 'api-versions[0]')).to.equal(version)
  })
})
