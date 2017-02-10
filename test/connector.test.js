/* eslint-env mocha */

import { sqoopClient, expectSqoopHeaders } from './index'

suite('connector', () => {
  test('getConnectorAll', async () => {
    const res = await sqoopClient.getConnectorAll()
    expectSqoopHeaders(res)
  })

  test('getConnectorByConnectorName', async () => {
    const connectorName = 'generic-jdbc-connector'
    const res = await sqoopClient.getConnectorByConnectorName(connectorName)
    expectSqoopHeaders(res)
  })
})
