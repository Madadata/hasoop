import { expect } from 'chai'
import { sqoopClient } from './index'

suite('job', () => {
  test.skip('createJob', () => {
    sqoopClient.createJob()
  })

  test.skip('deleteJob', () => {
    sqoopClient.deleteJob()
  })

  test.skip('getJob', () => {
    sqoopClient.getJob()
  })

  test.skip('updateJob', () => {
    sqoopClient.updateJob()
  })

  test.skip('startJob', () => {
    sqoopClient.startJob()
  })

  test.skip('stopJob', () => {
    sqoopClient.stopJob()
  })
})
