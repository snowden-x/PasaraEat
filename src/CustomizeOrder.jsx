import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useMenu } from './MenuProvider'

const CustomizeOrder = ({ item, onClose }) => {
    const { addToCart } = useMenu()
    const [quantity, setQuantity] = useState(1)
    const [selectedSize, setSelectedSize] = useState(item.defaultOptions.size)
    const [selectedProtein, setSelectedProtein] = useState(item.defaultOptions.protein)
    const [selectedSides, setSelectedSides] = useState(item.defaultOptions.sides)
    const [selectedAddons, setSelectedAddons] = useState(item.defaultOptions.addons)
    const [specialInstructions, setSpecialInstructions] = useState('')

    const handleSideChange = (side) => {
        setSelectedSides(prev => 
            prev.includes(side) ? prev.filter(s => s !== side) : [...prev, side]
        )
    }

    const handleAddonChange = (addon) => {
        setSelectedAddons(prev => 
            prev.includes(addon) ? prev.filter(a => a !== addon) : [...prev, addon]
        )
    }

    const handleAddToCart = () => {
        const customizations = {
            quantity,
            size: selectedSize,
            protein: selectedProtein,
            sides: selectedSides,
            addons: selectedAddons,
            specialInstructions,
        }
        addToCart(item, customizations)
        onClose()
    }

    return (
        <div className="space-y-4 mt-4">
            <div>
            <Button onClick={handleAddToCart} className="w-full">
                Add to Cart
            </Button>
            </div>
            <div>
                <Label>Size</Label>
                <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                    {item.availableOptions.sizes.map((size) => (
                        <div key={size} className="flex items-center space-x-2">
                            <RadioGroupItem value={size} id={`size-${size}`} />
                            <Label htmlFor={`size-${size}`}>{size}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
            <div>
                <Label>Protein</Label>
                <RadioGroup value={selectedProtein} onValueChange={setSelectedProtein}>
                    {item.availableOptions.proteins.map((protein) => (
                        <div key={protein} className="flex items-center space-x-2">
                            <RadioGroupItem value={protein} id={`protein-${protein}`} />
                            <Label htmlFor={`protein-${protein}`}>{protein}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
            <div>
                <Label>Sides</Label>
                {item.availableOptions.sides.map((side) => (
                    <div key={side} className="flex items-center space-x-2">
                        <Checkbox 
                            id={`side-${side}`} 
                            checked={selectedSides.includes(side)}
                            onCheckedChange={() => handleSideChange(side)}
                        />
                        <Label htmlFor={`side-${side}`}>{side}</Label>
                    </div>
                ))}
            </div>
            <div>
                <Label>Add-ons</Label>
                {item.availableOptions.addons.map((addon) => (
                    <div key={addon} className="flex items-center space-x-2">
                        <Checkbox 
                            id={`addon-${addon}`} 
                            checked={selectedAddons.includes(addon)}
                            onCheckedChange={() => handleAddonChange(addon)}
                        />
                        <Label htmlFor={`addon-${addon}`}>{addon}</Label>
                    </div>
                ))}
            </div>
            <div>
                <Label htmlFor="specialInstructions">Special Instructions</Label>
                <Textarea
                    id="specialInstructions"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Any special requests?"
                />
            </div>
        </div>
    )
}

export default CustomizeOrder