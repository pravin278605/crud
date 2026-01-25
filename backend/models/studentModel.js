const pool = require('../config/db');
exports.findByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};
exports.getStudentById = async (id) => {
  try{
  const [rows] = await pool.query('SELECT * FROM students WHERE id = ?', [id]);
    return rows[0];
  }catch(err){
    throw err;
  }
}
exports.getAllClasses = async () => {
  try {
    const [rows] = await pool.query("SELECT id,CONCAT(class_name, '-', section) as name FROM classes");
    return rows;   // returns array of classes
  } catch (err) {
    throw err;
  }
};
exports.getAllStudent = async () => {
  try {
    const [rows] = await pool.query("SELECT st.id,st.roll_no,concat(IFNULL(st.first_name,''),' ',IFNULL(st.last_name,''))  as name,date(dob) as dob,gender,CONCAT(cl.class_name,' ',cl.section) class_name,st.gender,st.email,st.mobile FROM students st INNER JOIN classes cl on st.class_id = cl.id WHERE is_deleted=0");
    return rows;   // returns array of classes
  } catch (err) {
    throw err;
  }
};
exports.addStudent = async (studentData) => {
      const { roll_no, first_name, last_name,dob,gender,class_id,address,mobile,email} = studentData;      
      const [result] = await pool.query(
      "INSERT INTO students (roll_no, first_name,last_name,dob,gender,class_id,address ,mobile,email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [roll_no, first_name, last_name,dob,gender,class_id,address,mobile,email]
    );
    return result; 
};
exports.deleteByStudent = async (id) => {
  const sql = `UPDATE students SET is_deleted = 1 WHERE id = ?`;
   pool.query(sql,[id],(err,result)=>{
    if(err) return;
   });
}
exports.updateByStudent = async(updateData,id) => {
  try {   
        const { roll_no, first_name, last_name, dob, gender, class_id, address, mobile, email } = updateData;
        const sql = 
          `UPDATE students SET roll_no=?,  first_name=?, last_name=?, dob=?, gender=?, class_id=?, address=?, mobile=? ,email=? WHERE id=? `;
        const values =  [roll_no, first_name, last_name,dob,gender,class_id,address,mobile,email,id];    
        const [result] = await pool.query(sql, values);
        return result;
  } catch (error) {
          console.error("Error in updateByStudent:", error);
          throw error;
  }
};



