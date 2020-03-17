const mongoose = require('mongoose');

const StudentsSchema = new mongoose.Schema({
    birthday:{
        type: Date,
        required: true,
        default: Date.now
    },
    city:{
        type: String,
        required: true,
        min: 3
    },
    institution:{
        type:String,
        required: true,
        max: 255
    },
    course:{
        type: String,
        required: true,
    },
    ocr:{
        type: String,
        required: true,
    },
    specialty:{
        type: String,
        required: true,
    },
    additional_info:{
        type: Array,
        default: {
            photo:'',
            interests:'',
            hobby:'',
            phone:'',
            facebook:'',
            linkedin:'',
            instagramm:''
        }
    }

});

module.exports = mongoose.model('students',StudentsSchema);