/**
 * Created by Chyroc on 17/1/10.
 */

import { expect } from 'chai'
import { Hasoop } from '../src/index'

const sqoopClient = new Hasoop('')

suite('utils', () => {
  test('getVersion', () => {
    sqoopClient.getVersion()
  })

})