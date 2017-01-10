/* eslint-env mocha */
import { expect } from 'chai'
import index from '../src'

describe('whatever should work', () => {
  it('works', () => {
    expect(1).to.be.equal(1)
    expect(index).to.be.empty
  })
})
