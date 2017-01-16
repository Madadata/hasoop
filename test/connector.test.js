/* eslint-env mocha */

import { expect } from 'chai'
import _ from 'lodash'

import { sqoopClient } from './index'

suite('connector', () => {
  test('getConnectorAll', async () => {
    const data = await sqoopClient.getConnectorAll()
    expect(data.connectors.length).to.equal(7)
  })

  test('getConnectorByConnectorName', async () => {
    const connectorName = 'generic-jdbc-connector'
    const data = await sqoopClient.getConnectorByConnectorName(connectorName)
    expect(_.get(data, 'connectors[0].name')).to.equal('generic-jdbc-connector')
  })
})
