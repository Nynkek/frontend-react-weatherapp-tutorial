import React, {useEffect, useState} from 'react';
import './ForecastTab.css';
import axios from "axios";

const apiKey = '04cef6f1e65431a93b30ee232682fe75'


function ForecastTab({coordinates}) {
    const [forecasts, setForecasts] = useState([]);


    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,current,hourly&appid=${apiKey}&lang=nl`)
                console.log(result.data)
                setForecasts(result.data.daily.slice(1, 6));
            } catch (e) {
                console.error(e);
            }
        }

        if (coordinates) {
            fetchData();
        }


    }, [coordinates]);

    function createDateString(timestamp) {
        const day = new Date(timestamp * 1000);
        return day.toLocaleDateString('nl-NL', { weekday: 'long' });
    }

  return (

    <div className="tab-wrapper">
        {forecasts && forecasts.map((day) => {
            return (
                <article className="forecast-day" key={day.dt}>
                    <p className="day-description">
                        {createDateString(day.dt)}
                    </p>

                    <section className="forecast-weather">
            <span>
              {day.temp.day}
            </span>
                        <span className="weather-description">
               {day.weather[0].description}
            </span>
                    </section>
                </article>

            )

        })}


    </div>
  );
};

export default ForecastTab;
