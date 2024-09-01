import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from 'lucide-react'

export default function Preview({ interfaceData, menuItems }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/10 backdrop-blur-md border border-white/30 shadow-xl overflow-hidden">
          <CardHeader className="border-b border-white/20 pb-6">
            <CardTitle className="text-3xl font-bold text-white mb-2">{interfaceData.name}</CardTitle>
            <p className="text-white/80 italic">{interfaceData.headline}</p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex justify-center mb-8">
              <img src={interfaceData.logo} alt="Restaurant Logo" className="max-w-xs rounded-lg shadow-lg" />
            </div>
           
            <h2 className="text-2xl font-bold mb-6 text-white text-center">Our Menu</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {['Food', 'Drinks', 'Beverages'].map(category => (
                <div key={category} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 shadow-inner">
                  <h3 className="text-xl font-semibold mb-4 text-white border-b border-white/20 pb-2">{category}</h3>
                  {menuItems.filter(item => item.category === category).map((item, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-medium text-white">{item.name}</h4>
                        <span className="text-sm font-bold text-yellow-300">${item.price}</span>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}