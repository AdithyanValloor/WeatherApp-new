"use client"
import { motion } from "framer-motion"
import { Search, X } from "lucide-react"
import { useState, useRef } from "react"
import { formatWeather } from "./formatData"

type Suggestion = {
  city: string
  state?: string
  county?: string
  country: string
  formatted: string
  coordinates?: [number, number] 
}

type SuggestionsResponse = {
  features: {
    properties: Omit<Suggestion, "coordinates">
    geometry: {
      type: "Point"
      coordinates: [number, number]
    }
  }[]
}

export default function SearchSlide({
  isOpen,
  onToggle,
  onWeatherFetched,
  setLoadingWeather
}: {
  isOpen: boolean
  onToggle: () => void
  onWeatherFetched?: (data: any) => void 
  setLoadingWeather?: (data: boolean) => void
}) {
  const [text, setText] = useState("")
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  async function fetchSuggestions(query: string) {
    try {
      setLoading(true)
      const res = await fetch(`/api/suggestions?text=${query}`)
      const data: SuggestionsResponse = await res.json()

      let results: Suggestion[] = data.features.map((f) => ({
        ...f.properties,
        coordinates: f.geometry?.coordinates,
      }))

      results = results.filter((r) => r.city && r.city.trim() !== "")

      const unique = Array.from(
        new Map(
          results.map((r) => {
            const region =
              r.state?.toLowerCase() || r.county?.toLowerCase() || ""
            return [`${r.city.toLowerCase()}_${region}`, r]
          })
        ).values()
      )

      setSuggestions(unique)
    
    } catch (err) {
      console.error("Error fetching suggestions:", err)
    } finally {
      setLoading(false)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setText(value)

    if (!value.trim()) {
      setSuggestions([])
      return
    }

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      if (value.trim().length > 2) {
        fetchSuggestions(value.trim())
      }
    }, 300)
  }

async function handleSelect(s: Suggestion) {
  handleClose()
  if (s.coordinates) {
    const [lon, lat] = s.coordinates
    setLoadingWeather?.(true)
    try {
      const res = await fetch(`/api/weatherdata?lat=${lat}&lon=${lon}`)
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)

      const data = await res.json()

      const finalData = formatWeather({
        ...data,
        city: s.city,
        state: s.state,
        country: s.country,
        coordinates: { lat, lon },
      });

      onWeatherFetched?.(finalData) 
    } catch (err) {
      console.error("Weather fetch error:", err)
    }finally{
      setLoadingWeather?.(false)
    }
  }
}


  function handleClose() {
    setText("")
    setSuggestions([])
    onToggle()
  }

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
      className="fixed top-0 right-0 w-100 h-full px-5 bg-white shadow-md z-30"
    >
      <div>
        <button
          type="button"
          onClick={handleClose}
          className="p-3 cursor-pointer hover:rotate-180 transition-all rounded-full ease-in-out duration-300 absolute top-0 left-0 z-50"
        >
          <X strokeWidth={1} size={30} />
        </button>

        <div className="rounded-full mt-18 px-3 gap-3 flex py-2 shadow-md items-center overflow-hidden max-w-md mx-auto">
          <div className="h-full flex justify-center items-center">
            <Search strokeWidth={1} />
          </div>
          <input
            type="text"
            value={text}
            onChange={handleChange}
            placeholder="Search your city"
            className="w-full py-2 outline-none text-sm"
          />
        </div>

        <div className="w-full flex flex-col">
          <p className="text-center text-sm pt-3 font-light">Popular cities</p>

          <ul>
            {loading && (
              <li className="px-5 py-3 text-center mt-15 text-gray-500">
                Searching...
              </li>
            )}
            {!loading && suggestions.length === 0 && text.length > 2 && (
              <li className="px-5 py-3 text-center mt-15 text-gray-500">
                No results found
              </li>
            )}
            {suggestions.map((s, i) => (
              <li
                key={i}
                className="w-full hover:bg-gray-100 cursor-pointer px-5 py-5 md:py-3"
                onClick={() => handleSelect(s)}
              >
                <p>
                  {s.city}
                  <br />
                  <span className="text-[13px] text-gray-700">
                    {s.state || s.county}, {s.country}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}
