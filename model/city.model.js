  import mongoose from 'mongoose';

  const citySchema = new mongoose.Schema(
  
  {
      
      cityId:{
        type:String,
        unique:true,
        required:true,
      } ,
     
      name: {
        type:String,
        required:true,
       },
       state: {
        type:String,
        required:true,
       },
       country: {
        type:String,
        required:true,
       },
        description: {
        type:String,
        required:true,
       },
       coordinates: {
        latitude:{
            type:Number,
            required:true,
        },
        longitude:{
            type:Number,
            required:true,
        }
       },                       
      mapData:{
        type:mongoose.Schema.Types.Mixed,
        required:true,
     },
     languageRecommendation:[{
        language: { 
        type: String,
         required: true, 
        },
         places: [
         { type: String,
         required: true,
         }
         ]
     }
        
     ]
        
    
     
    },
    { timestamps: true }
  );
  
  const City = mongoose.model('City', citySchema);
  
  export default City;          
   