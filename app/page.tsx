import { formatWeather } from "@/components/formatData";
import HomeClient from "./HomeClient";

export default async function Home() {

  const lon= 76.2602
  const lat= 9.9399
  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/weatherdata?lat=${lat}&lon=${lon}`,
    { cache: "no-store" } 
  )

  const data = await res.json()
  
  console.log("DATA RES: ", data);
  

  const finalData = formatWeather({
    ...data,
    city: "Kochi",
    state: "Kerala",
    country: "India",
    coordinates: { lat, lon },
  })

  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

  return (
    <div>
      <HomeClient initialData={finalData}/>
    </div>
  );
}

