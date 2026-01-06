"use client"

import { useAuth } from "@/context/AuthContext"




const LetterSizeSidebar = () => {
       const { decreaseFont, increaseFont} = useAuth();


  return (
    <div>
      
     <aside className="w-56 border-r px-4 py-6 flex flex-col gap-4">
      <button
        onClick={decreaseFont}
        className="flex items-center gap-2 text-sm hover:text-blue-600"
      >
        <span className="text-sm">Aa</span>
        <span>Smaller</span>
      </button>

      <button
        onClick={increaseFont}
        className="flex items-center gap-2 text-lg hover:text-blue-600"
      >
        <span className="text-lg">Aa</span>
        <span>Larger</span>
      </button>
    </aside>



    </div>
  )
}

export default LetterSizeSidebar
