/**
 * Created by Chyroc on 17/1/5.
 */

import {setGetOptions} from '../utils/setRequestOptions'

export function setGetConnectorOptions(tag = 'all', connectorName = null) {
    if (tag == 'all') {
        return setGetOptions(tag, 'v1/connector')
    } else if (tag == 'subName') {
        return setGetOptions(tag, 'v1/connector', connectorName)
    }
}