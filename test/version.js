/**
 * Created by Chyroc on 17/1/10.
 */

import { expect } from 'chai'
import { sqoopClient } from './index'

suite('utils', () => {
  test('getVersion', () => {
    const data = sqoopClient.getVersion()
  })
})