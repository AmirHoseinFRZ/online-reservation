const Joi = require('joi');
const mongoose = require('mongoose');

const trainTicketSchema = new mongoose.Schema({
    origin: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    destination: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    company: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    departureTime: {
        type: String, // it will change
        required: true
    },
    arrivalTime:{
        type: String, //it will change
        required: true
    },
    trainNumber:{
        type: Number,
        required: true,
        min: 0,
        max: 1000
    },
    station: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    carriageNumber: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    price: {
        type: Number,
        required: true,
        min: 10,
        max: 500
    },
    quantity: {
        type: Number,
        // required: true,
        // default: 50,
        min: 0,
    },
    isVip: {
        type: Boolean,
        default: false
    }
});

trainTicketSchema.post('save', function(doc, next) {
    if (doc.min < 1) {
        doc.remove();
    }
    next();
});

const TrainTicket = mongoose.model('TrainTicket', trainTicketSchema);

function validateTrainTicket(ticket) {
    const schema = Joi.object({
        origin: Joi.string().min(2).max(50).required(),
        destination: Joi.string().min(2).max(50).required(),
        company: Joi.string().min(2).max(50).required(),
        departureTime: Joi.string().required(),
        arrivalTime: Joi.string().required(),
        trainNumber: Joi.number().min(0).max(1000).required(),
        station: Joi.string().min(2).max(50).required(),
        carriageNumber: Joi.number().min(1).max(100).required(),
        price: Joi.number().min(10).max(500).required(),
        quantity: Joi.number().min(1).max(50).required(),
        isVip: Joi.boolean()
    });
    return schema.validate(ticket);
}

module.exports.TrainTicket = TrainTicket;
module.exports.validate = validateTrainTicket;
module.exports.trainTicketSchema = trainTicketSchema;