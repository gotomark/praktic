const router = require('express').Router();
const User = require('../model/User');
const Students = require('../model/Students');
const {registerStudentsValidation,registerEmployerValidation,loginValidation} = require('../validation');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

router.post('/students/register', async (req, res)=>{
    const {error} = registerStudentsValidation(req.body);
    if (error) return res.status(400).send(error)

    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return  res.status(400).send('Email already exists')

    const student = new Students({
        birthday:req.body.birthday,
        city:req.body.city,
        institution:req.body.institution,
        course:req.body.course,
        ocr:req.body.ocr,
        specialty:req.body.specialty,
        additional_info:{
            photo:req.body.photo,
            interests:req.body.interests,
            hobby:req.body.hobby,
            phone:req.body.phone,
            facebook:req.body.facebook,
            linkedin:req.body.linkedin,
            instagramm:req.body.instagramm
        }
    });

    try{
        const savedStudent = await student.save();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            first_name: req.body.first_name,
            last_name:  req.body.last_name,
            email: req.body.email,
            password: hashedPassword,
            type_account: '1',
            student_obj_id: student._id
        });
        try{
            const savedUser = await user.save();

            res.send({user: user});
        }catch (err) {
            res.status(400).send(err)
        }


    }catch (err) {
        res.status(400).send(err)
    }

});

/*
router.post('/employer/register', async (req, res)=>{
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return  res.status(400).send('Email already exists')

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        type_account: '2',
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch (err) {
        res.status(400).send(err)
    }
});
*/
router.post('/login',async (req, res)=>{
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({email: req.body.email});
    if (!user) return  res.status(400).send('Email not found')
    const validPass = await bcrypt.compare(req.body.password, user.password)   ;
    if(!validPass) return res.status(400).send('Invalid password');

    const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token)
})

module.exports = router;