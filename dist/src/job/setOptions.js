'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setGetJobOptions = setGetJobOptions;
exports.setCreateOrUpdateJobOptions = setCreateOrUpdateJobOptions;
exports.setDeleteJobOptions = setDeleteJobOptions;
exports.setUpdateJobOptions = setUpdateJobOptions;

var _setRequestOptions = require('../utils/setRequestOptions');

var _setTemplate = require('./setTemplate');

/**
 * Created by Chyroc on 17/1/4.
 */

var jobUri = 'v1/job';

function setGetJobOptions(tag) {
    var jobOrConnectorName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;


    if (tag == 'all') {
        return (0, _setRequestOptions.setGetOptions)(tag, jobUri);
    } else if (tag == 'jobName') {
        return (0, _setRequestOptions.setGetOptions)(tag, jobUri, jobOrConnectorName);
    } else if (tag == 'cname') {
        return (0, _setRequestOptions.setGetOptions)('cname', jobUri, jobOrConnectorName);
    }
}

function setCreateOrUpdateJobOptions(jobName, fromLinkConf, toLinkConf) {
    //TODO
    //from
    var fromConfigValues = void 0;
    if (fromLinkConf['type'] == 'mysql') {
        fromConfigValues = (0, _setTemplate.setMysqlConfig)(fromLinkConf);
        fromLinkConf['connectorName'] = 'generic-jdbc-connector';
    } else if (fromLinkConf['type'] == 'hdfs') {
        fromConfigValues = (0, _setTemplate.setHdfsConfig)(fromLinkConf);
        fromLinkConf['connectorName'] = 'hdfs-connector';
    } else {
        throw Error();
    }

    //to
    var toConfigValues = void 0;
    if (toLinkConf['type'] == 'mysql') {
        toConfigValues = (0, _setTemplate.setMysqlConfig)(toLinkConf);
        toLinkConf['connectorName'] = 'generic-jdbc-connector';
    } else if (toLinkConf['type'] == 'hdfs') {
        toConfigValues = (0, _setTemplate.setHdfsConfig)(toLinkConf);
        toLinkConf['connectorName'] = 'hdfs-connector';
    } else {
        throw Error();
    }

    var body = {
        "jobs": [{
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
                "configs": [{
                    "validators": [],
                    "inputs": [{
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
                    }],
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
                    }],
                    "name": "jarConfig",
                    "id": 23,
                    "type": "JOB"
                }],
                "validators": []
            }
        }]
    };
    return (0, _setRequestOptions.setPostOptions)('v1/job', body);
}

function setDeleteJobOptions(jobName) {
    return (0, _setRequestOptions.setDeleteOptions)(jobName, jobUri);
}

function setUpdateJobOptions(tag, jobName) {
    if (tag == 'enable' || tag == 'disable') {
        return (0, _setRequestOptions.setPutOptions)('enable', jobUri, jobName);
    }
}
//# sourceMappingURL=setOptions.js.map