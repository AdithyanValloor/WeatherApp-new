function getDate(timezone: any){

  const date = new Date()
  const localTime = date.getTime()
  const localOffset = date.getTimezoneOffset() * 60000
  const utc = localTime + localOffset
  const currentTimeNow = utc + (1000 * timezone)
  const cityTime = new Date(currentTimeNow)

  // const timeIn24 = cityTime.getHours()
  
  const d = new Intl.DateTimeFormat('en-in',{
      dateStyle: 'full'
  })

  const t = new Intl.DateTimeFormat('en-in',{
      timeStyle:"short"
  })

  const formatedTime = t.format(cityTime)
  const formatedDate = d.format(cityTime)

  return `${formatedDate}, ${formatedTime}`

}


type ForecastItem = {
  dt: number;
  main: {
    temp_min: number;
    temp_max: number;
  };
  weather: { main: string; description: string }[];
  dt_txt: string;
};

type DailySummary = {
  date: string;
  minTemp: number;
  maxTemp: number;
  mainWeather: string;
};

function processForecast(data: ForecastItem[]): DailySummary[] {
  const grouped: Record<string, ForecastItem[]> = {};

  // group forecasts by date (YYYY-MM-DD)
  data.forEach((item) => {
    const date = item.dt_txt.split(" ")[0]; // "2025-08-22 12:00:00" → "2025-08-22"
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(item);
  });

  // get sorted dates
  const sortedDates = Object.keys(grouped).sort();

  const summaries: DailySummary[] = sortedDates.map((date, index) => {
    const items = grouped[date];

    const minTemp = Math.min(...items.map((i) => Math.round(i.main.temp_min - 273.15)));
    const maxTemp = Math.max(...items.map((i) => Math.round(i.main.temp_max - 273.15)));

    // Count weather occurrences for the day
    const weatherCount: Record<string, number> = {};
    items.forEach((i) => {
      const weather = i.weather[0].main;
      weatherCount[weather] = (weatherCount[weather] || 0) + 1;
    });

    // Pick the most frequent weather condition
    const mainWeather = Object.entries(weatherCount).reduce((a, b) =>
      a[1] >= b[1] ? a : b
    )[0];

    // Format date as Today, Tomorrow, or d/m
    const dateObj = new Date(date);
    let formattedDate: string;
    if (index === 0) formattedDate = "Today";
    else if (index === 1) formattedDate = "Tomorrow";
    else formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}`;

    return {
      date: formattedDate,
      minTemp,
      maxTemp,
      mainWeather,
    };
  });

  return summaries;
}


export function formatWeather(raw: any) {
    
    console.log("RAW : ", raw);

    const dateAndTime = getDate(raw.timezone)
    const forecast = processForecast(raw.list)

    console.log("FORCAST : ", forecast);
    
    

  if (!raw) return null;

  return {
    city: raw.city,
    state: raw.state,
    country: raw.country,
    coordinates: raw.coordinates,
    temp: Math.round(raw.main.temp - 273.15),
    tempMin: Math.round(raw.main.temp_min - 273.15),
    tempMax: Math.round(raw.main.temp_max - 273.15),
    feelsLike: Math.round(raw.main.feels_like - 273.15),
    humidity: raw.main.humidity,
    pressure: raw.main.pressure,
    description: raw.weather[0].main,
    windSpeed: raw.wind.speed,
    windDeg: raw.wind.deg,
    sunrise: raw.sys.sunrise,
    visibility: Math.round(raw.visibility/1000),
    sunset: raw.sys.sunset,
    dateAndTime,
    airQuality: {
      co: raw.airQuality.list[0].components.co,
      nh3: raw.airQuality.list[0].components.nh3,
      no: raw.airQuality.list[0].components.no,
      no2: raw.airQuality.list[0].components.no2,
      o3: raw.airQuality.list[0].components.o3,
      pm2_5: raw.airQuality.list[0].components.pm2_5,
      pm10: raw.airQuality.list[0].components.pm10,
      so2: raw.airQuality.list[0].components.so2,
      aqi:raw.airQuality.list[0].main.aqi
    },
    forecast
  };
}
