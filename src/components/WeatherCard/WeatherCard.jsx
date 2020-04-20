import React from 'react';
import './WeatherCard.css';
export default function WeatherCard({ city, temp, weather }) {
  return (
    <div className='weather-card'>
      <div className='city'>{city}</div>
      <div>{temp}C</div>
      <div>{weather}</div>
    </div>
  );
}
