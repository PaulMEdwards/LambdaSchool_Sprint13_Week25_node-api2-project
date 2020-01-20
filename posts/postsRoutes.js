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
      - return the following JSON object: `{ errorMessage: "There was an error while saving the post to the database" }`.
  */
  //#endregion Post Posts Summary

  // console.log(`POST ${apiBase}/ insert():\n`, req);

  if (!req.body.title || !req.body.contents) {
    res.status(400).json({ success: false, errorMessage: "Please provide title and contents for the post." });
  } else {
    db.insert(req.body)
      .then(post => {
        console.log(`POST ${apiBase}/ insert(): \n`, post);
        res.status(201).json({ success: true, post: post });
      })
      .catch(err => {
        res.status(500).json({ success: false, errorMessage: "There was an error while saving the post to the database." });
      });
  }
});

router.post('/:postId/comments', (req, res) => {
  //#region Post Comments Summary
  /*
    When the client makes a `POST` request to `/:id/comments`:

    - If the _post_ with the specified `id` is not found:
      - return HTTP status code `404` (Not Found).
      - return the following JSON object: `{ errorMessage: "The post with the specified ID does not exist." }`.

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
      - return the following JSON object: `{ errorMessage: "There was an error while saving the comment to the database" }`.
  */
  //#endregion Post Comments Summary

  const { postId } = req.params;

  // console.log(`POST ${apiBase}/:postId/comments insertComment(${postId}):\n`, req);

  if (!req.body.text) {
    res.status(400).json({ success: false, errorMessage: "Please provide text for the comment." });
  } else {
    db.findById(postId)
      .then(post => {
        if (post) {
          db.findPostComments(postId)
            .then(comments => {
              req.body.post_id = postId;
              // console.log(`POST ${apiBase}/:postId/comments insertComment(${postId}): \n`, req.body);
              db.insertComment(req.body)
                .then(comment => {
                  console.log(`POST ${apiBase}/:postId/comments insertComment(${postId}): \n`, comment);
                  res.status(201).json({ success: true, comment: comment });
                })
                .catch(err => {
                  res.status(500).json({ success: false, errorMessage: "There was an error while saving the comment to the database." });
                });
            });
        } else {
          res.status(404).json({ success: false, errorMessage: "The post with the specified ID does not exist." });
        }
      });
  }
});

router.get('/', (req, res) => {
  //#region Get Posts Summary
  /*
    When the client makes a `GET` request to ``:

    - If there's an error in retrieving the _posts_ from the database:
      - cancel the request.
      - respond with HTTP status code `500`.
      - return the following JSON object: `{ errorMessage: "The posts information could not be retrieved." }`.
  */
  //#endregion Get Posts Summary

  // console.log(`GET ${apiBase}/ find():\n`, req);

  db.find()
    .then(posts => {
      console.log(`GET ${apiBase}/ find():\n`, posts);
      res.status(200).json({ success: true, posts: posts });
    })
    .catch(err => {
      res.status(500).json({ success: false, errorMessage: "The posts information could not be retrieved."});
    });
});

