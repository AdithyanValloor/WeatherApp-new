"use client";
import ForecastTile from "./ForecastTile";
import GetImage from "./GetImage";

function MainLeft({weatherData}:{weatherData: any}) {

  if (!weatherData) {
    return <div className="flex justify-center items-center">Loading...</div>
  }

  return (
    <div className="w-full h-full lg:px-5 rounded-2xl flex flex-col ">
      <div className="flex flex-col pt-5 h-3/5 justify-center items-center">
        <div>
          <div>
            <div>
              <h1 className="text-3xl top-0">{weatherData.city}</h1>
              <p className="text-[12px] text-gray-600">{weatherData.state}, {weatherData.country}</p>
              <p></p>
            </div>
            <p>{weatherData.dateAndTime}</p>
          </div>
          <div className="flex mt-5 justify-center ">
            <div className="flex flex-col">
              <div>
                <GetImage weather={`${weatherData.description}`}/>
              </div>
            </div>
            <div className="space-y-1 flex flex-col justify-center">
              <h1 className="text-6xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">{weatherData.temp}°c</h1>
              <p className="text-sm sm:text-base md:text-lg ">{weatherData.tempMin}°c / {weatherData.tempMax}°c</p>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl">{weatherData.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-2/5 mb-5 md:m-auto">
        <div className="flex flex-col w-full h-full">
          <p className="py-2 text-sm">Next 5 days</p>
          <div className="w-full h-full flex gap-1 md:gap-3  pb-5 lg:pb-0 overflow-x-auto sm:overflow-visible">
            {weatherData.forecast.map((i:any, key:any) => (                            
              <div key={key} className="flex-1 min-w-25 flex-shrink-0 w-25 md:w-25">
                <ForecastTile forecastData={i}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLeft;
