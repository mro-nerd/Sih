 import mongoose from 'mongoose';

  const logSchema = new mongoose.Schema(
  
  {
      
      logId:{
        type:String,
        unique:true,
        required:true,
      } ,
     
     type: {
        type:String,
        required:true,
       },
                              
      description:{
        type:String,
        required:true,
     },
     
    },
    { timestamps: true }
  );
  
  const Log = mongoose.model('Log', logSchema);
  
  export default Log;          
