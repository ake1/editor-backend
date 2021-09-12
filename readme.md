# editor backend
rest api backed by a mongodb.

## install dependencies
`yarn install`

## build
`yarn build`

## run
`yarn start`

## dev
watch for file changes with nodemon:
`yarn dev`

## routes
* GET `/editor` - list _\_id_ and _title_ of all documents
* GET `/editor/:id` - get full document
* POST `/editor` - create new document
* PUT `/editor` - update document
* DELETE `/editor/:id` - delete document
