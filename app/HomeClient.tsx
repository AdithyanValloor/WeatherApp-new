"use client"

import MainLeft from "@/components/MainLeft";
import MainRight from "@/components/MainRight";
import SearchButton from "@/components/SearchButton";
import SearchSlide from "@/components/SearchSlide";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HomeClient({initialData}:{initialData:any}) {
  
  const [isOpen, setIsOpen] = useState(false)
  const [weather, setWeather] = useState<any>(initialData)
  const [loadingWeather, setLoadingWeather] = useState(false)

  useEffect(() => {
    if (isOpen || loadingWeather) {
      document.body.style.overflow = "hidden"
      window.history.pushState({ searchOpen: true }, "");
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isOpen, loadingWeather])
  
  useEffect(() => {
    const handlePopState = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen]);


  // Map weather types to Tailwind gradient classes
  const getBackgroundGradient = () => {
    
    const main = weather?.description?.toLowerCase() || "";
    if (main.includes("rain")) return "from-blue-200 to-gray-700";
    if (main.includes("cloudy")) return "from-gray-400 to-gray-600";
    if (main.includes("snow")) return "from-blue-100 to-white";
    if (main.includes("sun") || main.includes("clear")) return "from-cyan-600 to-yellow-300";
    return "from-neutral-300 to-stone-800"; 
  }

  return (
    <div className="lg:h-svh flex flex-col justify-center items-center flex-1 w-full p-3 relative">
      {/* Dynamic background */}
      <motion.div
        key={weather?.description}
        initial={{ opacity: 0 }}
        animate={{ opacity: 2 }}
        transition={{ duration: 2 }}
        className={`absolute inset-0 -z-10 bg-gradient-to-r ${getBackgroundGradient()}`}
      />

      <div className="flex justify-center items-center w-full relative">
        <h1 id="title" className={`text-3xl text-center ${isOpen? "text-black" : "text-white"} transition-colors duration-500 ease-in-out md:text-white py-4`}>Weather Now</h1>
        <div className="absolute text-white right-10 z-50">
          <SearchButton onToggle={() => setIsOpen(prev => !prev)}/>
        </div>
      </div>

      {/* Loading overlay */}
      {loadingWeather && (
        <div className="absolute inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm  pointer-events-auto">
          <div className="w-16 h-16 border-4  border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div
        className={`w-full h-full shadow-xl/20 gap- md:gap-8 bg-gray-50 px-4 py-4 lg:py-8 flex flex-col lg:flex-row rounded-3xl transition-all duration-300 ${
          isOpen ? "blur-sm pointer-events-none overflow-hidden" : ""
        }`}
      >
        <MainLeft weatherData={weather}/>
        <MainRight weatherData={weather}/>
      </div>

      <SearchSlide 
        isOpen={isOpen} 
        onToggle={() => setIsOpen(false)} 
        setLoadingWeather={setLoadingWeather}
        onWeatherFetched={ async (data) => {
          setWeather(data); 
        }} 
      />
    </div>
  );
}
