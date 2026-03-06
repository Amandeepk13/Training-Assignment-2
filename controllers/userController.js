const User = require('../models/User');
const bcrypt = require('bcrypt');



exports.login = async (req, res) => {

  const {username,password} = req.body;
    try{
      let user = await User.findOne({username});
      if(!user){
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({username, password: hashedPassword});
        await user.save();
      } else {
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
          return res.status(401).json({error: 'Invalid'});
        }
      }
  
      req.session.userId = user._id;
      req.session.username = user.username;
      res.status(200).json({message: 'Login successful'});
    }
    catch(err){
      res.status(500).json({error: 'Error'});
    }

}

exports.logout = (req,res) => {
   req.session.destroy( () => {
    res.json({message: 'Logged out'});
  });
}

exports.getUser = (req,res) => {
  if(!req.session.userId){
    return res.json({error: 'Not logged in'});
  }
  res.json({username: req.session.username});
}