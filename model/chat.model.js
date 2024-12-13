
  import mongoose from 'mongoose';

  const chatSchema = new mongoose.Schema(
  
  {
      
      chatId:{
        type:String,
        unique:true,
        required:true,
      } ,
      userId: {
       type:String,
       unique:true,
       required:true,
      },
      
      meassage: {
        type:String,
        required:true,
       },
                              
      response:{
        type:String,
        required:true,
     },
     
    },
    { timestamps: true }
  );
  
  const Chat = mongoose.model('Chat', chatSchema);
  
  export default Chat;        