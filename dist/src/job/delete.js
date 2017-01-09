'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteJobAll = undefined;

var deleteJobAll = exports.deleteJobAll = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var jobs, i, jobName;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _get.getJobAll)();

                    case 2:
                        jobs = _context.sent;

                        for (i = 0; i < jobs.length; ++i) {
                            jobName = jobs[i]['name'];

                            deleteJob(jobName);
                            console.log(jobName);
                        }

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function deleteJobAll() {
        return _ref.apply(this, arguments);
    };
}();

exports.deleteJob = deleteJob;

var _setOptions = require('./setOptions');

var _get = require('./get');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by Chyroc on 17/1/4.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

var r = require('request-promise');

function deleteJob(jobName) {
    var options = (0, _setOptions.setDeleteJobOptions)(jobName);
    return r(options).then(function (repos) {
        return repos;
    }).catch(function (err) {});
}
//# sourceMappingURL=delete.js.map