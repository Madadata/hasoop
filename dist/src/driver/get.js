'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getDriverAll = getDriverAll;

var _setOptions = require('./setOptions');

var r = require('request-promise'); /**
                                     * Created by Chyroc on 17/1/5.
                                     */

function getDriverAll() {
    var options = (0, _setOptions.setGetJobOptions)('all');
    return r(options).then(function (repos) {
        return repos['links'];
    }).catch(function (err) {});
}
//# sourceMappingURL=get.js.map