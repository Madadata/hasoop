/**
 * Created by Chyroc on 17/1/3.
 */

import {setDeleteLinkOptions} from './setOptions'
import {getLinkAll} from './get'

const r = require('request-promise')

export function deleteLink (linkName) {
  const options = setDeleteLinkOptions(linkName)
  return r(options)
        .then(function (repos) {
          return repos
        })
        .catch(function (err) {
        })
}

export async function deleteLinkAll () {
  const links = await getLinkAll()
  for (let i = 0; i < links.length; ++i) {
    const linkName = links[i]['name']
    deleteLink(linkName)
    console.log(linkName)
  }
}
