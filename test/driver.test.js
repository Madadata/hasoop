/* eslint-env mocha */
import { expect } from 'chai'
import { _ } from 'lodash'
import { sqoopClient } from './index'

suite('driver', () => {
  test('getDriver', async () => {
    const data = await sqoopClient.getDriver()
    expect(_.get(data, 'version')).to.equal('1')
    expect(data['all-config-resources']['jarConfig.label']).to.equal('Classpath configuration')
  })
})
