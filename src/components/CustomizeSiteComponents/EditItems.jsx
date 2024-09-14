import { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2 } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import AddItemDialog from './AddItemDialog'
import EditItemDialog from './EditItemDialog'
import axios from 'axios'

export default function EditItems() {
  const [editingItem, setEditingItem] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [current_index_, setCurrent_index] = useState()
  const [array_to_be_added, setarray_to_be_added] = useState([])

  const handleEdit = (item, index) => {
    setEditingItem(item)
    setIsEditDialogOpen(true)
    setCurrent_index(index)
  }

  const handleDelete = async (item, index) => {
    console.log(item)
    try {
      const result = await axios.post('http://192.168.56.1:8000/backend1/editables/', {
        'action': 'delete_menu_content',
        'content': { 'index': index, 'selectedCategory': selectedCategory, 'item_id': item.id },
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('pig')
      console.log(result.data);
      setarray_to_be_added(result.data)
    } catch (error) {
      console.error('There was an error!', error);
    };
  }

 /* const handleAvailabilityToggle = async (item, index) => {
    try {
      const result = await axios.post('http://192.168.56.1:8000/backend1/editables/', {
        'action': 'toggle_item_availability',
        'content': { 'index': index, 'selectedCategory': selectedCategory, 'item_id': item.id },
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(result.data);
      setarray_to_be_added(result.data)
    } catch (error) {
      console.error('There was an error toggling availability!', error);
    }
  }*/

  useEffect(() => {
    const sendPostRequest = async () => {
      if (selectedCategory === '') {
        //pass
      } else {
        try {
          const result = await axios.post('http://192.168.56.1:8000/backend1/editables/', {
            'action': 'get_menu_contents',
            'content': { 'selectedCategory': selectedCategory }
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

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
    const getCategory = async () => {
      try {
        const result = await axios.post('http://192.168.56.1:8000/backend1/editables/', {
          'action': 'get_category',
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log(result.data)
        setCategories(result.data);
      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    getCategory();

  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Menu Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <AddItemDialog categories={categories} setarray_to_be_added={setarray_to_be_added} />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories && categories.map((category, index) => (
                <SelectItem key={category} value={index + 1}>
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
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>Ghc{item.price}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" onClick={() => handleEdit(item, index)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" onClick={() => handleDelete(item, index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Switch
                      checked={item.available}
                      onCheckedChange={() => handleAvailabilityToggle(item, index)}
                    />
                    <span className="text-sm">{item.available ? 'Available' : 'Unavailable'}</span>
                  </div>
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
            category_array={categories}
            selectedCategory={selectedCategory}
            index_={current_index_}
            array_to_be_added={array_to_be_added}
            setarray_to_be_added={setarray_to_be_added}
          />
        )}
      </CardContent>
    </Card>
  )
}