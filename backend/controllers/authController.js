const { validationResult } = require('express-validator');
const Student = require('../models/studentModel');
const md5 = require('md5');
exports.login = async (req,res) =>{
    const {email,password} = req.body;
    const user =await Student.findByEmail(email);  
    const errors = validationResult(req);    
    const hashedPassword = md5(password);
    if(!errors.isEmpty()) {      
      return res.status(400).json({ errors: errors.array() });
    }
    else if(!user || user.password !== hashedPassword){
      return res.status(401).json({ 
          errors:[
          {
            msg:"Password dose not match"
          }
            ]        
      });        
    }     
    req.session.user = user.email;   
    res.json({ message: 'Login successful',user:req.session.user });
};
exports.addDocument = async (req,res) => {
  console.log('test');
};

exports.add = async (req,res) => {
  try{

      const errors = validationResult(req);    
      const {roll_no, first_name, last_name,dob,gender,class_id,address,mobile,email} = req.body;    
    if(!errors.isEmpty()) {      
        return res.status(400).json({ errors: errors.array() });
      } 
        const newStudent = await Student.addStudent({roll_no, first_name, last_name,dob,gender,class_id,address,mobile,email});
        res.status(201).json({ message: "Student added successfully", studentId: newStudent.insertId });
  }catch(err){
        res.status(500).json({ message: "Error adding student", error: err.message });
  }
}
exports.deleteStudent = async (req,res) => {
  const id = req.params.id;
  try{
        const result = await Student.deleteByStudent(id);   
        res.status(200).json({message:"Student Deleted Succesfully.."})
  } catch (err) {
        res.status(500).json({ message: "Error updating student", error: err.message });
  }
}

exports.updatestudent = async(req,res) => {  
  try {
        const id = req.params.id;
        const updateData = req.body;
        if (!updateData || Object.keys(updateData).length === 0) {
          return res.status(400).json({ message: "No data received" });
        }
        const result = await Student.updateByStudent(updateData,id);   
        res.status(200).json({message:"Student Update Succesfully.."})
  } catch (err) {
        res.status(500).json({ message: "Error updating student", error: err.message });
  }
}
exports.editstudent = async(req,res) => {
    const { id } = req.params;
    try {
      const getStudentData= await Student.getStudentById(id);
      res.json(getStudentData);
    } catch(err) {
      res.status(500).json({ error: "Database error", details: err.message });  
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

exports.getClass = async(req,res) => {
  try {
    const classes = await Student.getAllClasses();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
}
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    res.status(200).json({
      message: 'File uploaded successfully!',
    });   
  } catch (error){
        res.status(500).json({ message: 'File upload failed', error: error.message });
  }  
}  
exports.logout = async (req,res) => {
  try {
    req.session.destroy();
    res.json({ message: 'Logged out' });
  } catch (err) {
        console.error('Logout error:', err);
        res.status(500).json({ message: 'Server error during logout' });
  }      
};