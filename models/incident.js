var mongoose = require('mongoose');
const { DateTime } = require("luxon");  //for date handling

var Schema = mongoose.Schema;

var IncidentSchema = new Schema({
    ir: { type: String, required: true, maxlength: 100 },
    occurence_date: { type: Date },
    occurence_time: { type: Time },
    incident_type: { type: String, required: true, maxlength: 100 },
    location: { type: String, required: true, maxlength: 100 },
    location_entry: { type: String, required: true, maxlength: 100 },
    narrative: { type: String, required: true, maxlength: 100 },
    case_status: { type: String, required: true, maxlength: 100 },
    officer_name: { type: String, required: true, maxlength: 100 },
    officer_serial_number: { type: String, required: true, maxlength: 100 },
    report_date: { type: Date },
    report_time: { type: Time },
    value: { type: String, required: true, maxlength: 100 },
    supp: { type: String, required: true, maxlength: 100 },
    serial_number: { type: String, required: true, maxlength: 100 }
});

// Virtual for incident IR#.
IncidentSchema.virtual('ir').get(function () {
    return this.ir;
});

// Virtual for occurence date.
IncidentSchema.virtual('occurence_date').get(function () {
    return this.occurence_date;
});

// Virtual for occurence time.
IncidentSchema.virtual('occurence_time').get(function () {
    return this.occurence_time;
});

// Virtual for incident type.
IncidentSchema.virtual('incident_type').get(function () {
    return this.incident_type;
});

// Virtual for location.
IncidentSchema.virtual('location').get(function () {
    return this.location;
});

// Virtual for location entry.
IncidentSchema.virtual('location_entry').get(function () {
    return this.location_entry;
});

// Virtual for narrative.
IncidentSchema.virtual('narrative').get(function () {
    return this.narrative;
});

// Virtual for case status.
IncidentSchema.virtual('case_status').get(function () {
    return this.case_status;
});

// Virtual for case status.
IncidentSchema.virtual('case_status').get(function () {
    return this.case_status;
});

// Virtual for officer name.
IncidentSchema.virtual('officer_name').get(function () {
    return this.officer_name;
});

// Virtual for officer serial number.
IncidentSchema.virtual('officer_serial_number').get(function () {
    return this.officer_serial_number;
});

// Virtual for report date.
IncidentSchema.virtual('report_date').get(function () {
    return this.report_date;
});

// Virtual for report time.
IncidentSchema.virtual('report_time').get(function () {
    return this.report_time;
});

// Virtual for value.
IncidentSchema.virtual('value').get(function () {
    return this.value;
});

// Virtual for supp.
IncidentSchema.virtual('report_date').get(function () {
    return this.report_date;
});

// Virtual for serial number.
IncidentSchema.virtual('serial number').get(function () {
    return this.report_date;
});

// Export model.
module.exports = mongoose.model('Incident', IncidentSchema);