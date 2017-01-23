/* eslint-env mocha */

import { sqoopClient } from './index'

// all TODO

suite('authorization', () => {
  /**
   /v1/authorization/roles/create - [POST] - Create Role
   /v1/authorization/role/[role-name] - [DELETE] - Delete Role
   /v1/authorization/roles?principal_type=[principal-type]&principal_name=[principal-name] - [GET] Get all Roles by Principal
   /v1/authorization/principals?role_name=[rname] - [GET] Get all Principals by Role

   /v1/authorization/roles/grant - [PUT] - Grant a Role to a Principal
   /v1/authorization/roles/revoke - [PUT] - Revoke a Role from a Principal
   /v1/authorization/privileges/grant - [PUT] - Grant a Privilege to a Principal
   /v1/authorization/privileges/revoke - [PUT] - Revoke a Privilege to a Principal

   /v1/authorization/privilieges?principal_type=[principal-type]&principal_name=[principal-name]&resource_type=[resource-type]&resource_name=[resource-name] - [GET] Get all Roles by Principal (and Resource)
   */

  test.skip('createRole', () => {
    sqoopClient.createRole()
  })

  test.skip('getRoleAll', () => {
    sqoopClient.getRoleAll()
  })

  test.skip('deleteRole', () => {
    sqoopClient.deleteRole()
  })

  test.skip('getRoleByPrincipal', () => {
    sqoopClient.getRoleByPrincipal()
  })

  test.skip('getPrincipalByRole', () => {
    sqoopClient.getPrincipalByRole()
  })
})
