/* eslint-env mocha */

import { expect } from 'chai'
import { splitLinkConfig, splitJobConfig, splitSubmissionConfig } from './index'
import { splitLinkConfigTestData, splitJobConfigTestData, splitSubmissionConfigTestData } from './utils.test.json.js'

suite('utils', () => {
  test('splitLinkConfig', () => {
    const linkConfigData = splitLinkConfig(splitLinkConfigTestData.info)
    expect(linkConfigData).to.deep.equal(splitLinkConfigTestData.config)
  })

  test('splitJobConfig', () => {
    const splitJobConfigData = splitJobConfig(splitJobConfigTestData.info)
    expect(splitJobConfigData).to.deep.equal(splitJobConfigTestData.config)
  })

  test('splitSubmissionConfig', () => {
    const splitSubmissionConfigData = splitSubmissionConfig(splitSubmissionConfigTestData.info)
    expect(splitSubmissionConfigData).to.deep.equal(splitSubmissionConfigTestData.config)
  })
})
