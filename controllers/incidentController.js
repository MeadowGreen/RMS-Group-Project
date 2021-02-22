var Incident = require('../models/incident');

// Display list of all Authors.
exports.incident_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Author list');
};

// Display detail page for a specific Author.
exports.incident_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Author detail: ' + req.params.id);
};

// Display Author create form on GET.
exports.incident_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author create GET');
};

// Handle Author create on POST.
exports.incident_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author create POST');
};

// Display Author delete form on GET.
exports.incident_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete GET');
};

// Handle Author delete on POST.
exports.incident_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Incident delete POST');
};

// Display Author update form on GET.
exports.incident_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Incident update GET');
};

// Handle Author update on POST.
exports.incident_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Incident update POST');
};