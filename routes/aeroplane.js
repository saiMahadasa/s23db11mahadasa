var express = require('express');
const aeroplane_controlers = require('../controllers/aeroplane');
var router = express.Router();

/* GET costumes */
router.get('/', aeroplane_controlers.aeroplane_view_all_Page);
// GET detail costume page
router.get('/detail', aeroplane_controlers.aeroplane_view_one_Page);



module.exports = router;
