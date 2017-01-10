/**
 * Created by Chyroc on 17/1/10.
 */

import { expect } from 'chai'
import { Hasoop } from '../src/index'

const sqoopClient = new Hasoop('')

suite('connector', () => {
  test.skip('getConnector', () => {
    sqoopClient.getConnector()
  })

})