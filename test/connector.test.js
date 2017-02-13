/* eslint-env mocha */

import { expect } from 'chai'
import {
  sqoopClient,
  hasoopRequestDispose
 } from './index'

suite('connector', () => {
  test('getConnectorAll', async () => {
    const res = await sqoopClient.getConnectorAll()
    const data = await hasoopRequestDispose('getConnectorAll', res)
    expect(data.success).to.be.true
  })

  test('getConnectorByConnectorName', async () => {
    const connectorName = 'generic-jdbc-connector'
    const res = await sqoopClient.getConnectorByConnectorName(connectorName)
    const data = await hasoopRequestDispose('getConnectorByConnectorName', res, connectorName)
    expect(data.success).to.be.true
  })
})
