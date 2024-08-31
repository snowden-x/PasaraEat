import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AddInterfaceDialog({ isOpen, onClose, onAdd }) {
    const [newInterface, setNewInterface] = useState({ name: '', headline: '', logo: '' })

    const handleSubmit = (e) => {
        e.preventDefault()
        onAdd(newInterface)
        setNewInterface({ name: '', headline: '', logo: '' })
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Interface</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={newInterface.name}
                            onChange={(e) => setNewInterface({ ...newInterface, name: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="headline">Headline</Label>
                        <Input
                            id="headline"
                            value={newInterface.headline}
                            onChange={(e) => setNewInterface({ ...newInterface, headline: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="logo">Logo</Label>
                        <Input
                            id="logo"
                            type="file"
                            onChange={(e) => setNewInterface({ ...newInterface, logo: URL.createObjectURL(e.target.files[0]) })}
                            accept="image/*"
                        />
                    </div>
                    <Button type="submit">Add Interface</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}