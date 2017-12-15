/* store.js
 *
 *  Herein lives the data store for the DEV283x module 2 assignment
 *  exercise, which is a simple blog. 'store' is an array of posts and
 *  am integer 'highWater' property for assigning ids to posts.
 *
 *  See posts.js and comments.js.
 */

'use strict'

const store = {
    highWater: 0,
    posts: []
}

exports = module.exports = store
