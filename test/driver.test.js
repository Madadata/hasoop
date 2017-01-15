/* eslint-env mocha */
import { expect } from 'chai'
import { sqoopClient } from './index'

suite('driver', () => {
  test('getDriver', async () => {
    const data = await sqoopClient.getDriver()
    expect(data.version).to.equal('1')
    expect(data['all-config-resources']['jarConfig.label']).to.equal('Classpath configuration')
  })
})
