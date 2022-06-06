import React, { createContext, useState } from 'react';
import kelvinToFahrenheit from "../helpers/kelvinToFahrenheit";
import kelvinToCelsius from "../helpers/kelvinToCelsius";

export const TempContext = createContext(null);

function TempContextProvider({ children }) {
    const [selectedMetric, toggleSelectedMetric] = useState('celcius');

    function toggleTemp() {
        if (selectedMetric === 'celcius') {
            toggleSelectedMetric('fahrenheit');
        } else {
            toggleSelectedMetric('celcius');
        }
    }

    return (
        <TempContext.Provider value={{
            toggleTemp: toggleTemp,
            kelvinToMetric: selectedMetric === 'celcius' ? kelvinToCelsius : kelvinToFahrenheit,
        }}>
            { children }
        </TempContext.Provider>
    )
}

export default TempContextProvider;