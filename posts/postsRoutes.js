const express = require('express');

const router = express.Router();

const db = require('../data/db.js');

const apiBase = '/api/posts';

router.post('/', (req, res) => {
  //#region Post Posts Summary
  /*
    When the client makes a `POST` request to ``:

    - If the request body is missing the `title` or `contents` property:

      - cancel the request.
      - respond with HTTP status code `400` (Bad Request).
      - return the following JSON response: `{ errorMessage: "Please provide title and contents for the post." }`.

    - If the information about the _post_ is valid:

      - save the new _post_ the the database.
      - return HTTP status code `201` (Created).
      - return the newly created _post_.

    - If there's an error while saving the _post_:
      - cancel the request.
      - respond with HTTP status code `500` (Server Error).
      - return the following JSON object: `{ error: "There was an error while saving the post to the database" }`.
  */
  //#endregion Post Posts Summary

  console.log(`POST ${apiBase}/ insert():\n`, req);
});

router.post('/:postId/comments', (req, res) => {
  //#region Post Comments Summary
  /*
    When the client makes a `POST` request to `/:id/comments`:

    - If the _post_ with the specified `id` is not found:

      - return HTTP status code `404` (Not Found).
      - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

    - If the request body is missing the `text` property:

      - cancel the request.
      - respond with HTTP status code `400` (Bad Request).
      - return the following JSON response: `{ errorMessage: "Please provide text for the comment." }`.

    - If the information about the _comment_ is valid:

      - save the new _comment_ the the database.
      - return HTTP status code `201` (Created).
      - return the newly created _comment_.

    - If there's an error while saving the _comment_:
      - cancel the request.
      - respond with HTTP status code `500` (Server Error).
      - return the following JSON object: `{ error: "There was an error while saving the comment to the database" }`.
  */
  //#endregion Post Comments Summary

  console.log(`POST ${apiBase}/:postId/comments insertComment():\n`, req);
});

router.get('/', (req, res) => {
  //#region Get Posts Summary
  /*
    When the client makes a `GET` request to ``:

    - If there's an error in retrieving the _posts_ from the database:
      - cancel the request.
      - respond with HTTP status code `500`.
      - return the following JSON object: `{ error: "The posts information could not be retrieved." }`.
  */
  //#endregion Get Posts Summary

  console.log(`GET ${apiBase}/ find():\n`, req);
});

router.get('/:postId', (req, res) => {
  //#region Get Post by ID Summary
  /*
    When the client makes a `GET` request to `/:id`:

    - If the _post_ with the specified `id` is not found:

      - return HTTP status code `404` (Not Found).
      - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

    - If there's an error in retrieving the _post_ from the database:
      - cancel the request.
      - respond with HTTP status code `500`.
      - return the following JSON object: `{ error: "The post information could not be retrieved." }`.
  */
  //#endregion Get Post by ID Summary

  console.log(`GET ${apiBase}/:postId findById():\n`, req);
});

router.get('/:postId/comments', (req, res) => {
  //#region Get Comments by Post ID Summary
  /*
    When the client makes a `GET` request to `/:id/comments`:

    - If the _post_ with the specified `id` is not found:

      - return HTTP status code `404` (Not Found).
      - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

    - If there's an error in retrieving the _comments_ from the database:
      - cancel the request.
      - respond with HTTP status code `500`.
      - return the following JSON object: `{ error: "The comments information could not be retrieved." }`.
  */
  //#endregion Get Comments by Post ID Summary

  console.log(`GET ${apiBase}/:postId/comments findPostComments():\n`, req);
});

router.get('/:postId/comments/:commentId', (req, res) => {
  //#region Get Comment by ID within Post by ID Summary
  /*
    TBD
  */
  //#endregion Get Comment by ID within Post by ID Summary

  console.log(`GET ${apiBase}/:postId/comments/:commentId findCommentById():\n`, req);
});

router.put('/:postId', (req, res) => {
  //#region Update Post by ID Summary
  /*
    When the client makes a `DELETE` request to `/:id`:

    - If the _post_ with the specified `id` is not found:

      - return HTTP status code `404` (Not Found).
      - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

    - If there's an error in removing the _post_ from the database:
      - cancel the request.
      - respond with HTTP status code `500`.
      - return the following JSON object: `{ error: "The post could not be removed" }`.
  */
  //#endregion Update Post by ID Summary

  console.log(`PUT ${apiBase}/:postId update():\n`, req);
});

router.delete('/:postId', (req, res) => {
  //#region Delete Post by ID Summary
  /*
    When the client makes a `PUT` request to `/:id`:

    - If the _post_ with the specified `id` is not found:

      - return HTTP status code `404` (Not Found).
      - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

    - If the request body is missing the `title` or `contents` property:

      - cancel the request.
      - respond with HTTP status code `400` (Bad Request).
      - return the following JSON response: `{ errorMessage: "Please provide title and contents for the post." }`.

    - If there's an error when updating the _post_:

      - cancel the request.
      - respond with HTTP status code `500`.
      - return the following JSON object: `{ error: "The post information could not be modified." }`.

    - If the post is found and the new information is valid:

      - update the post document in the database using the new information sent in the `request body`.
      - return HTTP status code `200` (OK).
      - return the newly updated _post_.
  */
  //#endregion Delete Post by ID Summary

  console.log(`GET ${apiBase}/:postId remove():\n`, req);
});

module.exports = router;