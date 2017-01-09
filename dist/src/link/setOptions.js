'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setCreateLinkOptions = setCreateLinkOptions;
exports.setDeleteLinkOptions = setDeleteLinkOptions;
exports.setGetLinkOptions = setGetLinkOptions;
exports.setUpdateOptions = setUpdateOptions;

var _setRequestOptions = require('../utils/setRequestOptions');

var linkUri = 'v1/link'; /**
                          * Created by Chyroc on 17/1/3.
                          */

function setCreateLinkOptions(linkName, param) {
    var body = {};
    if (param['DatabaseType'] == 'mysql') {
        var uri = encodeURIComponent('jdbc:mysql://' + param['connectionHost'] + ':' + param['connectionPort']);
        body['links'] = [{
            "id": -1,
            "name": linkName,
            "connector-name": "generic-jdbc-connector",
            "enabled": true,
            "creation-date": Date.now(),
            "creation-user": null,
            "update-user": null,
            "update-date": Date.now(),

            "link-config-values": {
                "configs": [{
                    "validators": [],
                    "inputs": [{
                        "size": 128,
                        "editable": "ANY",
                        "validators": [],
                        "name": "linkConfig.jdbcDriver",
                        "id": 67,
                        "sensitive": false,
                        "overrides": "",
                        "type": "STRING",
                        "value": "com.mysql.jdbc.Driver"
                    }, {
                        "size": 2000,
                        "editable": "ANY",
                        "validators": [],
                        "name": "linkConfig.connectionString",
                        "id": 68,
                        "sensitive": false,
                        "overrides": "",
                        "type": "STRING",
                        "value": uri
                    }, {
                        "size": 40,
                        "editable": "ANY",
                        "validators": [],
                        "name": "linkConfig.username",
                        "id": 69,
                        "sensitive": false,
                        "overrides": "",
                        "type": "STRING",
                        "value": param['username']
                    }, {
                        "size": 40,
                        "editable": "ANY",
                        "validators": [],
                        "name": "linkConfig.password",
                        "id": 70,
                        "sensitive": true,
                        "overrides": "",
                        "type": "STRING",
                        "value": param['password']
                    }, {
                        "editable": "ANY",
                        "validators": [],
                        "name": "linkConfig.fetchSize",
                        "id": 71,
                        "sensitive": false,
                        "overrides": "",
                        "type": "INTEGER"
                    }, {
                        "editable": "ANY",
                        "validators": [],
                        "name": "linkConfig.jdbcProperties",
                        "id": 72,
                        "sensitive": false,
                        "overrides": "",
                        "type": "MAP",
                        "sensitive-pattern": ""
                    }],
                    "name": "linkConfig",
                    "id": 17,
                    "type": "LINK"
                }, {
                    "validators": [],
                    "inputs": [{
                        "size": 5,
                        "editable": "ANY",
                        "validators": [],
                        "name": "dialect.identifierEnclose",
                        "id": 73,
                        "sensitive": false,
                        "overrides": "",
                        "type": "STRING",
                        "value": encodeURIComponent(param['identifierEnclose'])
                    }],
                    "name": "dialect",
                    "id": 18,
                    "type": "LINK"
                }],
                "validators": []
            }

        }];
    } else if (param['type'] == 'hdfs') {
        //TODO
        // param['uri'] = 's3a://sqoop2/'
        // param['s3'] = {}
        // param['s3']['access'] = 'AKIAOISG3IRVOIUP2PNA'
        // param['s3']['secret'] = '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'
        // param['s3']['region'] = 's3.cn-north-1.amazonaws.com.cn'
        body['links'] = [{
            "id": -1,
            "name": linkName,
            "creation-user": null,
            "creation-date": Date.now(),
            "connector-name": "hdfs-connector",
            "update-date": Date.now(),
            "enabled": true,
            "update-user": null,
            "link-config-values": {
                "configs": [{
                    "validators": [],
                    "inputs": [{
                        "size": 255,
                        "editable": "ANY",
                        "validators": [],
                        "name": "linkConfig.uri",
                        "id": 52,
                        "sensitive": false,
                        "overrides": "",
                        "type": "STRING",
                        "value": encodeURIComponent('s3a://sqoop2/')
                    }, {
                        "size": 255,
                        "editable": "ANY",
                        "validators": [],
                        "name": "linkConfig.confDir",
                        "id": 53,
                        "sensitive": false,
                        "overrides": "",
                        "type": "STRING"
                    }, {
                        "editable": "ANY",
                        "validators": [],
                        "name": "linkConfig.configOverrides",
                        "id": 54,
                        "sensitive": false,
                        "overrides": "",
                        "type": "MAP",
                        "value": {
                            "fs.s3a.access.key": "AKIAOISG3IRVOIUP2PNA",
                            "fs.s3a.impl": "org.apache.hadoop.fs.s3a.S3AFileSystem",
                            "fs.s3a.secret.key": "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",
                            "fs.s3a.endpoint": "s3.cn-north-1.amazonaws.com.cn"
                        },
                        "sensitive-pattern": ""
                    }],
                    "name": "linkConfig",
                    "id": 13,
                    "type": "LINK"
                }],
                "validators": []
            }
        }];
    } else {
        throw Error('only can deal mysql or hdfs');
    }
    return (0, _setRequestOptions.setPostOptions)(linkUri, body);
}

function setDeleteLinkOptions(linkName) {
    return (0, _setRequestOptions.setDeleteOptions)(linkName, linkUri);
}

function setGetLinkOptions() {
    var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';
    var linkOrConnectorName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (tag == 'all') {
        return (0, _setRequestOptions.setGetOptions)(tag, linkUri);
    } else if (tag == 'subName') {
        return (0, _setRequestOptions.setGetOptions)(tag, linkUri, linkOrConnectorName);
    } else if (tag == 'cname') {
        return (0, _setRequestOptions.setGetOptions)('cname', linkUri, linkOrConnectorName);
    }
}

function setUpdateOptions(tag, linkName) {
    if (tag == 'enable' || tag == 'disable') {
        return (0, _setRequestOptions.setPutOptions)('enable', linkUri, linkName);
    }
}
//# sourceMappingURL=setOptions.js.map