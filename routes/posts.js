const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');
router.get('/',verify, async (req,res) => {


    let userdata = await User.findOne({_id: req.user._id})
    res.send(userdata)

});

module.exports = router;