import React, {useContext, useEffect, useState} from 'react';
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import './App.css';
import axios from 'axios';
import ForecastTab from "./pages/forecastTab/ForecastTab";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import TodayTab from "./pages/todayTab/TodayTab";
import {TempContext} from "./context/TempContextProvider";


function App() {
    const [weatherData, setWeatherData] = useState({});
    const [location, setLocation] = useState('utrecht');
    const [error, setError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const { kelvinToMetric } = useContext(TempContext);


    useEffect(() => {
            async function fetchData() {
                setError(false);
                toggleLoading(true);
                try {
                    const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location},nl&appid=${process.env.REACT_APP_API_KEY}&lang=nl`)
                    setWeatherData(result.data);
                } catch (e) {
                    console.error(e);
                    setError(true);
                }
                toggleLoading(false);
            }

            if (location) {
                fetchData();
            }
        }, [location]
    );


    return (
        <>
            <div className="weather-container">

                {/*HEADER -------------------- */}
                <div className="weather-header">
                    <SearchBar setLocationHandler={setLocation}/>

                    <span className="location-details">
            {Object.keys(weatherData).length > 0 &&

                <>
                    <h2>{weatherData.weather[0].description}</h2>
                    <h3>{weatherData.name}</h3>
                    <h1>{kelvinToMetric(weatherData.main.temp)}</h1>
                </>
            }

          </span>
                </div>

                {/*CONTENT ------------------ */}
                <div className="weather-content">
                    <Router>

                        <TabBarMenu/>


                        <div className="tab-wrapper">

                            <Switch>
                                <Route path="/komende-week">
                                    <ForecastTab coordinates={weatherData && weatherData.coord}/>
                                </Route>
                                <Route path="/" exact>
                                    <TodayTab coordinates={weatherData && weatherData.coord}/>
                                </Route>
                            </Switch>

                        </div>
                    </Router>
                </div>

                <MetricSlider/>

            </div>
        </>
    )
        ;
}

export default App;
