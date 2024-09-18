import React, { useState } from 'react'
import { ScrollArea , ScrollBar} from './components/ui/scroll-area'

const categories = [
  { id: 'drinks', name: 'Drinks' },
  { id: 'beverages', name: 'Beverages' },
  { id: 'food', name: 'Food' },
  { id: 'sides', name: 'Sides' },
  { id: 'beer', name: 'Beer' },
  { id: 'wine', name: 'Wine' },
  { id: 'spirits', name: 'Spirits' },
  { id: 'non-alcoholic', name: 'Non-Alcoholic' },
]

export default function NavMenu() {
  const [activeCategory, setActiveCategory] = useState('drinks')

  return (
    <ScrollArea className="w-full p-4 my-4 sticky z-20 bg-white">
      <nav className="">
        <div className="flex space-x-4 min-w-max">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`cursor-pointer transition-all duration-300 ease-in-out px-2
                ${activeCategory === category.id
                  ? 'text-primary'
                  : 'text-gray-400'
                }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span
                className={`transition-all duration-300 ease-in-out whitespace-nowrap
                  ${activeCategory === category.id
                    ? 'text-xl font-semibold'
                    : 'text-sm font-normal'
                  }`}
                style={{
                  display: 'inline-block',
                  transform: `scale(${activeCategory === category.id ? 1.1 : 1})`,
                }}
              >
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </nav>
    <ScrollBar orientation="horizontal" className="hidden"/>
    </ScrollArea>
  )
}