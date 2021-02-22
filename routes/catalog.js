var express = require('express');
var router = express.Router();

// Require controller modules.
var incident_controller = require('../controllers/incidentController');
var person_controller = require('../controllers/personController');
var vehicle_controller = require('../controllers/vehicleController');

/// BOOK ROUTES ///

// GET catalog home page.
router.get('/', incident_controller.index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/incident/create', incident_controller.incident_create_get);

// POST request for creating Book.
router.post('/incident/create', incident_controller.incident_create_post);

// GET request to delete Book.
router.get('/incident/:id/delete', incident_controller.incident_delete_get);

// POST request to delete Book.
router.post('/incident/:id/delete',incident_controller.incident_delete_post);

// GET request to update Book.
router.get('/incident/:id/update', incident_controller.incident_update_get);

// POST request to update Book.
router.post('/incident/:id/update', incident_controller.incident_update_post);

// GET request for one Book.
router.get('/incident/:id', incident_controller.incident_detail);

// GET request for list of all Book items.
router.get('/incidents', incident_controller.incident_list);

/// AUTHOR ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get('/person/create', person_controller.person_create_get);

// POST request for creating Author.
router.post('/person/create', person_controller.person_create_post);

// GET request to delete Author.
router.get('/person/:id/delete', person_controller.person_delete_get);

// POST request to delete Author.
router.post('/person/:id/delete', person_controller.person_delete_post);

// GET request to update Author.
router.get('/person/:id/update', person_controller.person_update_get);

// POST request to update Author.
router.post('/person/:id/update', person_controller.person_update_post);

// GET request for one Author.
router.get('/person/:id', person_controller.person_detail);

// GET request for list of all Authors.
router.get('/persons', person_controller.person_list);

/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get('/vehicle/create', vehicle_controller.vehicle_create_get);

//POST request for creating Genre.
router.post('/vehicle/create', vehicle_controller.vehicle_create_post);

// GET request to delete Genre.
router.get('/vehicle/:id/delete', vehicle_controller.vehicle_delete_get);

// POST request to delete Genre.
router.post('/vehicle/:id/delete', vehicle_controller.vehicle_delete_post);

// GET request to update Genre.
router.get('/vehicle/:id/update', vehicle_controller.vehicle_update_get);

// POST request to update Genre.
router.post('/vehicle/:id/update', vehicle_controller.vehicle_update_post);

// GET request for one Genre.
router.get('/vehicle/:id', vehicle_controller.vehicle_detail);

// GET request for list of all Genre.
router.get('/vehicles', vehicle_controller.vehicle_list);

module.exports = router;