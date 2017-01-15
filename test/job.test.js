/* eslint-env mocha */
import { sqoopClient } from './index'

suite('job', () => {
  before(async () => {
    //create link for job test
  })

  test.skip('createJob', () => {
    sqoopClient.createJob()
  })

  test.skip('getJob', () => {
    sqoopClient.getJob()
  })

  test.skip('updateJob', () => {
    sqoopClient.updateJob()
  })

  test.skip('deleteJob', () => {
    sqoopClient.deleteJob()
  })

  test.skip('startJob', () => {
    sqoopClient.startJob()
  })

  test.skip('stopJob', () => {
    sqoopClient.stopJob()
  })
})
