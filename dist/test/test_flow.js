'use strict';

var _get = require('../src/link/get');

var _delete = require('../src/link/delete');

var _create = require('../src/link/create');

var _delete2 = require('../src/job/delete');

var _create2 = require('../src/job/create');

var _status = require('../src/submission/status');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by Chyroc on 17/1/4.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

function create_link_aliyun_mysql() {
    var param = {
        'type': 'mysql',
        'host': '115.28.245.5',
        'port': '3306',
        'username': 'root',
        'password': '1234'
    };
    (0, _create.createLink)('aliyun_mysql', param);
}

function create_link_ec_hdfs() {
    var param = {
        'type': 'hdfs'
    };
    (0, _create.createLink)('s3_hdfs', param);
}

function create_job_ali_s3() {
    var fromLinkConf = {
        'type': 'mysql',
        'linkName': 'aliyun_mysql',
        'schemaName': 'litternuaa',
        'tableName': 'liaa_user',
        'partitionColumn': 'uid'
    };
    var toLinkConf = {
        'type': 'hdfs',
        'putputDir': 's3://sqoop2/same/',
        'linkName': 's3_hdfs'
    };
    (0, _create2.createJob)('ali_s3', fromLinkConf, toLinkConf);
}

_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    // await deleteLinkAll()
                    // await deleteJobAll()


                    // create_link_aliyun_mysql()
                    // create_link_ec_hdfs()
                    create_job_ali_s3();
                    // startJob('ali_s3')
                    // getJobStatus('job3')

                case 1:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this);
}))();
//# sourceMappingURL=test_flow.js.map