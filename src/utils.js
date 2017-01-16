/**
 * Created by Chyroc on 17/1/15.
 */
import _ from 'lodash'

function splitTopConfig (config) {
  const topConfig = {}
  _.map(config, (value, key) => {
    if (!_.isArray(value) && !_.isObject(value)) {
      _.set(topConfig, key, value)
    }
  })
  return topConfig
}

function splitInputsConfig (configs) {
  const inputConfig = {}
  for (let config of configs) {
    for (let input of config.inputs) {
      const nameSplit = input.name.split('.')
      inputConfig[nameSplit[1]] = input.value ? decodeURIComponent(input.value) : null
    }
  }
  return inputConfig
}

export function splitLinkConfig (linkInfo) {
  const topConfig = splitTopConfig(_.get(linkInfo, 'links[0]'))
  const otherConfig = splitInputsConfig(_.get(linkInfo, 'links[0].link-config-values.configs'))
  return _.mapKeys({
    ...topConfig,
    ...otherConfig
  }, (value, key) => _.camelCase(key))
}

export function splitJobConfig (jobInfo) {
  const topConfig = splitTopConfig(_.get(jobInfo, 'jobs[0]'))
  const fromLinkConfig = splitInputsConfig(_.get(jobInfo, 'jobs[0].from-config-values.configs'))
  const toLinkConfig = splitInputsConfig(_.get(jobInfo, 'jobs[0].to-config-values.configs'))
  const driverConfig = splitInputsConfig(_.get(jobInfo, 'jobs[0].driver-config-values.configs'))
  return _.mapKeys({
    top: topConfig,
    driver: driverConfig,
    from: fromLinkConfig,
    to: toLinkConfig
  }, (value, key) => _.camelCase(key))
}
