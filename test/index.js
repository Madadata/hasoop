/* eslint-env mocha */
import { Hasoop, version } from '../src/index'

const config = {
  'userName': 'Developer',
  'host': 'localhost',
  'port': 12000,
  'webapp': 'sqoop'
}

const sqoopClient = new Hasoop(config)

export {
  sqoopClient,
  version
}
