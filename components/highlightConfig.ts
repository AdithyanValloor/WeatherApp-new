export const highlightsConfig = (weather: any) => [
  {
    title: "Feels Like",
    data: weather.feelsLike,
    unit: "°C",
    imageSRC: "/svg/thermometer.svg",
  },
  {
    title: "Humidity",
    data: weather.humidity,
    unit: "%",
    imageSRC: "/svg/humidity.svg",
  },
  {
    title: "Pressure",
    data: weather.pressure,
    unit: "hPa",
    imageSRC: "/svg/barometer.svg",
  },
  {
    title: "Wind Speed",
    data: weather.windSpeed,
    unit: "km/h",
    imageSRC: "/svg/windsock.svg",
  },
  {
    title: "Visbility",
    data: weather.visibility,
    unit: "km",
    imageSRC: "/svg/view.svg",
  },
  {
    title: "Sunrise and Sunset",
    data:{ 
        sunrise: new Date(weather.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        sunset: new Date(weather.sunset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
    imageSRC:{ 
        sunrise: "/svg/sunrise.svg",
        sunset: "/svg/sunset.svg",
    }
  },
  {
    title: "Air Quality",
    data: {
      co: weather.airQuality.co,
      o3: weather.airQuality.o3,
      pm2_5: weather.airQuality.pm2_5,
      pm10: weather.airQuality.pm10,
      so2: weather.airQuality.so2,
    },
    unit: {
      co: "Co",
      o3: "O3",
      pm2_5: "Pm2.5",
      pm10: "Pm10",
      so2: "So2",
    },
    imageSRC: "/svg/wind.svg",
  },

]
