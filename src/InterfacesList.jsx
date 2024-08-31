import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from 'lucide-react'
import AddInterfaceDialog from './components/AddInterface'
import EditInterfaceDialog from './components/EditInterface'
import InterfacesTable from './components/InterfaceTable'
import EditItems from './components/EditItems'

export default function InterfacesList({
    interfaces,
    setInterfaces,
    selectedInterface,
    setSelectedInterface,
    updateInterface,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem
}) {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [editingInterface, setEditingInterface] = useState(null)
    const [showMenuItems, setShowMenuItems] = useState(false)

    const handleAdd = (newInterface) => {
        const id = Date.now().toString()
        updateInterface({ ...newInterface, id })
        setIsAddDialogOpen(false)
    }

    const handleEdit = (interfaceItem) => {
        setEditingInterface(interfaceItem)
        setIsEditDialogOpen(true)
    }

    const handleUpdate = (updatedInterface) => {
        updateInterface(updatedInterface)
        setIsEditDialogOpen(false)
    }

    const handleDelete = (interfaceToDelete) => {
        setInterfaces(interfaces.filter(item => item.id !== interfaceToDelete.id))
        if (selectedInterface.id === interfaceToDelete.id) {
            setSelectedInterface(null)
        }
    }

    const handleInterfaceClick = (interfaceItem) => {
        setSelectedInterface(interfaceItem)
        setShowMenuItems(true)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    Interfaces
                    <Button onClick={() => setIsAddDialogOpen(true)}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Interface
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {!showMenuItems ? (
                    <InterfacesTable
                        interfaces={interfaces}
                        onInterfaceClick={handleInterfaceClick}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ) : (
                    <>
                        <Button onClick={() => setShowMenuItems(false)} className="mb-4">Back to Interfaces</Button>
                        <EditItems
                            menuItems={selectedInterface?.menuItems || []}
                            addMenuItem={addMenuItem}
                            updateMenuItem={updateMenuItem}
                            deleteMenuItem={deleteMenuItem}
                        />
                    </>
                )}

                <AddInterfaceDialog
                    isOpen={isAddDialogOpen}
                    onClose={() => setIsAddDialogOpen(false)}
                    onAdd={handleAdd}
                />

                <EditInterfaceDialog
                    isOpen={isEditDialogOpen}
                    onClose={() => setIsEditDialogOpen(false)}
                    onUpdate={handleUpdate}
                    interfaceToEdit={editingInterface}
                />
            </CardContent>
        </Card>
    )
}
