'use strict';

var express = require('express');
var router = express.Router();

var thing = require('./thing/thing.controller');
// topics ressources

router.get('/api/things', thing.find);
router.get('/api/things/:id', thing.get);
router.post('/api/things', thing.post);
router.put('/api/things/:id', thing.put);

module.exports = router;
