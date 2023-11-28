var express = require('express');
const aeroplane_controlers = require('../controllers/aeroplane');
var router = express.Router();

/* GET costumes */
router.get('/', aeroplane_controlers.aeroplane_view_all_Page);
// GET detail costume page
router.get('/detail', aeroplane_controlers.aeroplane_view_one_Page);
/* GET create costume page */
// router.get('/create', aeroplane_controlers.aeroplane_create_Page);

router.get('/create', aeroplane_controlers.aeroplane_create_Page);
const secured = (req, res, next) => {
    if (req.user){
    return next();
    }
    res.redirect("/login");
    }
/* GET update costume page */
// router.get('/update', secured,costume_controlers.costume_update_Page);
router.get('/update',secured, aeroplane_controlers.aeroplane_update_Page);
router.get('/delete', aeroplane_controlers.aeroplane_delete_Page);


module.exports = router;
