const router = require('express').Router();
const db = require('../models');
const bcrypt = require ('bcrypt');

const { User } =db;

router.post('/',async (req,res)=> {
    console.log ('logging in with ', req.body)
    const {email, password} = req.body
    let user= await User.findOne({
        where:{ 
            email
        }
       
    })
    if (!user || !await bcrypt.compare(password,user.passwordDigest)){
        res.status (404).json({
            message:'Could not find the user with the provided credentials'
        })
    }else{
       req.session.userId = user.userId;
       res.status(200).json({user})
    }
    console.log(user);
})

router.get('/profile',async(req,res)=>{
    try{
        console.log('The user session is', req.session.userId);
        let userId = req.session.userId;
        let user = await User.findOne({
            userId
        });
    } catch(e){
        res.status(404).json({message: 'Could not validate user'})
    }
    
});

module.exports = router; 