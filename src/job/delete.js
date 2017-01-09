/**
 * Created by Chyroc on 17/1/4.
 */

import {setDeleteJobOptions} from './setOptions'
import {getJobAll} from './get'

const r = require('request-promise')

export function deleteJob (jobName) {
  const options = setDeleteJobOptions(jobName)
  return r(options)
        .then(function (repos) {
          return repos
        })
        .catch(function (err) {
        })
}

export async function deleteJobAll () {
  const jobs = await getJobAll()
  for (let i = 0; i < jobs.length; ++i) {
    const jobName = jobs[i]['name']
    deleteJob(jobName)
    console.log(jobName)
  }
}
