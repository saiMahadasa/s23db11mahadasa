// controllers/api.js

// API for our resources
exports.api = function(req, res) {
    res.json({
      resources: [
        {
          resource: 'aeroplane',
          verbs: ['GET', 'PUT', 'DELETE'],
        },
        // Add more resources here as needed
      ],
    });
  };
  