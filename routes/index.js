/**
 * @swagger
 * tags:
 *  name: HealthCheck
 *  description: See if the server is up and running.
*/

/**
 * @swagger
 * /:
 *   get:
 *     tags: [HealthCheck]
 *     description: health check
 *     responses:
 *       200:
 *        description: the server is healthy
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 *              example: healthy
 */
const express = require('express');
const router = express.Router();

const handlerFunc = function(req, res, next) {
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
  res.header("Content-Type", "text/plain")
  res.status(200)
  res.send("healthy")
}

module.exports.handlerFunc = handlerFunc
module.exports.router = router.get('/', handlerFunc);
module.exports.route = "/"