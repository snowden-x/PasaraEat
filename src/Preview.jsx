import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartNoAxesGantt, Plus, ShoppingBag } from "lucide-react"
import NavMenu from './NavMenu'

export default function Preview() {
  const menuItems = [
    { id: '0', category: 'Food', name: 'Burger', description: 'Juicy beef patty', price: 10, image: '/placeholder.svg?height=80&width=80' },
    { id: '1', category: 'Food', name: 'Pizza', description: 'Pepperoni pizza', price: 12, image: '/placeholder.svg?height=80&width=80' },
    { id: '2', category: 'Drinks', name: 'Coke', description: 'Refreshing soda', price: 2, image: '/placeholder.svg?height=80&width=80' },
    { id: '3', category: 'Food', name: 'Salad', description: 'Mixed greens', price: 8, image: '/placeholder.svg?height=80&width=80' },
    { id: '4', category: 'Drinks', name: 'Lemonade', description: 'Fresh lemonade', price: 3, image: '/placeholder.svg?height=80&width=80' },
  ]

  return (
    <div className="min-h-screen">
      <Card className="shadow-none w-full m-2 border-none rounded-none max-w-lg mx-auto bg-white">
        <div className='flex justify-between items-center p-4 bg-primary/60 text-primary-foreground'>
          <ChartNoAxesGantt className="rounded-full p-1" size={28} />
          <div className="flex items-center space-x-2">
            <ShoppingBag size={24} />
          </div>
        </div>
        <CardHeader className="py-6 bg-primary/70 text-primary-foreground rounded-b-xl shadow-md">
          <CardTitle className="text-2xl font-bold">Mensah's Restaurant</CardTitle>
          <p className="text-sm opacity-80">Delicious Food & Drinks</p>
        </CardHeader>
        <NavMenu />
        <CardContent className="mt-6">
          <div className={`grid grid-cols-2 gap-4`}>
            {menuItems.map((item) => (
              <div key={item.id} className="bg-white shadow-md rounded-2xl p-3">
                <div className="flex flex-col items-center">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-full mb-3 shadow-lg" />
                  <h4 className="font-semibold text-center text-black">{item.name}</h4>
                  <p className="text-xs text-gray-600 text-center mt-1">{item.description}</p>
                  <div className="flex justify-between items-center w-full mt-2">
                    <span className="font-bold text-sm">${item.price.toFixed(2)}</span>
                    <button className="bg-gray-300 text-white p-1 rounded-full flex items-center justify-center">
                      <Plus className="stroke-[3]" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
