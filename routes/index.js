'use strict'
const {getPosts, addPost, updatePost, removePost} = require('./posts.js')
const {getComments, addComment, updateComment, removeComment} = require('./comments.js')
exports = module.exports = {getPosts, addPost, updatePost, removePost, getComments, addComment, updateComment, removeComment}
