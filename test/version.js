/* eslint-env mocha */
import { expect } from 'chai'
import _ from 'lodash'
import { sqoopClient, version } from './index'

suite('utils', () => {
  test('getVersion', async () => {
    const data = await sqoopClient.getVersion()
    expect(_.get(data, 'api-versions[0]')).to.equal(version)
  })
})
