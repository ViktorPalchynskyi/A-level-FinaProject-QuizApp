const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');


router.get('/',auth, async (req, res)=> {
  try {
   const user = await User.findById(req.user.id).select('-password');
   res.json(user);
  } catch(err) {
   console.log(err);
   res.status(500).send('Server Error');
  }
});


router.post('/', async (req, res) => {
   
   const {email, password} = req.body;

   try{ 
      let user = await User.findOne({email});
      if(!user) { 
         return res.status(400).json({err: [{msg: 'Invalid Credentials'}]});
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch) { 
         return res.status(400).json({err: [{msg: 'Invalid Credentials'}]});
      }

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