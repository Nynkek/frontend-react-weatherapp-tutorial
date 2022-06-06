import React, {useContext, useEffect, useState} from 'react';
import './ForecastTab.css';
import axios from "axios";
import kelvinToCelsius from "../../helpers/kelvinToCelsius";
import createDateString from "../../helpers/createDateString";
import {TempContext} from "../../context/TempContextProvider";




function ForecastTab({coordinates}) {
    const [forecasts, setForecasts] = useState([]);
    const { kelvinToMetric } = useContext(TempContext);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,current,hourly&appid=${process.env.REACT_APP_API_KEY}&lang=nl`)
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
              {kelvinToMetric(day.temp.day)}
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
