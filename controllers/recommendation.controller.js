// server/controllers/recommendation.controller.js
import axios from 'axios';

export const recommendHotels = async (req, res) => {
  const { city, area, max_price, star_rating, preferred_facilities } = req.query;
  try {
    const response = await axios.get('http://localhost:5000/recommend/hotels', {
      params: { city, area, max_price, star_rating, preferred_facilities }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Error recommending hotels', error: err });
  }
};

export const recommendRestaurants = async (req, res) => {
  const { city, area, cuisine, max_price } = req.query;
  try {
    const response = await axios.get('http://localhost:5000/recommend/restaurants', {
      params: { city, area, cuisine, max_price }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Error recommending restaurants', error: err });
  }
};

export const recommendAttractions = async (req, res) => {
  const { city, time_of_visit, attraction_type } = req.query;
  try {
    const response = await axios.get('http://localhost:5000/recommend/attractions', {
      params: { city, time_of_visit, attraction_type }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Error recommending attractions', error: err });
  }
};