router.get('/:postId', (req, res) => {
  //#region Get Post by ID Summary
  /*
    When the client makes a `GET` request to `/:id`:

    - If the _post_ with the specified `id` is not found:
      - return HTTP status code `404` (Not Found).
      - return the following JSON object: `{ errorMessage: "The post with the specified ID does not exist." }`.

    - If there's an error in retrieving the _post_ from the database:
      - cancel the request.
      - respond with HTTP status code `500`.
      - return the following JSON object: `{ errorMessage: "The post information could not be retrieved." }`.
  */
  //#endregion Get Post by ID Summary

  const { postId } = req.params;

  // console.log(`GET ${apiBase}/:postId findById(${postId}):\n`, req);

  db.findById(postId)
    .then(post => {
      console.log(`GET ${apiBase}/:postId findById(${postId}): \n`, post);
      if (post) {
        res.status(200).json({ success: true, post });
      } else {
        res.status(404).json({ success: false, errorMessage: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, errorMessage: "The post information could not be retrieved." });
    });
});

router.get('/:postId/comments', (req, res) => {
  //#region Get Comments by Post ID Summary
  /*
    When the client makes a `GET` request to `/:id/comments`:

    - If the _post_ with the specified `id` is not found:
      - return HTTP status code `404` (Not Found).
      - return the following JSON object: `{ errorMessage: "The post with the specified ID does not exist." }`.

    - If there's an error in retrieving the _comments_ from the database:
      - cancel the request.
      - respond with HTTP status code `500`.
      - return the following JSON object: `{ errorMessage: "The comments information could not be retrieved." }`.
  */
  //#endregion Get Comments by Post ID Summary

  const { postId } = req.params;

  // console.log(`GET ${apiBase}/:postId/comments findPostComments(${postId}):\n`, req);

  db.findById(postId)
    .then(post => {
      if (post) {
        db.findPostComments(postId)
        .then(comments => {
          console.log(`GET ${apiBase}/:postId/comments findPostComments(${postId}): \n`, comments);
          if (comments) {
            res.status(200).json({ success: true, comments: comments });
          } else {
            res.status(404).json({ success: false, errorMessage: "The post has no comments." });
          }
        })
        .catch(err => {
          res.status(500).json({ success: false, errorMessage: "The comments information could not be retrieved." });
        });
      } else {
        res.status(404).json({ success: false, errorMessage: "The post with the specified ID does not exist." });
      }
    })
});

router.get('/comments/:commentId', (req, res) => {
  //#region Get Comment by ID Summary
  /*
    When the client makes a `GET` request to `/comments/:id`:

    - If the _comment_ with the specified `id` is not found:
      - return HTTP status code `404` (Not Found).
      - return the following JSON object: `{ errorMessage: "The comment with the specified ID does not exist." }`.

    - If there's an error in retrieving the _comment_ from the database:
      - cancel the request.
      - respond with HTTP status code `500`.
      - return the following JSON object: `{ errorMessage: "The comment information could not be retrieved." }`.
  */
  //#endregion Get Comment by ID Summary

  const { commentId } = req.params;

  // console.log(`GET ${apiBase}/comments/:commentId findCommentById(${commentId}):\n`, req);

  db.findCommentById(commentId)
    .then(comment => {
      console.log(`GET ${apiBase}/comments/:commentId findCommentById(${commentId}): \n`, comment);
      if (comment) {
        res.status(200).json({ success: true, comment: comment });
      } else {
        res.status(404).json({ success: false, errorMessage: "The comment with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, errorMessage: "The comment information could not be retrieved." });
    });
});

router.put('/:postId', (req, res) => {
  //#region Update Post by ID Summary
  /*
    When the client makes a `PUT` request to `/:id`:

    - If the _post_ with the specified `id` is not found:
      - return HTTP status code `404` (Not Found).
      - return the following JSON object: `{ errorMessage: "The post with the specified ID does not exist." }`.

    - If the request body is missing the `title` or `contents` property:
      - cancel the request.
      - respond with HTTP status code `400` (Bad Request).
      - return the following JSON response: `{ errorMessage: "Please provide title and contents for the post." }`.

    - If there's an error when updating the _post_:
      - cancel the request.
      - respond with HTTP status code `500`.
      - return the following JSON object: `{ errorMessage: "The post information could not be modified." }`.

    - If the post is found and the new information is valid:
      - update the post document in the database using the new information sent in the `request body`.
      - return HTTP status code `200` (OK).
      - return the newly updated _post_.
  */
  //#endregion Update Post by ID Summary

  const { postId } = req.params;

  // console.log(`PUT ${apiBase}/:postId update():\n`, req);

  if (!req.body.title || !req.body.contents) {
    res.status(400).json({ success: false, errorMessage: "Please provide title and contents for the post." });
  } else {
    db.findById(postId)
      .then(post => {
        if (post) {
          db.update(postId, req.body)
          .then(postIdUpdated => {
            console.log(`PUT /api/posts/:id update(${postId}): \n`, postIdUpdated);
            if (postIdUpdated) {
              res.status(200).json({ success: true, postIdUpdated: parseInt(postId, 10) });
            }
          })
          .catch(err => {
            res.status(500).json({ success: false, errorMessage: "The post information could not be modified." });
          });
        } else {
          res.status(404).json({ success: false, errorMessage: "The post with the specified ID does not exist." });
        }
      });
  }
});

router.delete('/:postId', (req, res) => {
  //#region Delete Post by ID Summary
  /*
    When the client makes a `DELETE` request to `/:id`:

    - If the _post_ with the specified `id` is not found:
      - return HTTP status code `404` (Not Found).
      - return the following JSON object: `{ errorMessage: "The post with the specified ID does not exist." }`.

    - If there's an error in removing the _post_ from the database:
      - cancel the request.
      - respond with HTTP status code `500`.
      - return the following JSON object: `{ errorMessage: "The post could not be removed" }`.
  */
  //#endregion Delete Post by ID Summary

  console.log(`GET ${apiBase}/:postId remove():\n`, req);
});

module.exports = router;