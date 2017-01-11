/**
 * Created by Chyroc on 17/1/10.
 */

import { expect } from 'chai'
import { Hasoop } from '../src/index'

const sqoopClient = new Hasoop('')

suite('connector', () => {
  test.skip('getConnectorAll', () => {
    sqoopClient.getConnectorAll()
  })

  test.skip('getConnectorByConnectorName', () => {
    const connectorName = 'generic-jdbc-connector'
    sqoopClient.getConnectorByConnectorName(connectorName)
  })

})