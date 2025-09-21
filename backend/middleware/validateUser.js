module.exports = (req,res,next) =>{
    const { name,email} =req.body;
    if(!name || !email){
        return res.status(400).json({message:'All Field are required'});
    }
    if(!/^\S+@\S+\.\S+$/.test(email)){
        return res.status(400).json({message:'Invalid Email Format'});
    }
    
};