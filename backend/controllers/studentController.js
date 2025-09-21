const Student = require('../models/studentModel');
exports.getUsers = (req, res) => {
  Student.getAll((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  };
exports.getUser = (req, res) => {
  Student.getUserById(req.params.id,(err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results[0]);
    });
};
exports.saveStudent = (req,res) => {
  const studentData = req.body;
  if(!studentData.name){
    res.send()
  }
  Student.create(studentData,(err,result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error inserting data', error: err });
    }
    res.status(201).json({
      success: true,
      message: 'Student added successfully!',
      data: { id: result.insertId, ...req.body }
    });
  });
};
exports.updateStudent = (req,res) =>{
  const studentData = req.body;
  const id = req.params.id;

  Student.update(id,studentData,(err,result)=>{
    if (err) {
      return res.status(500).json({ success: false, message: 'Error updating data', error: err });
    }
    res.status(201).json({
      success: true,
      message: 'Student updated successfully!',
      //data: { id: result.insertId, ...req.body }
    });

  });

};





//const Student = require('../models/studentModel');

/*exports.getAllstudent = async(req, res) => {
  const students = await Student.getStudent();
  res.json(students);
};*/  

 /* User.createUser(name, email, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'User created', userId: result.insertId });
  });*/

