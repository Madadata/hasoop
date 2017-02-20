/**
 * Created by Chyroc on 17/1/15.
 */
import _ from 'lodash'

/**
 * @ignore
 */
function splitTopConfig (config) {
  return _.omitBy(config, _.isObject)
}

const stringDecode = value => _.isString(value) ? decodeURIComponent(value) : value

const keyCamelCaseValueDecode = data => _(data)
  .toPairs()
  .map(keyValue => [_.camelCase(keyValue[0]), stringDecode(keyValue[1])])
  .fromPairs()
  .value()

/**
 * @ignore
 */
function splitInputsConfig (configs) {
  const configListObject = _(configs)
    .map('inputs')
    .flatten()
    .map(({name, value = null}) => {
      const nameSplit = name.split('.')
      return {[nameSplit[1]]: stringDecode(value)}
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
  return keyCamelCaseValueDecode({
    ...topConfig,
    ...otherConfig
  })
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
  return keyCamelCaseValueDecode({
    ..._.mapKeys(topConfig, (value, key) => `top_${key}`),
    ..._.mapKeys(driverConfig, (value, key) => `driver_${key}`),
    ..._.mapKeys(fromLinkConfig, (value, key) => `from_${key}`),
    ..._.mapKeys(toLinkConfig, (value, key) => `to_${key}`)
  })
}

export const splitSubmissionConfig = submissionInfo => ({
  topConfig: keyCamelCaseValueDecode(splitTopConfig(_.get(submissionInfo, 'submissions[0]'))),
  fromSchemaConfig: _.get(submissionInfo, 'submissions[0].from-schema', {}),
  toSchemaConfig: _.get(submissionInfo, 'submissions[0].to-schema', {})
})
