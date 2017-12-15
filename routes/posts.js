/* posts.js
 *
 *  Implements routes for the dEV283x module 2 assignment exercise
 *  endpoints dealing with posts. Posts as we have implemented them
 *  have non-empty 'name' and 'text' properties, an integer 'id', a
 *  'comments' array (which may be and is initially empty), and a
 *  'highWater' for assigning id values to comments.
 */

'use strict'

exports = module.exports = {getPosts, updatePost, addPost, removePost}

const store = require('./store.js')
const rProps = ['name', 'text'] // required properties
const okProps = rProps // accepted properties for user input


/* getPosts()
 *
 *  If a postId parameter is supplied, return the post with that id
 *  value, else all.
 */

function getPosts(req, res) {
    if(req.params.postId) {
	const sought = parseInt(req.params.postId)
	const match = store.posts.find(post => (post.id == sought))
	if(match) {
	    res.send(match)
	} else {
	    res.sendStatus(404)
	}
    } else {
	res.send(store.posts)
    }
} // end getPosts()


/* addPost()
 *
 *  Add a new post (if it meets a smell test).
 */

function addPost(req, res) {
    // Check that required properties are present and non-empty.
    let hasRequired = true;
    rProps.forEach((rProp) => {
	if(! (req.body[rProp] && req.body[rProp].trim())) hasRequired = false;
    })
    if(!hasRequired) return res.sendStatus(400); // missing or empty property
    // add supplied and accepted property values to post object
    const post = {}
    okProps.forEach((okProp) => {
	post[okProp] = req.body[okProp]
    })
    // assign an id to the post
    post.id = ++store.highWater
    // assign a comment counter set to 0
    post.highWater = 0
    // create a comments property
    post.comments = []
    //console.log(obj)
    store.posts.push(post) // store the post
    res.sendStatus(201) // created
    
} // end addPost()


/* updatePost()
 *
 *  Update a post specified by the postId parameter if it passes a smell test.
 */

function updatePost(req, res) {
    const sought = parseInt(req.params.postId)
    const match = store.posts.find(post => (post.id == sought));
    if(!match) return res.sendStatus(404) // not found
    // check that no supplied required property is empty
    let areGood = true;
    rProps.forEach((rProp) => {
	if(req.body.hasOwnProperty(rProp) && ! req.body[rProp].trim()) areGood = false
    })
    // update post with accepted input properties
    okProps.forEach((okProp) => {
	if(req.body.hasOwnProperty(okProp)) match[okProp] = req.body[okProp]
    })
    res.sendStatus(204)
    
} // end updatePost()


/* removePost()
 *
 *  Delete the post specified by the postId parameter if it exists.
 */

function removePost(req, res) {
    const sought = parseInt(req.params.postId)
    const index = store.posts.findIndex(post => (post.id == sought));
    if(index < 0) return res.sendStatus(404) // not found
    store.posts.splice(index, 1)
    res.sendStatus(204) // no content
    
} // end removePost()
