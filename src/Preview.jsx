import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from 'lucide-react'

export default function Preview() {
  const array_to_be_changed = [
    { id: '0', category: 'Food', name: 'Burger', description: 'Juicy beef patty with lettuce, tomato, and cheese', price: 10 },
    { id: '1', category: 'Food', name: 'Pizza', description: 'Pepperoni pizza with extra cheese', price: 12 },
    { id: '2', category: 'Drinks', name: 'Coke', description: 'Refreshing soda', price: 2 },
]
  return (
    <div className="container mx-auto p-4">

      <Card>
        <CardHeader>
          <CardTitle>Mensah</CardTitle>
          <p>Attipoe</p>
        </CardHeader>
        <CardContent>
          <img src='' alt="Restaurant Logo" className="max-w-xs mb-4" />
          
          <h2 className="text-2xl font-bold mb-4">Menu</h2>
          {['Food', 'Drinks', 'Beverages'].map(category => (
            <div key={category} className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{category}</h3>
              {array_to_be_changed.filter(item => item.category === category).map((item, index) => (
                <div key={index} className="mb-2">
                  <h4 className="font-medium">{item.name} - ${item.price}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}