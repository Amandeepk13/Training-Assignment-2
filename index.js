const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');


mongoose.connect('mongodb://localhost:27017/cambridgeAssignment');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
  secret: 'my_secret_key',
  resave: false,
  saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/login', (req,res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/dashboard', (req,res) => {
  if(!req.session.userId){
    return res.redirect('/login');
  }
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

app.get('/create-class', (req,res) => {
  res.sendFile(path.join(__dirname, 'views', 'create-class.html'));
});

app.get('/class/:uuid', (req,res) => {
  if(!req.session.userId){
    return res.redirect('/login');
  }
  res.sendFile(path.join(__dirname, 'views', 'class.html'));
});


const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true}
});
const User = mongoose.model('User', userSchema);

const classSchema = new mongoose.Schema({
  name: {type: String, required: true},
  startDate: {type: Date, required: true},
  endDate: {type: Date, required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  uuid: {type: String, default: uuidv4, unique: true},

  rows: [ 
    {
      rowName: String,
      flag : Boolean
    }
  ]
  
});

const Class = mongoose.model('Class', classSchema);

app.post('/api/login', async (req,res) => {
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
});

app.get('/logout', (req,res) => {
  req.session.destroy( () => {
    res.json({message: 'Logged out'});
  });
});

app.get('/api/class/:uuid', async (req,res) => {
  try{
    if(!req.session.userId){
      return res.status(401).json({error: 'Not logged in'});
    }
    const flag = req.query.flag;
    const uuid = req.params.uuid;
    const user = req.session.userId;
    
    const classData = await Class.findOne({uuid, user: user});

    if(!classData){
      return res.status(404).json({error: 'Class not found'});
    }
    
    let filterRows = classData.rows;
    if(flag === 'true'){
      filterRows = filterRows.filter(row => row.flag === true); 
    } else if(flag === 'false'){
      filterRows = filterRows.filter(row => row.flag === false); 
    }


    res.status(200).json({
      name: classData.name,
      startDate : classData.startDate,
      endDate: classData.endDate, 
      rows: filterRows
    });
    
  } catch(err){
    res.status(500).json({error: 'Error'});
  }
});

app.get('/api/classes', async (req,res) => { 
  try{
    if(!req.session.userId){
      return res.status(401).json({error: 'Not logged in'});
    }
    const classes = await Class.find({user: req.session.userId});
    res.json(classes);
  } catch(err){
    res.status(500).json({error: 'Fail'});
  }
});

app.post('/api/create-class', async (req,res) => {
  try{
    if(!req.session.userId){
      return res.status(401).json({error: 'Not logged in'});
    }
    const {name, startDate, endDate} = req.body;
    const newClass = new Class({
      name, startDate, endDate, 
      user: req.session.userId,
      rows: [
        {
          rowName: 'ABC',
          flag: true
        },
        {
          rowName: 'DEF',
          flag: false
        },
        {
          rowName: 'GHI',
          flag: true
        },
        {
          rowName: 'JKL',
          flag: true
        },
        {
          rowName: 'MNO',
          flag: false
        }
      ]});
    await newClass.save();
    res.status(201).json(newClass);
  } catch(err){
    res.status(500).json({error: 'Fail'});
  } 
});

app.get('/api/user', (req,res) => {
  if(!req.session.userId){
    return res.json({error: 'Not logged in'});
  }
  res.json({username: req.session.username});
})

app.listen(3000, () => {
  console.log(`Server is running on 3000`);
});