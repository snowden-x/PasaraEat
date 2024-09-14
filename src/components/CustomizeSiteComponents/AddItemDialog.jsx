import { useState,useEffect} from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle } from 'lucide-react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

export default function AddItemDialog({categories,setarray_to_be_added}) {
    //wouldnt touch now..
    const [open, setOpen] = useState(false)
    const [category, setCategory] = useState('')
    const [customCategory, setCustomCategory] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [picture, setPicture] = useState('')
    const uniqueId = uuidv4();
    
    

    const handleCategoryChange = (value) => {
        setCategory(value)
        console.log("pree", value)
        console.log("Category changed")
    
        
        if (value !== 'custom') {
            setCustomCategory('')
        }
    }

    const ResetForm = () =>{
        setCategory('')
        setCustomCategory('')
        setName('')
        setDescription('')
        setPrice('')
        setPicture('')
    }

    //logic to submit code for changes.
    const handleSubmit = (e) => {

        //prevent default behaviours of browser 
        e.preventDefault()
        
        //Set dictionary that contains the current set of categories to be sent.
        const finalCategory = category === 'custom' ? customCategory : categories.indexOf(category)+ 1
        const newItem = {'name':name, 'image_url':picture, 'description': description, 'price':price,'id':uniqueId}

        //add logic to send newItem to backend using axios and webscokets.
        //console.log(newItem);
        const handleSend = async() => {
            try {
              // Make the POST request
              const result = await axios.post('http://192.168.56.1:8000/backend1/editables/',{
                'action': 'add_item',
                'content': {'selectedCategory':finalCategory,'addItem':newItem}
              }, {
                  headers: {
                      'Content-Type': 'application/json',
                  },
              });
        
              // Process the response
              console.log('pig')
              console.log(result.data);
              console.log('Added Successfully',result.data['selectedCategory'])
              //handleCategoryChange(result.data['selectedCategory'])
          } catch (error) {
              console.error('There was an error!', error);
          };
        }
        
        //Still dont know what this does
        setOpen(false)

        handleSend();
        // Reset form fields
        ResetForm()
       
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Item
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Menu Item</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="category">Category</Label>
                        <Select value={category} onValueChange={handleCategoryChange} required>
                            <SelectTrigger>
                                <SelectValue placeholder={"Select a Category"} />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((item,index)=>(
                                    <SelectItem value={item}>{item}</SelectItem>
                                ))}
                                <SelectItem value='custom'>Custom</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {category === 'custom' && (
                        <div>
                            <Label htmlFor="customCategory">Custom Category</Label>
                            <Input
                                id="customCategory"
                                value={customCategory}
                                onChange={(e) => setCustomCategory(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <div>
                        <Label htmlFor="name">Item Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="price">Price</Label>
                        <Input id="price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="picture">Picture</Label>
                        <Input id="picture" type="file" onChange={(e) => setPicture(URL.createObjectURL(e.target.files[0]))} accept="image/*" />
                    </div>
                    <Button type="submit">Add Item</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}