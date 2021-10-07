import React, {useState} from 'react';
import {
  Segment,
  Input,
  Header,
  Button,
  Container
} from 'semantic-ui-react';

//luodaan muuttujat key ja base, joita käytetään haettassa säätietoja
const api = {
  key: '5ec0e056f3582bc36735bf5902f3d099',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {
  //luodaan hookit ja niille asetetaan tila(query) ja toiminnallisuus(setQuery), joka päivittää tilan
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    
  //funktiolla noudetaan säätiedot avoimesta lähteestä ja asetetaan ne hookkeihin
  function getWeather () {
    fetch (`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(res => res.json())
    .then(result => {
      //Kutsutaan aijemmin luotua hookkia, johon on asetettu säätietoa
      setWeather(result)
      setQuery('')
      console.log(result)
    })
  }

  return (
    <Segment  
      textAlign='center'
      style={{background: 'hsl(78, 11%, 56%)',
      width:'650px',
      height:'650px',
      margin:'auto',
      marginTop:'100px',
      }}
    >

      <Header style = {{paddingTop:'50px', paddingBottom:'50px'}}>
        <Input
          placeholder="Enter your location"
          onChange={e => setQuery(e.target.value)}
        />
        <Button
          className='button'
          style = {{marginLeft: '10px', background: '#5589c0'}}
          type='submit'
          //napin painalluksella kutsutaan funktiota, joka noutaa säätiedot
          onClick={getWeather}
          >
            Search...
        </Button>
      </Header>

      {(typeof weather.main != "undefined") ? ( 
      <Container>
        <div className='displayIcon'>
          <p className='icon'> </p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          />
        </div>

        <div className='displayTemp'>
          <p className='temp'>{Math.round(weather.main.temp)} °C</p>
        </div>

        <div className='displayName'>
          <p className='cityName'> {weather.name}, {weather.sys.country}</p>
        </div>

        <div className='displayDesc'>
          <p className='desc'> {weather.weather[0].description}</p>
        </div>

        <div className='displayWind'>
          <p className='desc'> {Math.round(weather.wind.speed)} m/s</p>
        </div>
      </Container>
        ) : ('')}
    </Segment> 
  )
}
export default App;
