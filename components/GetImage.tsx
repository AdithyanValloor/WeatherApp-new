import Image from "next/image"

const weatherIcons: Record<string, string> = {
  Clouds: "/svg/cloudy.svg",
  Haze: "/svg/haze.svg",
  Rain: "/svg/rain.svg",
  Smoke: "/svg/smoke.svg",
  Fog: "/svg/fog.svg",
  Dust: "/svg/dust.svg",
  Hail: "/svg/hail.svg",
  Drizzle: "/svg/drizzle.svg",
  Tornado: "/svg/tornado.svg",
  Snow: "/svg/snow.svg",
  Hurricane: "/svg/hurricane.svg",
  Sleet: "/svg/sleet.svg",
  Thunderstorm: "/svg/thunderstorms-rain.svg",
  Mist: "/svg/mist.svg",
  Clear: "/svg/clear-day.svg",
  
}

function GetImage({ weather }: { weather: string }) {
  const src = weatherIcons[weather] || "/svg/default.svg" 

  return (
    <Image 
      src={src} 
      width={150} 
      height={150} 
      alt={weather} 
    />
  )
}

export default GetImage
