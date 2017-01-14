/**
 * Created by Chyroc on 17/1/10.
 */

import { expect } from 'chai'
import { sqoopClient } from './index'

suite('utils', () => {
  test('getVersion', async () => {
    const data = await sqoopClient.getVersion()
    expect(data).to.be.an('object')
    expect(data['api-versions'][0]).to.equal('v1')
  })
})
