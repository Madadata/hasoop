/* eslint-env mocha */

import _ from 'lodash'
import { expect } from 'chai'
import { sqoopClient, expectSqoopHeaders } from './index'

suite('connector', () => {
  test('getConnectorAll', async () => {
    const resJson = await sqoopClient.getConnectorAll()
      .then(res => {
        expectSqoopHeaders(res)
        return res.json()
      })
    expect(resJson.connectors.length).to.equal(7)
    const connectorNames = _.map(resJson.connectors, 'name')
    expect('hdfs-connector').to.be.oneOf(connectorNames)
    expect('generic-jdbc-connector').to.be.oneOf(connectorNames)
  })

  test('getConnectorByConnectorName', async () => {
    const connectorName = 'generic-jdbc-connector'
    const res = await sqoopClient.getConnectorByConnectorName(connectorName)
    const json = await res.json()
    expectSqoopHeaders(res)
    expect(_.get(json, 'connectors[0].name')).to.equal('generic-jdbc-connector')
  })
})
