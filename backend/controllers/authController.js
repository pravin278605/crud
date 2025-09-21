const { validationResult } = require('express-validator');
const Student = require('../models/studentModel');

exports.login = async (req,res) =>{

  const {email,password} = req.body;
    const user =await Student.findByEmail(email);    
    if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  req.session.user = user.email;   
  res.json({ message: 'Login successful',user:req.session.user });
};

exports.add = async (req,res) => {
  try{
      const errors = validationResult(req);
      
    const {roll_no, first_name, last_name,dob,gender,class_id,address,mobile,email} = req.body;
    /*if(!roll_no || !class_id || !first_name || !dob){
      return res.status(400).json({message:"All Field are required"});
    }
    if(!roll_no){
    return res.status(400).json({ errors:["Roll Number is require"]});

    }*/
   if (!errors.isEmpty()) {
    // return validation errors
      return res.status(400).json({ errors: errors.array() });
    } 
    const newStudent = await Student.addStudent({roll_no, first_name, last_name,dob,gender,class_id,address,mobile,email});
      res.status(201).json({ message: "Student added successfully", studentId: newStudent.insertId });
  }catch(err){
    res.status(500).json({ message: "Error adding student", error: err.message });
  }
}
exports.getStudent = async (req,res) => {
  try {
    const studentlist = await Student.getAllStudent();
    res.json(studentlist);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
}
exports.getSession = async (req,res) => {
    if(req.session.user){
      res.json({ loggedIn: true, user: req.session.user });      
    }
    else{      
        res.json({ loggedIn: false });
    }  
};

/*exports.getClasses = async (req, res) => {
  try {
    const classes = await Student.getAllClasses();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
};*/
exports.getClass = async(req,res) => {
  try {
    const classes = await Student.getAllClasses();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
}
exports.logout = async (req,res) => {
    req.session.destroy();
    res.json({ message: 'Logged out' });
};