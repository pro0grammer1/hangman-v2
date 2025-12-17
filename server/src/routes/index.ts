// @ts-nocheck
import express, { type Express } from 'express';
var router = express.Router();

/* GET home page. */
export const router: Express = router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
