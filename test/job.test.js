/**
 * Created by Chyroc on 17/1/10.
 */

import { expect } from 'chai'
import { Hasoop } from '../src/index'

const sqoopClient = new Hasoop('')

suite('job', () => {
  test('createJob', () => {
    sqoopClient.createJob()
  })

  test('deleteJob', () => {
    sqoopClient.deleteJob()
  })

  test('getJob', () => {
    sqoopClient.getJob()
  })

  test('updateJob', () => {
    sqoopClient.updateJob()
  })

  test('startJob', () => {
    sqoopClient.startJob()
  })

  test('stopJob', () => {
    sqoopClient.stopJob()
  })
})