const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');

const mongoose = require('mongoose');

router.get('/',verify, async (req,res) => {


    let userdata = await User.findOne({_id: req.user._id})

   let x =  mongoose.collection('Users').aggregate([
        { $lookup:
                {
                    from: 'students',
                    localField: '5e70dad77c650362283f843f',
                    foreignField: '_id',
                    as: 'additional_info'
                }
        }
    ]).toArray(function(err, res) {
        if (err) throw err;
        res.send(JSON.stringify(res))
       // console.log(JSON.stringify(res));


    });



});

module.exports = router;