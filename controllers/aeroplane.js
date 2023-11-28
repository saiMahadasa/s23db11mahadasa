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

// exports.aeroplane_create_Page = function(req, res) {
//   console.log("create view")
//   try{
//   res.render('aeroplanecreate', { title: 'Aeroplanes Create'});
//   }
//   catch(err){
//   res.status(500)
//   res.send(`{'error': '${err}'}`);
//   }
//   };

exports.aeroplane_create_Page = function (req, res) {
  console.log("create view");
  res.render('aeroplanecreate', { title: 'Aeroplanes Create' });
};

exports.aeroplane_create = async function (req, res) {
  try {
    const { aeroplane_type, color, number_of_wings } = req.body;

    // Create a new Aeroplane document
    const aeroplane = new Aeroplane({
      aeroplane_type,
      color,
      number_of_wings,
    });

    // Save the document to the database
    await aeroplane.save();

    res.status(201).json(aeroplane); // Respond with the created Aeroplane document
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



  exports.aeroplane_update_Page = async function(req, res) {
    console.log("update view for item " + req.query.id);
    try {
        let result = await Aeroplane.findById(req.query.id);
        
        if (req.body.aeroplane_type) result.aeroplane_type = req.body.aeroplane_type;
        if (req.body.color) result.color = req.body.color;
        if (req.body.number_of_wings) result.number_of_wings = req.body.number_of_wings;

        // Save the updated aeroplane data
        let updatedAeroplane = await result.save();
        console.log("Update success: ", updatedAeroplane);
        res.render('aeroplaneupdate', { title: 'Aeroplane Update', toShow: updatedAeroplane });
    } catch (err) {
        res.status(500).send(`{'error': '${err}'}`);
    }
};
  

// Handle a show one view with id specified by query
exports.aeroplane_view_one_Page = async function(req, res) {
 
  try{
  const result = await Aeroplane.findById(req.query.id)
  res.render('aeroplanedetail',
  { title: 'Aeroplane Detail', toShow: result });

  }
  
  catch(err){
  res.status(500)
  res.send(`{'error': '${err}'}`);
  }
  };


exports.aeroplane_view_all_Page = async function(req, res) {
    try{
    theAeroplane = await Aeroplane.find();
    console.log(theAeroplane)
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
      number_of_wings: req.body.number_of_wings,
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
exports.aeroplane_delete = async function(req, res) {
  try {
    const deletedAeroplane = await Aeroplane.findByIdAndDelete(req.params.id);
    console.log("Delete" , req.params.id)
    if (!deletedAeroplane ) {
      // If no matching document found
      res.status(404).json({ error: 'Aeroplane not found' });
    } else {
      res.json({ message: 'Aeroplane deleted successfully', deletedAeroplane });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while deleting the aeroplane.' });
  }
};

exports.aeroplane_delete_Page = async function(req, res) {
  console.log("Delete view for id " + req.query.id)
  try{
  result = await Aeroplane.findById(req.query.id)
  res.render('aeroplanedelete', { title: 'Aeroplane Delete', toShow:
 result });
  }
  catch(err){
  res.status(500)
  res.send(`{'error': '${err}'}`);
  }
 };

// Handle Costume update on PUT
// exports.aeroplane_update_put = function(req, res) {
//   res.send('NOT IMPLEMENTED: Costume update PUT ' + req.params.id);
// };

// Handle Costume update form on PUT.
// exports.aeroplane_update_put = async function(req, res) {
//   console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);

//   try {
//       // Retrieve the current state of the object using findById.
//       let toUpdate = await Aeroplane.findById(req.params.id);
//       if (req.body.aeroplane_type) toUpdate.aeroplane_type = req.body.aeroplane_type;
//       if (req.body.cost) toUpdate.color = req.body.color;
//       if (req.body.size) toUpdate.no_of_wings = req.body.no_of_wings;

//       let result = await toUpdate.save();
//       console.log("Success " + result);
//       res.send(result);
//   } catch (err) {
     
//       res.status(500).send(`{"error": "${err}": Update for id ${req.params.id} failed`);
//   }
// };

// exports.aeroplane_update_put = async function (req, res) {
//   console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);

//   try {
//     // Retrieve the current state of the object using findById.
//     let toUpdate = await Aeroplane.findById(req.params.id);
//     if (!toUpdate) {
//       return res.status(404).send(`Aeroplane with ID ${req.params.id} not found`);
//     }

//     if (req.body.aeroplane_type) toUpdate.aeroplane_type = req.body.aeroplane_type;
//     if (req.body.color) toUpdate.color = req.body.color;
//     if (req.body.no_of_wings) toUpdate.no_of_wings = req.body.no_of_wings;

//     let result = await toUpdate.save();
//     console.log("Success " + result);
//     res.send(result);
//   } catch (err) {
//     res.status(500).send(`{"error": "${err}": Update for id ${req.params.id} failed`);
//   }
// };

// Handle updating an aeroplane.
exports.aeroplane_update_put = async function(req, res) {
  console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);

  try {
    // Retrieve the current state of the object using findById.
    let toUpdate = await Aeroplane.findById(req.params.id);
    if (!toUpdate) {
      return res.status(404).json({ error: `Aeroplane with ID ${req.params.id} not found` });
    }

    // Update aeroplane data based on the form submission
    if (req.body.aeroplane_type) toUpdate.aeroplane_type = req.body.aeroplane_type;
    if (req.body.color) toUpdate.color = req.body.color;
    if (req.body.number_of_wings) toUpdate.number_of_wings = req.body.number_of_wings;

    // Save the updated aeroplane data
    let updatedAeroplane = await toUpdate.save();
    console.log("Update success: ", updatedAeroplane);

    // Respond with the updated aeroplane data in JSON format
    res.json(updatedAeroplane);
  } catch (err) {
    res.status(500).json({ error: `Update for id ${req.params.id} failed: ${err}` });
  }
};






