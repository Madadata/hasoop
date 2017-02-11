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
