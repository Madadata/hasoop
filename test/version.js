/* eslint-env mocha */
import { expect } from 'chai'
import { sqoopClient } from './index'

suite('utils', () => {
  test('getVersion', async () => {
    const data = await sqoopClient.getVersion()
    expect(data).to.be.an('object')
    expect(data['api-versions'][0]).to.equal('v1')
  })
})
