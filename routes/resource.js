// routes/resource.js

var express = require('express');
var router = express.Router();

// Require controller modules.
var api_controller = require('../controllers/api');
var aeroplane_controller = require('../controllers/aeroplane');


// API ROUTE
router.get('/', api_controller.api);

// COSTUME ROUTES
router.post('/aeroplane', aeroplane_controller.aeroplane_create_post);
router.delete('/aeroplane/:id', aeroplane_controller.aeroplane_delete);
router.put('/aeroplane/:id', aeroplane_controller.aeroplane_update_put);
// router.get('/aeroplane/:id', aeroplane_controller.aeroplane_detail);
 router.get('/aeroplane', aeroplane_controller.aeroplane_list);
//  router.post('/costumes', costume_controllers.costume_create_post);
router.post('/aeroplane', aeroplane_controller.aeroplane_create);


module.exports = router;
