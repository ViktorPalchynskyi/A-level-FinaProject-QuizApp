const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../../model/User');

router.post('/', async (req, res) => {
   console.log(req.body);
   const {email, password} = req.body;
   res.send('From user1');

   try{ 
      let user = await User.findOne({email});
      if(user) { 
         res.status(400).json({err: 'User already exists'});
      }

      user = new User({
         email, password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      console.log('User registered');

   } catch(err) { 
      console.log(err);
   }
});

module.exports = router;