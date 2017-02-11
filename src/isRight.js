import keymirror from 'keymirror'

export const hasoopMethodTypes = keymirror({
  // version
  getVersion: null,
  // driver
  getDriver: null,
  // connector
  getConnectorAll: null,
  getConnectorByConnectorName: null,
  // link
  getLinkAll: null,
  getLinkByConnectorName: null,
  getLinkByLinkName: null,
  createLink: null,
  updateLinkConfig: null,
  updateLinkEnable: null,
  updateLinkDisable: null,
  deleteLink: null,
  deleteLinkAll: null,
  // job
  getJobAll: null,
  getJobByJobName: null,
  getJobByConnectorName: null,
  createJob: null,
  updateJobConfig: null,
  updateJobEnable: null,
  updateJobDisable: null,
  deleteJob: null,
  deleteJobAll: null,
  // submission
  startJob: null,
  stopJob: null,
  jobStatus: null,
  getSubmissionAll: null,
  getSubmissionByJobNam: null
})

const isRightFromHeaders = res => res.headers.get('sqoop-error-code') === '1000' && res.headers.get('sqoop-error-message') === 'OK'

const getRequestHeaders = res => [{
  sqoopErrorCode: res.headers.get('sqoop-error-code'),
  sqoopErrorMessage: res.headers.get('sqoop-error-message'),
  sqoopInternalErrorCode: res.headers.get('sqoop-internal-error-code') || null,
  sqoopInternalErrorMessage: res.headers.get('sqoop-internal-error-message') || null
}]

export async function isHasoopRequestRight (methodName, res) {
  if (!Object.keys(hasoopMethodTypes).includes(methodName)) {
    throw new Error(`hasoop method ${methodName} is not supported`)
  }

  const responseJson = await res.json()
  const requestHeaders = getRequestHeaders(res)

  if (!isRightFromHeaders(res)) {
    return {isRight: false, data: responseJson, headers: requestHeaders}
  }
}
