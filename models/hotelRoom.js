const mongoose = require('mongoose');
const Joi = require("joi");

const hotelRoomSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    roomNumber: {
        type: Number,
        required: true,
        min: 1,
        max: 500
    },
    city: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    capacity: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    entryDate: {
        type: String,
        required: true,
    },
    departureDate: {
        type: String,
        required: true,
    },
    numberOfBeds: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    isVip: {
        type: Boolean,
        default: false
    }
})

const HotelRoom = mongoose.model('HotelRoom', hotelRoomSchema);

function validateHotelRoom(hotel){
    const schema = Joi.object({
        hotelName: Joi.string().min(5).max(50).required(),
        roomNumber: Joi.number().min(1).max(500).required(),
        city: Joi.string().min(2).max(50).required(),
        capacity: Joi.number().min(1).max(10).required(),
        entryDate: Joi.string().required(),
        departureDate: Joi.string().required(),
        numberOfBeds: Joi.number().min(1).max(10).required(),
        isVip: Joi.boolean()
    })
    return schema.validate(hotel)
}

module.exports.HotelRoom = HotelRoom;
module.exports.validation = validateHotelRoom;
module.exports.hotelSchema = hotelRoomSchema;