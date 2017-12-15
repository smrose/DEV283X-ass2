#!/bin/bash

# Create a blog post.

curl http://localhost:3000/posts \
     -H 'Content-Type: application/json' \
     -X POST \
     -d '{"name": "I Am a Blog Post", "text": "Blogs are so 2006!"}'

# Fetch the blog post.

curl http://localhost:3000/posts/1

# Add a comment to the post.

curl http://localhost:3000/posts/1/comments \
     -H 'Content-Type: application/json' \
     -X POST \
     -d '{"text": "But I still read them."}'

# Fetch the comment.

curl http://localhost:3000/posts/1/comments/1

# Create a second blog post.

curl http://localhost:3000/posts \
     -H 'Content-Type: application/json' \
     -X POST \
     -d '{"name": "Cannot Stop with the Blogging", "text": "Does not get much bloggier than this.", "doggy": "Should be ignored"}'

# Add comments to that post.

curl http://localhost:3000/posts/2/comments \
     -H 'Content-Type: application/json' \
     -X POST \
     -d '{"text": "I have seen bloggier."}'

curl http://localhost:3000/posts/2/comments \
     -H 'Content-Type: application/json' \
     -X POST \
     -d '{"text": "You do not know from bloggy.", "doggy": "Should be ignored"}'

# Get the comments.

curl http://localhost:3000/posts/2/comments

# Delete the first of those.

curl http://localhost:3000/posts/2/comments/1 \
     -X DELETE

# Get the comments again.

curl http://localhost:3000/posts/2/comments

# Update the first post.

curl http://localhost:3000/posts/1 \
     -H 'Content-Type: application/json' \
     -X PUT \
     -d '{"text": "Blogs are so 2017...", "doggy": "Should be ignored"}'

# Update the first comment on the first post.

curl http://localhost:3000/posts/1/comments/1 \
     -H 'Content-Type: application/json' \
     -X PUT \
     -d '{"text": "I stopped reading them like ten years ago.", "doggy": "Should be ignored"}'

# Fetch the updated post.

curl http://localhost:3000/posts/1

# Check that empty and missing properties are handled. First, on creating
# posts.

curl http://localhost:3000/posts \
     -H 'Content-Type: application/json' \
     -X POST \
     -d '{"name": "I Am Another Blog Post"}'
curl http://localhost:3000/posts \
     -H 'Content-Type: application/json' \
     -X POST \
     -d '{"name": "I Am Another Blog Post", "text": ""}'

# Next, on creating comments.

curl http://localhost:3000/posts/1/comments \
     -H 'Content-Type: application/json' \
     -X POST \
     -d '{"text": ""}'

curl http://localhost:3000/posts/1/comments \
     -H 'Content-Type: application/json' \
     -X POST \
     -d '{}'

# On updating posts.

curl http://localhost:3000/posts/1 \
     -H 'Content-Type: application/json' \
     -X PUT \
     -d '{"text": ""}'
curl http://localhost:3000/posts/1 \
     -H 'Content-Type: application/json' \
     -X PUT \
     -d '{}'

# On updating comments.

curl http://localhost:3000/posts/1/comments/1 \
     -H 'Content-Type: application/json' \
     -X PUT \
     -d '{"text": ""}'
curl http://localhost:3000/posts/1/comments/1 \
     -H 'Content-Type: application/json' \
     -X PUT \
     -d '{}'

# Check that we get 404s when we ask for comments/posts that don't exist.

curl http://localhost:3000/posts/5
curl http://localhost:3000/posts/1/comments/2

# And 404s when we delete what doesn't exist.

curl -X DELETE http://localhost:3000/posts/5
curl -X DELETE http://localhost:3000/posts/5/comments/2
curl -X DELETE http://localhost:3000/posts/1/comments/2

# And 404s when we update what doesn't exist.

curl http://localhost:3000/posts/5 \
     -H 'Content-Type: application/json' \
     -X PUT \
     -d '{"text": "I am illusory"}'

curl http://localhost:3000/posts/5/comments/2 \
     -H 'Content-Type: application/json' \
     -X PUT \
     -d '{"text": "I am illusory"}'

curl http://localhost:3000/posts/1/comments/2 \
     -H 'Content-Type: application/json' \
     -X PUT \
     -d '{"text": "I am illusory"}'

