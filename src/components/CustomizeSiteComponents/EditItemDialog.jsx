import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import axios from 'axios'

export default function EditItemDialog({ item,open,setOpen,category_array,selectedCategory,index_ ,setarray_to_be_added}) {
    const [editingItem, setEditingItem] = useState(item)
    const [customCategory, setCustomCategory] = useState('')
    const [isCustomCategory, setIsCustomCategory] = useState(false)

    useEffect(() => {
        setEditingItem(item)
        setIsCustomCategory(!Array.from(category_array.keys()).includes(selectedCategory - 1))
        setCustomCategory(isCustomCategory ? item.category : '')
        console.log('custom', isCustomCategory, 'Custom NAme:',customCategory)
        console.log(item)
        console.log('SelectedCategory:',  selectedCategory)
        console.log( 'Ctageoryarray:', Array.from(category_array.keys()))
    }, [item])

    const handleSubmit = (e) => {
        e.preventDefault()
        handleSend();
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

    const handleSend = async(item,index) => {
          try {
            // Make the POST request
            const result = await axios.post('http://192.168.56.1:8000/backend1/editables/',{
                'action':'edit_item',
                'content':{'index':index_, 'selectedCategory': selectedCategory, 'editedItem': editingItem}
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
      
            // Process the response
            console.log('pig')
            console.log(result.data);
            setarray_to_be_added(result.data)
        } catch (error) {
            console.error('There was an error!', error);
        };
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
                            value={isCustomCategory ? 'custom' : category_array[selectedCategory-1]} 
                            onValueChange={handleCategoryChange}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {category_array.map((item,index)=>(
                                    <SelectItem value={item}>{item}</SelectItem> 
                                ))}
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