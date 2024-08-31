import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from 'lucide-react'

export default function Preview({ interfaceData, menuItems }) {
  return (
    <div className="container mx-auto p-4">

      <Card>
        <CardHeader>
          <CardTitle>{interfaceData.name}</CardTitle>
          <p>{interfaceData.headline}</p>
        </CardHeader>
        <CardContent>
          <img src={interfaceData.logo} alt="Restaurant Logo" className="max-w-xs mb-4" />
          
          <h2 className="text-2xl font-bold mb-4">Menu</h2>
          {['Food', 'Drinks', 'Beverages'].map(category => (
            <div key={category} className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{category}</h3>
              {menuItems.filter(item => item.category === category).map((item, index) => (
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