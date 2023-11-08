// controllers/costume.js

var Costume = require('../models/costume');


// List all Costumes
exports.costume_list = async function (req, res) {
  try {
    const costumes = await Costume.find();
    res.json(costumes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


// List all Costumes



// // List of all Costumes
// exports.costume_list = function(req, res) {
//   res.send('NOT IMPLEMENTED: Costume list');
// };

// For a specific Costume
exports.costume_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: Costume detail: ' + req.params.id);
};

// Handle Costume create on POST
exports.costume_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Costume create POST');
};

// Handle Costume delete on DELETE
exports.costume_delete = function(req, res) {
  res.send('NOT IMPLEMENTED: Costume delete DELETE ' + req.params.id);
};

// Handle Costume update on PUT
exports.costume_update_put = function(req, res) {
  res.send('NOT IMPLEMENTED: Costume update PUT ' + req.params.id);
};
