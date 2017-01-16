/* eslint-env mocha */

import { expect } from 'chai'
import _ from 'lodash'

import { sqoopClient } from './index'

suite('driver', () => {
  test('getDriver', async () => {
    const data = await sqoopClient.getDriver()
    expect(data.version).to.equal('1')
    expect(_.get(data, ['all-config-resources', 'jarConfig.label'])).to.equal('Classpath configuration')
  })
})
