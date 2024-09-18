import React from 'react'
import { Button } from "@/components/ui/button"
import { Menu01Icon } from 'hugeicons-react'
import Cart from './Cart'

export default function Header() {
    const cartItems = [
        { id: 1, name: "Burger", price: 10, quantity: 2 },
        { id: 2, name: "Pizza", price: 12, quantity: 1 },
    ]

    return (
        <header className="bg-white shadow-sm top-0 z-30 sticky mt-2 mx-2 rounded-md p-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-xl">B</span>
                        </div>
                        <h1 className="text-2xl font-bold text-primary">Bell's Kitchen</h1>
                    </div>
                    <div className="flex-1 max-w-md mx-4">
                    
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button variant="outline" size="icon">
                            <Menu01Icon className="h-4 w-4" />
                        </Button>
                        <Cart cartItems={cartItems} />
                    </div>
                </div>
            </div>
        </header>
    )
}