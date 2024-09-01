import React, { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2 } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AddItemDialog from './AddItemDialog'
import EditItemDialog from './EditItemDialog'

export default function EditItems({ menuItems, setMenuItems }) {
  const [editingItem, setEditingItem] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(menuItems.map(item => item.category))]
    return cats.sort()
  }, [menuItems])

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return menuItems
    return menuItems.filter(item => item.category === selectedCategory)
  }, [menuItems, selectedCategory])

  const handleEdit = (item) => {
    setEditingItem(item)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (itemToDelete) => {
    setMenuItems(menuItems.filter(item => item !== itemToDelete))
  }

  const handleUpdate = (updatedItem) => {
    setMenuItems(menuItems.map(item => item === editingItem ? updatedItem : item))
  }

  const handleAdd = (newItem) => {
    setMenuItems([...menuItems, newItem])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Menu Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <AddItemDialog addItem={handleAdd} />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
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
            {filteredItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>
                  <Button variant="ghost" onClick={() => handleEdit(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" onClick={() => handleDelete(item)}>
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
            updateItem={handleUpdate}
            open={isEditDialogOpen}
            setOpen={setIsEditDialogOpen}
          />
        )}
      </CardContent>
    </Card>
  )
}