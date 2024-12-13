
  import mongoose from 'mongoose';

  const deviceSchema = new mongoose.Schema(
  
  {
      
      deviceId:{
        type:String,
        unique:true,
        required:true,
      } ,
      cityId: {
       type:String,
       required:true,
      },             
      location:{
       type:String,
       required:true,
      },             
      status: {                  
        type:String,
        required:true,
      },
     
     
    },
    { timestamps: true }
  );
  
  const Device = mongoose.model('Device', deviceSchema);
  
  export default Device;  