'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteLinkAll = undefined;

var deleteLinkAll = exports.deleteLinkAll = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var links, i, linkName;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _get.getLinkAll)();

                    case 2:
                        links = _context.sent;

                        for (i = 0; i < links.length; ++i) {
                            linkName = links[i]['name'];

                            deleteLink(linkName);
                            console.log(linkName);
                        }

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function deleteLinkAll() {
        return _ref.apply(this, arguments);
    };
}();

exports.deleteLink = deleteLink;

var _setOptions = require('./setOptions');

var _get = require('./get');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by Chyroc on 17/1/3.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

var r = require("request-promise");

function deleteLink(linkName) {
    var options = (0, _setOptions.setDeleteLinkOptions)(linkName);
    return r(options).then(function (repos) {
        return repos;
    }).catch(function (err) {});
}
//# sourceMappingURL=delete.js.map