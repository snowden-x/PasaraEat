import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function EditItemDialog({ item, updateItem, open, setOpen }) {
    const [editingItem, setEditingItem] = useState(item)
    const [customCategory, setCustomCategory] = useState('')
    const [isCustomCategory, setIsCustomCategory] = useState(false)

    useEffect(() => {
        setEditingItem(item)
        setIsCustomCategory(!['Food', 'Drinks', 'Beverages'].includes(item.category))
        setCustomCategory(isCustomCategory ? item.category : '')
    }, [item])

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedItem = {
            ...editingItem,
            category: isCustomCategory ? customCategory : editingItem.category
        }
        updateItem(updatedItem)
        setOpen(false)
    }

    const handleCategoryChange = (value) => {
        if (value === 'custom') {
            setIsCustomCategory(true)
            setEditingItem({ ...editingItem, category: '' })
        } else {
            setIsCustomCategory(false)
            setEditingItem({ ...editingItem, category: value })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Menu Item</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="category">Category</Label>
                        <Select 
                            value={isCustomCategory ? 'custom' : editingItem.category} 
                            onValueChange={handleCategoryChange}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Food">Food</SelectItem>
                                <SelectItem value="Drinks">Drinks</SelectItem>
                                <SelectItem value="Beverages">Beverages</SelectItem>
                                <SelectItem value="custom">Custom Category</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {isCustomCategory && (
                        <div>
                            <Label htmlFor="customCategory">Custom Category</Label>
                            <Input
                                id="customCategory"
                                value={customCategory}
                                onChange={(e) => setCustomCategory(e.target.value)}
                                placeholder="Enter custom category"
                                required
                            />
                        </div>
                    )}
                    <div>
                        <Label htmlFor="name">Item Name</Label>
                        <Input
                            id="name"
                            value={editingItem.name}
                            onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={editingItem.description}
                            onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="price">Price</Label>
                        <Input
                            id="price"
                            type="number"
                            step="0.01"
                            value={editingItem.price}
                            onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                            required
                        />
                    </div>
                    <Button type="submit">Save Changes</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}