import mongoose from 'mongoose';

const languageSchema = new mongoose.Schema(

{
    
    languageId:{
      type:String,
      unique:true,
      required:true,
    } ,
    name: {
     type:String,
     required:true,
    },             
    code:{
     type:String,
     required:true,
    },             
    phrases: {                  
      type:String,
      required:true,
    },
   
  },
  { timestamps: true }
);

const Language = mongoose.model('Language', languageSchema);

export default Language;