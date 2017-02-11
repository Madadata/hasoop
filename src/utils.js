/**
 * Created by Chyroc on 17/1/15.
 */
import _ from 'lodash'
import { expect } from 'chai'

export function expectSqoopHeaders (res) {
  expect(res.headers.get('sqoop-error-code')).to.equal('1000')
  expect(res.headers.get('sqoop-error-message')).to.equal('OK')
}

/**
 * @ignore
 */
function splitTopConfig (config) {
  return _.omitBy(config, _.isObject)
}

/**
 * @ignore
 */
function splitInputsConfig (configs) {
  const configListObject = _(configs)
    .map(configInput => configInput.inputs)
    .flatten()
    .map(({name, value = null}) => {
      const nameSplit = name.split('.')
      return {[nameSplit[1]]: _.isString(value) ? decodeURIComponent(value) : value}
    })
    .value()
  return _.merge(...configListObject)
}

/**
 * split link config.
 *
 * @param linkInfo
 * @returns {{}}
 */
export function splitLinkConfig (linkInfo) {
  const topConfig = splitTopConfig(_.get(linkInfo, 'links[0]'))
  const otherConfig = splitInputsConfig(_.get(linkInfo, 'links[0].link-config-values.configs'))
  return _.transform({
    ...topConfig,
    ...otherConfig
  }, (result, value, key) => _.set(result, _.camelCase(key), _.isString(value) ? decodeURIComponent(value) : value), {})
}

/**
 * split job config.
 *
 * @param jobInfo
 * @returns {{}}
 */
export function splitJobConfig (jobInfo) {
  const topConfig = splitTopConfig(_.get(jobInfo, 'jobs[0]'))
  const fromLinkConfig = splitInputsConfig(_.get(jobInfo, 'jobs[0].from-config-values.configs'))
  const toLinkConfig = splitInputsConfig(_.get(jobInfo, 'jobs[0].to-config-values.configs'))
  const driverConfig = splitInputsConfig(_.get(jobInfo, 'jobs[0].driver-config-values.configs'))
  return _.transform({
    ..._.mapKeys(topConfig, (value, key) => `top_${key}`),
    ..._.mapKeys(driverConfig, (value, key) => `driver_${key}`),
    ..._.mapKeys(fromLinkConfig, (value, key) => `from_${key}`),
    ..._.mapKeys(toLinkConfig, (value, key) => `to_${key}`)
  }, (result, value, key) => _.set(result, _.camelCase(key), _.isString(value) ? decodeURIComponent(value) : value), {})
}

export function splitSubmissionConfig (submissionInfo) {
  const topConfig = _.transform({
    ...splitTopConfig(_.get(submissionInfo, 'submissions[0]'))
  }, (result, value, key) => _.set(result, _.camelCase(key), _.isString(value) ? decodeURIComponent(value) : value), {})
  return {
    topConfig,
    fromSchemaConfig: _.get(submissionInfo, 'submissions[0].from-schema'),
    toSchemaConfig: _.get(submissionInfo, 'submissions[0].to-schema')
  }
}
