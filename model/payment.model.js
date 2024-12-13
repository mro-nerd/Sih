  import mongoose from 'mongoose';

  const paymentSchema = new mongoose.Schema(
  
  {
      
      paymentId:{
        type:String,
        unique:true,
        required:true,
      } ,
      bookingId: {
       type:String,
       unique:true,
       required:true,
      },
      userId: {
        type:String,
        unique:true,
        required:true,
       },
       transactionId: {
        type:String,
        unique:true,
        required:true,
       },
      status: {
        type:String,
        required:true,
       },
       amount:{
        type:Number,
        required:true,
       },                          
     paymentMethod:{
        type:String,
        required:true,
     },
     
    },
    { timestamps: true }
  );
  
  const Payment = mongoose.model('Payment', paymentSchema);
  
  export default Payment;      