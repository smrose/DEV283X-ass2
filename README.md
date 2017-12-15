# DEV283x Module 2 Assignment Exercise: A Toy Blog

For EDX DEV283x, "Introduction to NodeJS," students are asked to
create a sort of toy blog using the Express framework. This is my
submission.

## Dependencies

Besides express, I use body-parser, errorhandler, and morgan. I use
node-dev to run the server.

## Files

The main program is `server.js`. Routes are in `./routes/` - `index.js`,
`posts.js`, and `comments.js`. Tests - which use curl(1) - are in `test.sh`.

## Object Schema

Rather than storing a `url` property in each post, I assign each a
persistent id, as I do each comment. That allows deletions to occur
without changing the URL path to any element.

## Author

S. Morris Rose, @sm_rose, Github: smrose

## License

None.