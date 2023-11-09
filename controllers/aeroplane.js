// controllers/costume.js

var Aeroplane = require('../models/aeroplane');


// List all Costumes
exports.aeroplane_list = async function (req, res) {
  try {
    const aeroplane = await Aeroplane.find();
    res.json(aeroplane);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.aeroplane_view_all_Page = async function(req, res) {
    try{
    theAeroplane = await Aeroplane.find();
    res.render('aeroplane', { title: 'Aeroplane Search Results', results: theAeroplane });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };


// List all Costumes



// // List of all Costumes
// exports.costume_list = function(req, res) {
//   res.send('NOT IMPLEMENTED: Costume list');
// };

// For a specific Costume
exports.aeroplane_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: Costume detail: ' + req.params.id);
};

// Handle Costume create on POST
// exports.costume_create_post = function(req, res) {
//   res.send('NOT IMPLEMENTED: Costume create POST');
// };

// Handle Costume create on POST.
exports.aeroplane_create_post = async function (req, res) {
    console.log(req.body);
    const newCostume = new Aeroplane({
      aeroplane_type: req.body.aeroplane_type,
      color: req.body.color,
      no_of_wings: req.body.no_of_wings,
    });
  
    try {
      const result = await newCostume.save();
      res.status(201).json(result); // Return a 201 status code for successful creation
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while creating a aeroplane.' });
    }
  };
  

// Handle Costume delete on DELETE
exports.aeroplane_delete = function(req, res) {
  res.send('NOT IMPLEMENTED: Costume delete DELETE ' + req.params.id);
};

// Handle Costume update on PUT
exports.aeroplane_update_put = function(req, res) {
  res.send('NOT IMPLEMENTED: Costume update PUT ' + req.params.id);
};
