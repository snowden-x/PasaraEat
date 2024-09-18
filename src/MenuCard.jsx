import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Utensils } from 'lucide-react'
import { Add01Icon, Settings01Icon } from 'hugeicons-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import CustomizeOrder from './CustomizeOrder'
import { useMenu } from './MenuProvider'

const MenuCard = ({ item }) => {
    const { name, description, image, price, category } = item
    const { addToCart } = useMenu()
    const [isSheetOpen, setIsSheetOpen] = useState(false)

    const handleAddToCart = () => {
        addToCart(item)
    }

    const handleSheetOpenChange = (open) => {
        setIsSheetOpen(open)
    }

    const handleCustomizeAddToCart = (customizedItem) => {
        addToCart(customizedItem)
        setIsSheetOpen(false)
    }

    return (
        <div className="group border rounded-xl shadow-lg overflow-hidden bg-white flex flex-col h-full">
            <div className="relative w-full aspect-video overflow-hidden">
                {image ? (
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover rounded-bl-2xl transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                        <Utensils className="w-12 h-12 text-white" />
                    </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-2 text-white bg-black bg-opacity-60 transform translate-y-full group-hover:translate-y-0 transition-all duration-300">
                    <p className="text-xs font-medium mb-1 flex items-center">
                        <Utensils className="w-3 h-3 mr-1 text-white" />
                        <span className="capitalize font-mono">{category}</span>
                    </p>
                </div>
            </div>
            <div className="p-3 bg-white flex-grow flex flex-col">
                <h4 className="font-medium text-gray-900 mb-2 text-sm w-full">
                    <span className="capitalize hover:text-gray-600 transition-colors text-center duration-300 block w-full overflow-hidden whitespace-nowrap text-ellipsis leading-normal tracking-tight">
                        {name}
                    </span>
                </h4>
                {description && (
                    <p className="text-xs text-gray-600 text-ellipsis whitespace-nowrap overflow-hidden leading-relaxed tracking-wide">
                        {description}
                    </p>
                )}
                <div className="mt-auto">
                    <span className="text-xs my-2 text-gray-500 text-center">Starting @ <span className="text-primary/90"> GHS {price}</span></span>
                </div>
            </div>
            <div className="px-1 py-1 bg-gray-50 flex justify-between items-center border-t">
                <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" className="border-none rounded-full p-3 m-1">
                            <Settings01Icon className="w-4 h-4" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="top">
                        <SheetHeader>
                            <SheetTitle>Customize Order</SheetTitle>
                        </SheetHeader>
                        <CustomizeOrder item={item} addToCart={handleCustomizeAddToCart} onClose={() => setIsSheetOpen(false)}/>
                    </SheetContent>
                </Sheet>
                <Button variant="ghost" className="border-none rounded-full p-3 m-1" onClick={handleAddToCart}>
                    <Add01Icon className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}

export default MenuCard