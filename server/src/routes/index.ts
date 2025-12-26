import express from 'express';
var router = express.Router();

/* GET home page. */
export const indexRouter: express.Router = router.get('/', function(req, res, next) {
  res.json({'message': 'index'});
});
