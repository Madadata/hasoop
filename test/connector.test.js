/**
 * Created by Chyroc on 17/1/10.
 */

import { expect } from 'chai'
import { sqoopClient } from './index'

suite('connector', () => {
  test('getConnectorAll', async () => {
    const data = await sqoopClient.getConnectorAll()
    expect(data['connectors'].length).to.equal(7)
  })

  test('getConnectorByConnectorName', async () => {
    const connectorName = 'generic-jdbc-connector'
    const data = await sqoopClient.getConnectorByConnectorName(connectorName)
    expect(data['connectors'][0]['name']).to.equal('generic-jdbc-connector')
  })
})
