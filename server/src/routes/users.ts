// @ts-nocheck
import express, { type Express }  from 'express';
var router = express.Router();

/* GET users listing. */
export const router: Express = router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});