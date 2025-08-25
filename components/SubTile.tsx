import Image from "next/image"

type AirQualityData = {
  co: number
  no2: number
  o3: number
  pm2_5: number
  pm10: number
  so2: number
  aqi: number
}

type SubTileProps =
  | {
      title: "Sunrise and Sunset"
      imageSRC: { sunrise: string; sunset: string }
      data: { sunrise: string | number; sunset: string | number }
      unit?: string
    }
  | {
      title: Exclude<string, "Sunrise and Sunset">
      imageSRC: string
      data: number | string
      unit?: string
    }
  |
    {
      title: "Air Quality"
      imageSRC: string
      data: AirQualityData
      unit?: Record<keyof AirQualityData, string>
    }
  

function subTile(props: SubTileProps) {
  
  if (props.title === "Sunrise and Sunset") {
    
    return(
      <div className="bg-white shadow-md hover:shadow-lg flex p-4 md:p-5 h-full rounded-2xl">
          <div className="flex flex-col w-full h-full">
            <h1 className="text-gray-500 text-[11px] md:text-[12px]">{props.title}</h1>
            <div className="flex flex-col justify-center h-full">
              <div className="flex border-b border-gray-200 items-center gap-2 md:flex-row">
                <Image 
                    src={props.imageSRC.sunrise}
                    width={100} 
                    height={100} 
                    alt="sunrise icon"
                    className="w-6 md:w-9"
                />
                <p className="text-[12px] md:text-lg">{props.data.sunrise}</p>
              </div>
              <div className="flex items-center gap-2 md:flex-row">
                <Image 
                    src={props.imageSRC.sunset}
                    width={100} 
                    height={100} 
                    alt="sunset icon" 
                    className="w-6 md:w-9"
                />
                <p className="text-[12px] md:text-lg">{props.data.sunset}</p>
              </div>
            </div>
          </div>
        </div>
    )
  }

  if (props.title === "Air Quality") {
  return (
    <div className="bg-white shadow-md hover:shadow-lg flex p-4 md:p-5 h-full rounded-2xl">
      <div className="flex flex-col w-full h-full">
        <h1 className="text-gray-500 text-[11px]">{props.title}</h1>
        <div className="flex h-full gap-2 items-center">
          <Image 
              src={props.imageSRC}
              width={100} 
              height={100} 
              alt="air icon" 
              className="w-11 md:w-13"
          />
          <div className="flex justify-between md:px-6 w-full">
            {Object.entries(props.data).map(([key, value]) => (
              <div key={key} className="flex flex-col items-center">
                <p className="text-[12px] md:text-lg text-gray-500 font-light">{props.unit?.[key as keyof typeof props.data]}</p>
                <p className="text-[15px] md:text-lg font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    )
  }

  return(
    <div className="bg-white shadow-md hover:shadow-lg flex p-4 md:p-5 h-full rounded-2xl">
      <div className="flex flex-col  w-full h-full">
        <h1 className="text-gray-500 text-[11px] md:text-[12px]">{props.title}</h1>
        <div className="flex items-center justify-between h-full">
          <p className="text-xl md:text-3xl">{props.data}<span className="text-sm md:text-lg font-light text-gray-500">{props.unit}</span></p>
          <Image 
              src={props.imageSRC}
              width={100} 
              height={100} 
              alt={`${props.title} icon`} 
              className={` ${props.title === "Visbility" ? "w-8 md:w-11 mr-2 opacity-20" : "w-11 md:w-17"}`}
          />
        </div>
      </div>
    </div>
  )

}

export default subTile
