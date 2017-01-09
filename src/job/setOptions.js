/**
 * Created by Chyroc on 17/1/4.
 */

import {setGetOptions, setPostOptions, setPutOptions, setDeleteOptions} from '../utils/setRequestOptions'
import {setMysqlConfig, setHdfsConfig} from './setTemplate'

const jobUri = 'v1/job'

export function setGetJobOptions(tag, jobOrConnectorName = null) {

    if (tag == 'all') {
        return setGetOptions(tag, jobUri)
    } else if (tag == 'jobName') {
        return setGetOptions(tag, jobUri, jobOrConnectorName)
    } else if (tag == 'cname') {
        return setGetOptions('cname', jobUri, jobOrConnectorName)
    }

}

export function setCreateOrUpdateJobOptions(jobName, fromLinkConf, toLinkConf) {
    //TODO
    //from
    let fromConfigValues
    if (fromLinkConf['type'] == 'mysql') {
        fromConfigValues = setMysqlConfig(fromLinkConf)
        fromLinkConf['connectorName'] = 'generic-jdbc-connector'
    } else if (fromLinkConf['type'] == 'hdfs') {
        fromConfigValues = setHdfsConfig(fromLinkConf)
        fromLinkConf['connectorName'] = 'hdfs-connector'
    } else {
        throw Error()
    }


    //to
    let toConfigValues
    if (toLinkConf['type'] == 'mysql') {
        toConfigValues = setMysqlConfig(toLinkConf)
        toLinkConf['connectorName'] = 'generic-jdbc-connector'
    } else if (toLinkConf['type'] == 'hdfs') {
        toConfigValues = setHdfsConfig(toLinkConf)
        toLinkConf['connectorName'] = 'hdfs-connector'
    } else {
        throw Error()
    }

    const body =
        {
            "jobs": [
                {
                    "creation-user": null,
                    "name": jobName,
                    "creation-date": Date.now(),
                    "id": -1,
                    "update-date": Date.now(),
                    "update-user": null,
                    "to-config-values": toConfigValues,
                    "from-config-values": fromConfigValues,
                    "to-connector-name": toLinkConf['connectorName'],
                    "from-link-name": fromLinkConf['linkName'],
                    "enabled": true,
                    "from-connector-name": fromLinkConf['connectorName'],
                    "to-link-name": toLinkConf['linkName'],
                    "driver-config-values": {
                        "configs": [
                            {
                                "validators": [],
                                "inputs": [
                                    {
                                        "editable": "ANY",
                                        "validators": [],
                                        "name": "throttlingConfig.numExtractors",
                                        "id": 88,
                                        "sensitive": false,
                                        "overrides": "",
                                        "type": "INTEGER",
                                        "value": "1"
                                    }, {
                                        "editable": "ANY",
                                        "validators": [],
                                        "name": "throttlingConfig.numLoaders",
                                        "id": 89,
                                        "sensitive": false,
                                        "overrides": "",
                                        "type": "INTEGER",
                                        "value": "1"
                                    }
                                ],
                                "name": "throttlingConfig",
                                "id": 22,
                                "type": "JOB"
                            }, {
                                "validators": [],
                                "inputs": [{
                                    "editable": "ANY",
                                    "validators": [],
                                    "name": "jarConfig.extraJars",
                                    "id": 90,
                                    "sensitive": false,
                                    "overrides": "",
                                    "type": "LIST"
                                }
                                ],
                                "name": "jarConfig",
                                "id": 23,
                                "type": "JOB"
                            }
                        ],
                        "validators": []
                    }
                }
            ]
        }
    return setPostOptions('v1/job', body)
}

export function setDeleteJobOptions(jobName) {
    return setDeleteOptions(jobName, jobUri)
}

export function setUpdateJobOptions(tag, jobName) {
    if (tag == 'enable' || tag == 'disable') {
        return setPutOptions('enable', jobUri, jobName)
    }
}