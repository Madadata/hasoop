/* eslint-env mocha */
import { Hasoop } from '../src/index'

const sqoopClient = new Hasoop('')

suite('submission', () => {
  test.skip('getSubmission', () => {
    sqoopClient.getSubmission()
  })
})
