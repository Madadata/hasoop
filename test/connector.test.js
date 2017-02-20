/* eslint-env mocha */

import { expect } from 'chai'
import {
  sqoopClient
 } from './index'

suite('connector', () => {
  test('getConnectorAll', async () => {
    const data = await sqoopClient.getConnectorAll()
    expect(data.success).to.be.true
  })

  test('getConnectorByConnectorName', async () => {
    const connectorName = 'generic-jdbc-connector'
    const data = await sqoopClient.getConnectorByConnectorName(connectorName)
    expect(data.success).to.be.true
  })
})
