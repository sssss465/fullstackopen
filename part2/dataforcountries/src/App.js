import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ country }) => {
  // console.log(country);
  const [weather, setWeather] = useState(null);
  const API_KEY = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    console.log("effect");
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: `${country.capital},${country.alpha2code}`,
          units: "metric",
          appid: API_KEY,
        },
      })
      .then((res) => setWeather(res.data));
  }, [API_KEY, country.capital]);
  console.log("weather:", weather);
  return weather ? (
    <div>
      <h3>Weather in {country.capital}</h3>
      <div>
        <b>temperature: {weather.main.temp} </b>
      </div>
      <div>
        <b>
          wind: {weather.wind.speed} m/s {weather.wind.deg} degrees{" "}
        </b>
      </div>
    </div>
  ) : (
    <div>loading...</div>
  );
};
const Country = ({ search, country }) => {
  console.log(country);
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map((l) => (
          <li key={l.name}>{l.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="flag" width="500"></img>
      <Weather country={country} />
    </div>
  );
};
const Listview = ({ country }) => {
  const [clicked, setClicked] = useState(false);
  return (
    <div>
      <li>
        {country.name}{" "}
        <button onClick={() => setClicked(!clicked)}>show</button>
      </li>

      {clicked ? <Country country={country}></Country> : null}
    </div>
  );
};

const Results = ({ search, data }) => {
  data = data.filter(
    (d) => d.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
  );
  if (data.length > 10) {
    return <div> Too many matches, specify another filter</div>;
  } else if (data.length === 1) {
    return <Country search={search} country={data[0]} />;
  } else {
    return (
      <ul>
        {data.map((s) => (
          <Listview key={s.name} country={s} />
        ))}
      </ul>
    );
  }
};
function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <div className="App">
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <Results search={search} data={data} />
    </div>
  );
}

export default App;
