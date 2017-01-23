/* eslint-env mocha */

import { sqoopClient } from './index'

suite('submission', () => {
  test.skip('getSubmissionAll', () => {
    sqoopClient.getSubmissionAll()
  })

  test.skip('getSubmissionByJobName', () => {
    sqoopClient.getSubmissionByJobName()
  })
})
