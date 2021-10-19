import React, {useState} from 'react';
import './index.css';

const api = {
  key: '5ec0e056f3582bc36735bf5902f3d099',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    
  function getWeather () {
    fetch (`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(res => res.json())
    .then(result => {
      setWeather(result)
      setQuery('')
      console.log(result)
    })
  }

return (
  <div class='photo'>
    <div class='Parent'>
      <div className='page'>
           <div>      
              <input 
              placeholder="Enter your location" 
              onChange={e => setQuery(e.target.value)}> 
              </input>
            </div>
            
            <div className='button'>
            <button
            className='button'
            style = {{margingTop: '15px'}}
            type='submit'
            onClick={getWeather}
            >
              Search...
            </button>
            </div>

          {(typeof weather.main != "undefined") ? ( 

          <div className='results'>
            <div className='displayIcon'>
              <p className='icon'> </p>
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              />
            </div>

            <div className='displayTemp'>
              <p>{Math.round(weather.main.temp)} °C</p>
            </div>

            <div className='displayName'>
              <p> {weather.name}, {weather.sys.country}</p>
            </div>

            <div className='displayDesc'>
              <p> {weather.weather[0].description}</p>
            </div>

            <div className='displayWind'>
              <p> {Math.round(weather.wind.speed)} m/s</p>
            </div>
          </div>
            ) : ('')}
      </div>   
    </div>
  </div>  
  )
}
export default App;