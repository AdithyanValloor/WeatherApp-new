"use client"

import { Search } from "lucide-react"

type SearchButtonProp = {
    onToggle: () => void
}

function SearchButton({onToggle}: SearchButtonProp) {
  return (
    <div className=" ">
        <button type="button" onClick={onToggle} className="cursor-pointer rounded-full p-2">
            <Search/>
        </button>
    </div>
  )
}

export default SearchButton
