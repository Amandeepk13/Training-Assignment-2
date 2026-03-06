const Class = require('../models/Class');

exports.getClasses = async (req,res) => {
  try{
      if(!req.session.userId){
        return res.status(401).json({error: 'Not logged in'});
      }
      const classes = await Class.find({user: req.session.userId});
      res.json(classes);
    } catch(err){
      res.status(500).json({error: 'Fail'});
    }
}

exports.createClass = async(req,res) => {
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
}

exports.getClassByUUID = async(req,res) => {
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
}