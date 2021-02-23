var Incident = require('../models/incident');

// Display list of all Incident .
exports.index = function(req, res) {
    res.render('index', { title: 'Records Management System', error: err, data: results});
};