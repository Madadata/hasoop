/* eslint-env mocha */

import _ from 'lodash'
import { expect } from 'chai'
import { sqoopClient, expectSqoopHeaders } from './index'

suite('driver', () => {
  test('getDriver', async () => {
    const res = await sqoopClient.getDriver()
    const json = await res.json()
    expectSqoopHeaders(res)
    expect(json.version).to.equal('1')
    expect(_.get(json, ['all-config-resources', 'jarConfig.label'])).to.equal('Classpath configuration')
  })
})
