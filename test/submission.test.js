<<<<<<< HEAD
/**
 * Created by Chyroc on 17/1/10.
 */

import { expect } from 'chai'
import { sqoopClient } from './index'
=======
/* eslint-env mocha */
import { Hasoop } from '../src/index'

const sqoopClient = new Hasoop('')
>>>>>>> master

suite('submission', () => {
  test.skip('getSubmission', () => {
    sqoopClient.getSubmission()
  })
})
