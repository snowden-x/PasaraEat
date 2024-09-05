import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import Sidepanel from './Sidepanel'
import Preview from './Preview'
import { Home, icons, LayoutGrid, LogOut } from "lucide-react"
import CustomizeSite from './CustomizeSite'

export default function Dashboard() {
    
   
    //Add more items to the array to add more items to the SideBar using the format below
    const SideBarItems = [
    { name: "Home", icon: Home, content:(<h1 className="text-2xl font-bold">Welcome to Restaurant Admin</h1>)},
    { name: "Customize Site", icon: LayoutGrid, content:(<CustomizeSite/>)}
  ]
  
    //set default page to first item in SideBarItems
    const [activeItem, setActiveItem] = useState(SideBarItems[0]['name'])

        return (
            <div className="flex h-screen">
                <Sidepanel  SideBarItems={SideBarItems} activeItem={activeItem} setActiveItem={setActiveItem} />
                    <div className="flex-1 flex overflow-hidden">
                        <main className="flex-1 overflow-y-auto p-4">
                            {SideBarItems.map((item)=>(activeItem === item.name && item.content))}
                        </main>
                        <aside className="w-80 overflow-y-auto border-l">
                        <Preview/>
                        </aside>
                    </div>
            </div>
        )
}