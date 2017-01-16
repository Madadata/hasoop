/* eslint-env mocha */

import { sqoopClient } from './index'

suite('submission', () => {
  test.skip('getSubmission', () => {
    sqoopClient.getSubmission()
  })
})
