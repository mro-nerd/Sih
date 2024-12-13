import axios from 'axios';
import Itinerary from '../model/itinerary.model.js';
import Session from '../model/session.model.js';

export const createItinerary = async (req, res) => {
  const { sessionId, city, budget, duration, preferences, allocation } = req.body;
  //const city=preferences.city;
  // console.log({city,
  //   budget,
  //   duration,
  //   preferences,
  //   allocation})
  try {
    const response = await axios.post('http://localhost:5000/itinerary', {
      city,
      budget,
      duration,
      preferences,
      allocation
    });

    const itineraryData = response.data;
    console.log(itineraryData);
    const processedDays = itineraryData.days.map(days => ({
      date: new Date(days.date),
      hotels: days.hotels.map(_id => mongoose.Types.ObjectId(_id)),
      restaurants: {
        Lunch: days.restaurants.Lunch.map(_id => mongoose.Types.ObjectId(_id)),
        Dinner: days.restaurants.Dinner.map(_id => mongoose.Types.ObjectId(_id)),
      },
      attractions: {
        Morning: days.attractions.Morning.map(_id => mongoose.Types.ObjectId(_id)),
        Afternoon: days.attractions.Afternoon.map(_id => mongoose.Types.ObjectId(_id)),
        Evening: days.attractions.Evening.map(_id => mongoose.Types.ObjectId(_id)),
        Night: days.attractions.Night.map(_id => mongoose.Types.ObjectId(_id)),
      }
    }));

    // Log for debugging
    console.log("Processed Days:", processedDays);

   
    const itinerary = new Itinerary({ sessionId,city,  budget, duration, preferences, days: processedDays });
    await itinerary.save();
    console.log("saved");
    await Session.findOneAndUpdate({ sessionId }, { itinerary: itinerary._id });
    res.status(201).json(itinerary);
  } catch (err) {
    res.status(500).json({ message: 'Error creating itinerary', error: err });
  }
};

export const updateItinerary = async (req, res) => {
  const { itineraryId, days } = req.body;
  try {
    const itinerary = await Itinerary.findOneAndUpdate({ _id: itineraryId }, { days }, { new: true });
    res.json(itinerary);
  } catch (err) {
    res.status(500).json({ message: 'Error updating itinerary', error: err });
  }
};

export const getItinerary = async (req, res) => {
  const { itineraryId } = req.params;
  try {
    const itinerary = await Itinerary.findById(itineraryId).populate('days.hotels days.restaurants days.attractions');
    res.json(itinerary);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving itinerary', error: err });
  }
};

export const addItemToItinerary = async (req, res) => {
  const { itineraryId, dayIndex, itemType, itemId } = req.body;
  try {
    const itinerary = await Itinerary.findById(itineraryId);
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    itinerary.days[dayIndex][itemType].push(itemId);
    await itinerary.save();
    res.json(itinerary);
  } catch (err) {
    res.status(500).json({ message: 'Error adding item to itinerary', error: err });
  }
};

export const removeItemFromItinerary = async (req, res) => {
  const { itineraryId, dayIndex, itemType, itemId } = req.body;
  try {
    const itinerary = await Itinerary.findById(itineraryId);
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    itinerary.days[dayIndex][itemType] = itinerary.days[dayIndex][itemType].filter(id => id.toString() !== itemId);
    await itinerary.save();
    res.json(itinerary);
  } catch (err) {
    res.status(500).json({ message: 'Error removing item from itinerary', error: err });
  }
};
