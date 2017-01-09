/**
 * Created by Chyroc on 17/1/9.
 */

import {setGetOptions} from '../utils/setRequestOptions'

const driverUri = 'v1/driver'

export function setGetJobOptions(tag = 'all') {
    if (tag == 'all') {
        return setGetOptions(tag, driverUri)
    }
}