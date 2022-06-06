function kelvinToFahrenheit(kelvin) {
    return `${Math.round(1.8*(kelvin - 273.15) + 32)}° F`;
}



export default kelvinToFahrenheit;