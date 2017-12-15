// DEV283X module 2 assignment lab: an express-based blog

const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())

const {getPosts, addPost, updatePost, removePost, getComments, addComment, updateComment, removeComment} = require('./routes/')

// Posts

app.get('/posts', getPosts)
app.get('/posts/:postId', getPosts)
app.post('/posts', addPost)
app.put('/posts/:postId', updatePost)
app.delete('/posts/:postId', removePost)

// Comments

app.get('/posts/:postId/comments', getComments)
app.get('/posts/:postId/comments/:commentId', getComments)
app.post('/posts/:postId/comments', addComment)
app.put('/posts/:postId/comments/:commentId', updateComment)
app.delete('/posts/:postId/comments/:commentId', removeComment)

// Serve

app.listen(3000)
