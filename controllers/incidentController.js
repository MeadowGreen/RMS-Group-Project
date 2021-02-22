var Incident = require('../models/incident');

// Display list of all Incident .
exports.incident_list = function(req, res) {
    Incident.find()
        .sort([['incident_name', 'ascending']])
        .exec(function (err, list_incidents) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('incident_list', { title: 'Incident List', incident_list: list_incidents });
        });
};

// Display detail page for a specific Incident.
exports.incident_detail = function(req, res) {
    async.parallel({
        incident: function (callback) {
            Incident.findById(req.params.id)
                .exec(callback)
        },
        authors_books: function (callback) {
            Book.find({ 'author': req.params.id }, 'title summary')
                .exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.incident == null) { // No results.
            var err = new Error('Incident not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('incident_detail', { title: 'Incident Detail', incident: results.incident, author_books: results.authors_books });
    });
};

// Display Incident create form on GET.
exports.incident_create_get = function(req, res, next) {
    res.render('incident_form', { title: 'Create Incident'});
};

// Handle Incident create on POST.
exports.incident_create_post = [
    // Validate and sanitize fields.
    body('first_name').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('family_name').trim().isLength({ min: 1 }).escape().withMessage('Family name must be specified.')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601().toDate(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);
        
        // Create Author object with escaped and trimmed data
        var incident = new Incident(
            {
                first_name: req.body.first_name,
                family_name: req.body.family_name,
                date_of_birth: req.body.date_of_birth,
                date_of_death: req.body.date_of_death,
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('author_form', { title: 'Create Incident', incident: incident, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Save incident.
            incident.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new incident record.
                res.redirect(author.url);
            });
        }
    }
];

// Display Incident delete form on GET.
exports.incident_delete_get = function(req, res) {
    async.parallel({
        incident: function (callback) {
            Incident.findById(req.params.id).exec(callback)
        },
        authors_books: function (callback) {
            Book.find({ 'incident': req.params.id }).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.incident == null) { // No results.
            res.redirect('/catalog/authors');
        }
        // Successful, so render.
        res.render('incident_delete', { title: 'Delete Incident', incident: results.incident, author_books: results.authors_books });
    });
};

// Handle Incident delete on POST.
exports.incident_delete_post = function(req, res) {
    async.parallel({
        incident: function (callback) {
            incident.findById(req.body.incidentid).exec(callback)
        },
        authors_books: function (callback) {
            Book.find({ 'author': req.body.incidentid }).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        // Success.
        if (results.authors_books.length > 0) {
            // Incident is found. Render in same way as for GET route.
            res.render('incident_delete', { title: 'Delete Incident', incident: results.incident, author_books: results.authors_books });
            return;
        }
        else {
            // Author has no books. Delete object and redirect to the list of authors.
            Incident.findByIdAndRemove(req.body.incidentid, function deleteIncident(err) {
                if (err) { return next(err); }
                // Success - go to incident list.
                res.redirect('/catalog/authors')
            })

        }
    });
};

// Display Incident update form on GET.
exports.incident_update_get = function(req, res) {
    Incident.findById(req.params.id, function (err, incident) {
        if (err) { return next(err); }
        if (incident == null) { // No results.
            var err = new Error('Incident not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('incident_form', { title: 'Update Incident', incident: incident });

    });
};

// Handle Incident update on POST.
exports.incident_update_post = [

    // Validate and santize fields.
    body('first_name').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('family_name').trim().isLength({ min: 1 }).escape().withMessage('Family name must be specified.')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601().toDate(),


    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create Author object with escaped and trimmed data (and the old id!)
        var incident = new Incident(
            {
                first_name: req.body.first_name,
                family_name: req.body.family_name,
                date_of_birth: req.body.date_of_birth,
                date_of_death: req.body.date_of_death,
                _id: req.params.id
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('incident_form', { title: 'Update Incident', incident: incident, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Incident.findByIdAndUpdate(req.params.id, incident, {}, function (err, theincident) {
                if (err) { return next(err); }
                // Successful - redirect to genre detail page.
                res.redirect(theincident.url);
            });
        }
    }
];