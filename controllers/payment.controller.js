// server/controllers/payment.controller.js
import stripe from 'stripe';
import Payment from '../model/payment.model.js';
import Booking from '../model/booking.model.js';

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  const { userId, bookingId, amount, currency } = req.body;
  try {
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: amount * 100, // Stripe expects amount in cents
      currency: currency,
      payment_method_types: ['card'],
      metadata: {
        userId,
        bookingId
      }
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ message: 'Error creating payment intent', error: err });
  }
};

export const confirmPayment = async (req, res) => {
  const { paymentIntentId, paymentMethodId } = req.body;
  try {
    const paymentIntent = await stripeClient.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentMethodId
    });

    const { userId, bookingId } = paymentIntent.metadata;
    const payment = new Payment({
      userId,
      bookingId,
      amount: paymentIntent.amount / 100, // Convert back to original currency
      currency: paymentIntent.currency,
      paymentMethod: 'card',
      paymentStatus: paymentIntent.status,
      transactionId: paymentIntent.id
    });

    await payment.save();
    await Booking.findByIdAndUpdate(bookingId, { status: 'confirmed' });

    res.json({ message: 'Payment confirmed successfully', payment });
  } catch (err) {
    res.status(500).json({ message: 'Error confirming payment', error: err });
  }
};
