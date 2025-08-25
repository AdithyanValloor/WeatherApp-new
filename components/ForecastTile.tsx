import GetImage from "./GetImage";

type forecastData = {
  date: string,
  minTemp: number,
  maxTemp: number,
  mainWeather: string
}

function ForecastTile({forecastData}:{forecastData:forecastData}) {
  return (
    <div className={`w-full h-full shadow-md hover:shadow-lg mb-2 md:my-0 ${forecastData.date === "Today" && "border-2 border-gray-400" } bg-white rounded-2xl`}>
        <div className="flex flex-col p-4 md:p-5 justify-between items-center w-full h-full">
            <h1 className="text-sm">{forecastData.date} </h1>
            <GetImage weather={`${forecastData.mainWeather}`}/>
            <p className="text-sm">{forecastData.minTemp}° -  <span className="text-gray-500">{forecastData.maxTemp}°</span></p>
        </div>
    </div>
  )
}

export default ForecastTile
