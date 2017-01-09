'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setGetJobOptions = setGetJobOptions;

var _setRequestOptions = require('../utils/setRequestOptions');

var driverUri = 'v1/driver'; /**
                              * Created by Chyroc on 17/1/9.
                              */

function setGetJobOptions() {
    var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';

    if (tag == 'all') {
        return (0, _setRequestOptions.setGetOptions)(tag, driverUri);
    }
}
//# sourceMappingURL=setOptions.js.map