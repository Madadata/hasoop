/**
 * Created by Chyroc on 17/1/4.
 */

import {setCreateOrUpdateJobOptions} from './setOptions'

const r = require('request-promise')

// const fromLinkConf = {
//     'type': 'mysql',
//     'schemaName': 'test',
//     'tableName': 'test',
//     'linkName': 'edf',
// }
// const toLinkConf = {
//     'type': 'hdfs',
//     'putputDir': '/sqoop2/ali',
//     'linkName': 'edf',
// }

export function createJob(jobName, fromLinkConf, toLinkConf) {
    //TODO
    const options = setCreateOrUpdateJobOptions(jobName, fromLinkConf, toLinkConf)
    console.log(options['body']['jobs'])
    return r(options)
        .then(function (repos) {
            return repos
        })
}