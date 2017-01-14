/**
 * Created by Chyroc on 17/1/10.
 */

import { Hasoop } from '../src/index'

const config = {
  'userName': 'Developer',
  'host': 'localhost',
  'port': 12000,
  'webapp': 'sqoop'
}
export const sqoopClient = new Hasoop(config)
