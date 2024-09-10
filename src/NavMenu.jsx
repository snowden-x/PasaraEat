import React, { useState} from 'react'

export default function MobileNavMenu() {
  const [activeCategory, setActiveCategory] = useState('Food')

  const categories = [
    'Food',
    'Continental',
    'Beverages',
    'Wine',
    'Soft Drinks',
    'Desserts',
    'Snacks'
  ]

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName)
    console.log(categoryName)
  }


  return (
    <div className="relative w-auto my-6 rounded-xl px-4 py-2 bg-transparent">
      <div
        className="flex overflow-x-auto space-x-4 hide-scrollbar"
      >
        {categories.map((name) => (
          <button
            key={name}
            className={`
              flex-shrink-0 px-4 py-2 text-sm rounded-full transition-colors duration-200 ease-in-out
              ${
                activeCategory === name
                  ? 'bg-primary text-primary-foreground font-semibold'
                  : 'bg-gray-50 text-gray-600 font-medium hover:bg-gray-200'
              }
            `}
            onClick={() => handleCategoryClick(name)}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  )
}
