'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setGetConnectorOptions = setGetConnectorOptions;

var _setRequestOptions = require('../utils/setRequestOptions');

function setGetConnectorOptions() {
    var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';
    var connectorName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (tag == 'all') {
        return (0, _setRequestOptions.setGetOptions)(tag, 'v1/connector');
    } else if (tag == 'subName') {
        return (0, _setRequestOptions.setGetOptions)(tag, 'v1/connector', connectorName);
    }
} /**
   * Created by Chyroc on 17/1/5.
   */
//# sourceMappingURL=setOptions.js.map