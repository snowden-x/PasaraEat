import { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2 } from 'lucide-react'
import AddItemDialog from './AddItemDialog'
import EditItemDialog from './EditItemDialog'
import axios from 'axios'


export default function EditItems() {
  const [editingItem, setEditingItem] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedCategory,setSelectedCategory] = useState('')
  const [categories,setCategories] = useState([])
  
  //array
  const [array_to_be_added, setarray_to_be_added]  = useState([])

  const handleEdit = (item) => {
    setEditingItem(item)
    setIsEditDialogOpen(true)
  }

  const handleDelete = async(item,index) => {
    console.log(item)
      try {
        // Make the POST request
        const result = await axios.post('http://192.168.56.1:8000/backend1/editables/',{
          'index':index,
          'selectedCategory': selectedCategory
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

 useEffect(() => {
    const sendPostRequest = async () => {
      if (selectedCategory === '') {
        //pass
      }
      else{
        try {
          // Make the POST request
          const result = await axios.post('http://192.168.56.1:8000/backend1/send_food_items/', selectedCategory, {
              headers: {
                  'Content-Type': 'application/json',
              },
          });
    
          // Process the response
          console.log(result.data);
          setarray_to_be_added(result.data)
      } catch (error) {
          console.error('There was an error!', error);
      }
      } 
    };

    sendPostRequest();
  
}, [selectedCategory]);


  useEffect(() => {
    console.log('use me')
    axios.get('http://192.168.56.1:8000/backend1/send_food_items/')
      .then(response => {
        // Handle successful response
        console.log(response.data)
        console.log('Frog');
        setCategories(response.data);
      })
      .catch(err => {
        // Handle Error
        console.log('Failure')
        console.log(err);
      });
  }, []);

 

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Menu Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className = "flex justify-between mb-4">
          <AddItemDialog/>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories && categories.map((category,index) => (
                  <SelectItem key={category} value={index}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {array_to_be_added.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.Name}</TableCell>
                <TableCell>{item.Description}</TableCell>
                <TableCell>Ghc{item.Price}</TableCell>
                <TableCell>
                  <Button variant="ghost" onClick={() => handleEdit(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" onClick={() => {handleDelete(item,index)}}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {editingItem && (
          <EditItemDialog 
            item={editingItem} 
            open={isEditDialogOpen} 
            setOpen={setIsEditDialogOpen}
          />
        )}
      </CardContent>
    </Card>
  )
}