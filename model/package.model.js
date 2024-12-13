  import mongoose from 'mongoose';

  const packageSchema = new mongoose.Schema(
  
  {
      
      packageId:{
        type:String,
        unique:true,
        required:true,
      } ,
      cityId: {
       type:String,
       unique:true,
       required:true,
      },
      description: {
        type:String,
        required:true,
       },
       duration:{
        type:Number,
        required:true,
       },                          
      price:{
       type:Number,
       required:true,
      },             
      placesIncluded:{
        type:Array,
        required:true,
      },
     
    },
    { timestamps: true }
  );
  
  const Package = mongoose.model('Package', packageSchema);
  
  export default Package;    