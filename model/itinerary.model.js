import mongoose from 'mongoose';

const itinerarySchema = new mongoose.Schema({
  sessionId: { type: String, required: true }, // Unique identifier for user session
  city: { type: String, required: true },
  budget: { type: Number, required: true },
  duration: { type: Number, required: true },
  preferences: {
    hotel_star: { type: Number }, // Numeric rating for hotels
    hotel_facilities: [{ type: String }], // Array of strings for facilities
    cuisine: { type: String }, // Cuisine preference
    attraction_type: { type: String } // Attraction type preference
  },
  days: [
    {
      date: { type: Date, required: true }, // Specific date for each day
      hotels: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Hotel' // Reference to the Hotel model
        }
      ],
      restaurants: {
        Lunch: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant' // Reference to the Restaurant model
          }
        ],
        Dinner: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant' // Reference to the Restaurant model
          }
        ]
      },
      attractions: {
        Morning: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Attraction' // Reference to the Attraction model
          }
        ],
        Afternoon: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Attraction' // Reference to the Attraction model
          }
        ],
        Evening: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Attraction' // Reference to the Attraction model
          }
        ],
        Night: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Attraction' // Reference to the Attraction model
          }
        ]
      }
    }
  ]
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

export default Itinerary;