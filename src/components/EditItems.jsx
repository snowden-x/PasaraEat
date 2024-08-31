import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2 } from 'lucide-react'
import AddItemDialog from './AddItemDialog'
import EditItemDialog from './EditItemDialog'

export default function EditItems({ menuItems, setMenuItems }) {
  const [editingItem, setEditingItem] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

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
        <AddItemDialog addItem={handleAdd} />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {menuItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.category}</TableCell>
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