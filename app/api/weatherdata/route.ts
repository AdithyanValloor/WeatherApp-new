import { NextResponse } from "next/server"

const DEFAULT_COORDS = {
  lat: "9.9312", // Kochi latitude
  lon: "76.2673" // Kochi longitude
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  let lat = searchParams.get("lat")
  let lon = searchParams.get("lon")
  const apiKey = process.env.API_OPEN_WEATHER

  // if (!lat || !lon) return NextResponse.json({ error: "Missing lat/lon" }, { status: 400 })

  if (!lat || !lon) {
    lat = DEFAULT_COORDS.lat
    lon = DEFAULT_COORDS.lon
  }

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
  );

  const airQualityRes = await fetch(
    `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
  )

  const forecastRes = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
  )

  const weather = await res.json()
  const airQuality = await airQualityRes.json()
  const forecast = await forecastRes.json()
  
  const data = {
    ...weather,
    ...forecast,
    airQuality
  }

  return NextResponse.json(data)
}
  