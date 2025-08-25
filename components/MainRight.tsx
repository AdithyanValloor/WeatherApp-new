"use client"
import { highlightsConfig } from "./highlightConfig"
import SubTile from "./SubTile"

function MainRight({ weatherData }: { weatherData: any }) {
  if (!weatherData) return null

  const tiles = highlightsConfig(weatherData)

  return (
    <div className="w-full h-full lg:px-5 rounded-2xl flex flex-col">
      <p className="py-2 text-sm">Today&apos;s Highlights</p>
      <div className="w-full h-full grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-5">
        {tiles.map((tile, i) => (
          <div
            key={i}
            className={
              tile.title === "Air Quality"
                ? "col-span-2 md:col-span-3" 
                : ""
            }
          >

            <SubTile 
              title={tile.title}
              imageSRC={tile.imageSRC}
              data={tile.data}
              unit={tile.unit}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MainRight
