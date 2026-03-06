const path = require('path');

exports.loginPage = (req,res) => {
  res.sendFile(path.join(__dirname, '../views', 'login.html'));
}

exports.dashboardPage = (req,res) => {
  if(!req.session.userId){
      return res.redirect('/login');
    }
    res.sendFile(path.join(__dirname, '../views', 'dashboard.html'));
}

exports.createClassPage = (req,res) => {
  res.sendFile(path.join(__dirname, '../views', 'create-class.html'));
}

exports.classPage = (req,res) => {
  if(!req.session.userId){
    return res.redirect('/login');
  }
  res.sendFile(path.join(__dirname, '../views', 'class.html'));
}

