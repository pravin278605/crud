// const express =require("express");
// const cors = require("cors");
// const app = express();
// const port = 3000;
// app.use(express.json());
// app.use(cors());

// const studentRouter = require('./routes/studentRoutes');
// app.use(studentRouter);


// app.post('/create',(req,res)=>{
//   const {name,email} = req.body;
//   const sql='INSERT INTO student (name,email) values(?,?)';
//   db.query(sql,[name,email],(err,result)=>{
//     if(err){
//       console.error('insert errr',err);
//             return res.status(500).json({ error: 'Database insert failed' });
//     }
//     res.status(200).json({
//     message: 'User created successfully',
//     userId: result.id,
//     });

//   })
// });
// app.listen(port, () => {
//   console.log(`Serxx
//     ver running at http://localhost:${port}`);
// });
