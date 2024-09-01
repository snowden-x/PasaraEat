import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import Sidepanel from './Sidepanel'
import InterfacesList from './InterfacesList'
import Preview from './Preview'

export default function Dashboard() {
    const [activeItem, setActiveItem] = useState('Home')
    const [interfaces, setInterfaces] = useState([
        {
            id: '1',
            name: 'My Restaurant',
            headline: 'Delicious food, great ambiance',
            logo: '/placeholder.svg',
            menuItems: [
                { id: '1', category: 'Food', name: 'Burger', description: 'Juicy beef patty with lettuce, tomato, and cheese', price: 10 },
                { id: '2', category: 'Food', name: 'Pizza', description: 'Pepperoni pizza with extra cheese', price: 12 },
                { id: '3', category: 'Drinks', name: 'Coke', description: 'Refreshing soda', price: 2 },
            ]
        },
        {
            id: '2',
            name: 'My Restaurant 2',
            headline: 'Jams and Jellies',
            logo: '/placeholder.svg',
            menuItems: [
                { id: '4', category: 'Food', name: 'Strawberry Jam', description: 'Sweet and tangy strawberry jam', price: 5 },
                { id: '5', category: 'Food', name: 'Grape Jelly', description: 'Smooth grape jelly', price: 4 },
                { id: '6', category: 'Drinks', name: 'Fruit Smoothie', description: 'Mixed fruit smoothie', price: 6 },
            ]
        }
    ])
    const [selectedInterface, setSelectedInterface] = useState(interfaces[0])

    const updateInterface = (updatedInterface) => {
        setInterfaces(interfaces.map(item =>
            item.id === updatedInterface.id ? updatedInterface : item
        ))
        if (selectedInterface.id === updatedInterface.id) {
            setSelectedInterface(updatedInterface)
        }
    }

    const addMenuItem = (interfaceId, newItem) => {
        const updatedInterfaces = interfaces.map(item => {
            if (item.id === interfaceId) {
                return {
                    ...item,
                    menuItems: [...item.menuItems, { ...newItem, id: Date.now().toString() }]
                }
            }
            return item
        })
        setInterfaces(updatedInterfaces)
        if (selectedInterface.id === interfaceId) {
            setSelectedInterface(updatedInterfaces.find(item => item.id === interfaceId))
        }
    }

    const updateMenuItem = (interfaceId, updatedItem) => {
        const updatedInterfaces = interfaces.map(item => {
            if (item.id === interfaceId) {
                return {
                    ...item,
                    menuItems: item.menuItems.map(menuItem =>
                        menuItem.id === updatedItem.id ? updatedItem : menuItem
                    )
                }
            }
            return item
        })
        setInterfaces(updatedInterfaces)
        if (selectedInterface.id === interfaceId) {
            setSelectedInterface(updatedInterfaces.find(item => item.id === interfaceId))
        }
    }

    const deleteMenuItem = (interfaceId, itemId) => {
        const updatedInterfaces = interfaces.map(item => {
            if (item.id === interfaceId) {
                return {
                    ...item,
                    menuItems: item.menuItems.filter(menuItem => menuItem.id !== itemId)
                }
            }
            return item
        })
        setInterfaces(updatedInterfaces)
        if (selectedInterface.id === interfaceId) {
            setSelectedInterface(updatedInterfaces.find(item => item.id === interfaceId))
        }
    }

    return (
        <div className="flex h-screen">
            <Sidepanel activeItem={activeItem} setActiveItem={setActiveItem} />
            <div className="flex-1 flex overflow-hidden">
                <main className="flex-1 overflow-y-auto p-4">
                    {activeItem === 'Home' && <h1 className="text-2xl font-bold">Welcome to Restaurant Admin</h1>}
                    {activeItem === 'Interfaces' && (
                        <InterfacesList
                            interfaces={interfaces}
                            setInterfaces={setInterfaces}
                            selectedInterface={selectedInterface}
                            setSelectedInterface={setSelectedInterface}
                            updateInterface={updateInterface}
                            addMenuItem={addMenuItem}
                            updateMenuItem={updateMenuItem}
                            deleteMenuItem={deleteMenuItem}
                        />
                    )}
                </main>
                <aside className="w-[350px] overflow-y-auto border-l">
                    <Preview interfaceData={selectedInterface} menuItems={selectedInterface.menuItems} />
                </aside>
            </div>
        </div>
    )
}