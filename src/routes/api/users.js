const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');

const User = require('../../model/User');

router.post('/', async (req, res) => {
   console.log(req.body);
   const {email, password} = req.body;

   try{ 
      let user = await User.findOne({email});
      console.log(user);
      if(user) { 
         return res.status(400).json({err: [{msg: 'User already exists'}]});
      }

      user = new User({
         email, password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      console.log('User registered');

      const payload = {
         user: { 
            id: user.id
         }
      };

      jwt.sign(
         payload,
         config.get('jwtSecret'),
         {expiresIn: 360000},
         (err, token) => { 
            if(err) throw err;
            res.json({token});
         }
         );
   } catch(err) { 
      console.log(err);
      res.status(500).send('Server error');
   }
});

module.exports = router;