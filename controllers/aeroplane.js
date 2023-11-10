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
// exports.aeroplane_detail = function(req, res) {
//   res.send('NOT IMPLEMENTED: Costume detail: ' + req.params.id);
// };


exports.aeroplane_detail = async function(req, res) {
  console.log("detail" + req.params.id); // Log the detail and the id parameter from the request.

  try {
      
      const result = await Aeroplane.findById(req.params.id);

      if (result) {
         
          res.send(result);
      } else {
          
          res.status(404).send(`{"error": "Document for id ${req.params.id} not found"}`);
      }
  } catch (error) {
      // If an error occurs during the database query, send a 500 status and an error message.
      res.status(500).send(`{"error": "Internal Server Error"}`);
  }
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
// exports.aeroplane_update_put = function(req, res) {
//   res.send('NOT IMPLEMENTED: Costume update PUT ' + req.params.id);
// };

// Handle Costume update form on PUT.
exports.aeroplane_update_put = async function(req, res) {
  console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);

  try {
      // Retrieve the current state of the object using findById.
      let toUpdate = await Aeroplane.findById(req.params.id);
      if (req.body.aeroplane_type) toUpdate.aeroplane_type = req.body.aeroplane_type;
      if (req.body.cost) toUpdate.color = req.body.color;
      if (req.body.size) toUpdate.no_of_wings = req.body.no_of_wings;

      let result = await toUpdate.save();
      console.log("Success " + result);
      res.send(result);
  } catch (err) {
     
      res.status(500).send(`{"error": "${err}": Update for id ${req.params.id} failed`);
  }
};





