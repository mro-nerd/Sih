
  import mongoose from 'mongoose';

  const placeSchema = new mongoose.Schema(
  
  {
      
      
    placesId:{
        type:String,
        unique:true,
        required:true,
    } ,

    cityId:{
        type:String,
        unique:true,
        required:true,
      } ,
     
      name: {
        type:String,
        required:true,
       },
       type: {
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
      ratings:{
        type:Number,
        required:true,
     },
     reviews:[{
        review: { 
        type: String,
         required: true, 
        },
        rating: { 
            type: Number,
            required: true, 

        },
         userId:{
            type:String,
            unique:true,
            required:true,
        },
       
     }
        
     ],
     images:{
        type:Array,
        required:true,
    },
        
    
     
    },
    { timestamps: true }
  );
  
  const Places = mongoose.model('Places', placeSchema);
  
  export default Places;          
     