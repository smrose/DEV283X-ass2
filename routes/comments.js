/* comments.js
 *
 *  Implements routes for the DEV283x module 2 assignment exercise
 *  endpoints dealing with comments.  Comments as we have implemented
 *  them have a non-empty 'text' and an integer id.
 */

'use strict'

exports = module.exports = {getComments, updateComment, addComment, removeComment}

const store = require('./store.js')


/* getComments()
 *
 *  Return all the comments for a post or, if a commentId parameter is
 *  supplied, just the comment with that id.
 */

function getComments(req, res) {
    const pid = parseInt(req.params.postId)
    const pMatch = store.posts.find(post => (post.id == pid))
    if(! pMatch) return res.sendStatus(404) // non-existent post
    if(req.params.commentId) {
	// seeking a specific comment
	const sought = parseInt(req.params.commentId)
	const cMatch = pMatch.comments.find(comment => (comment.id == sought))
	if(cMatch) {
	    res.send(cMatch)
	} else {
	    res.sendStatus(404)
	}
    } else {
	// send all comments for this post
	res.send(pMatch.comments)
    }
} // end getComments()


/* addComment()
 *
 *  Add a comment to the post identified by the postId parameter.
 */

function addComment(req, res) {
    const pid = parseInt(req.params.postId)
    const pMatch = store.posts.find(post => (post.id == pid))
    if(! pMatch) return res.sendStatus(404) // non-existent post
    if(! (req.body.hasOwnProperty('text') && req.body.text.trim())) {
	return res.sendStatus(400) // missing or empty text
    }
    const comment = {
	text: req.body.text.trim(),
	id: ++pMatch.highWater
    }
    pMatch.comments.push(comment)
    res.sendStatus(201)
    
} // end addComment()


/* updateComment()
 *
 *  Update the comment identified by the postId and commentId parameters.
 */

function updateComment(req, res) {
    const pid = parseInt(req.params.postId)
    const pMatch = store.posts.find(post => (post.id == pid))
    if(! pMatch) return res.sendStatus(404) // non-existent post
    const cid = parseInt(req.params.commentId)
    const cMatch = pMatch.comments.find(comment => (comment.id == cid))
    if(! cMatch) return res.sendStatus(404) // non-existent comment
    if(! (req.body.hasOwnProperty('text') && req.body.text.trim())) {
	return res.sendStatus(400) // missing or empty text
    }
    cMatch.text = req.body.text.trim()
    res.sendStatus(204)
    
} // end updateComment()


/* removeComment()
 *
 *  Delete the comment specified by the postId and commentId parameters
 *  if it exists.
 */

function removeComment(req, res) {
    const pid = parseInt(req.params.postId)
    const pMatch = store.posts.find(post => (post.id == pid))
    if(! pMatch) return res.sendStatus(404) // non-existent post
    const sought = parseInt(req.params.commentId)
    const index = pMatch.comments.findIndex(comment => (comment.id == sought))
    if(index < 0) return res.sendStatus(404)
    pMatch.comments.splice(index, 1)
    res.sendStatus(204) // no comment
    
} // end removeComment()
