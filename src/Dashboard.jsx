import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import Sidepanel from './Sidepanel'
import Preview from './Preview'
import { Home,LayoutGrid} from "lucide-react"
import CustomizeSite from './CustomizeSite'

export default function Dashboard() {
    
   
    //Add more items to this array to add more items to the SideBar Menu using the format below
    const SideBarItems = [
    { name: "Home", icon: Home, content:(<h1 className="text-2xl font-bold">Welcome to Restaurant Admin</h1>)},
    { name: "Customize Site", icon: LayoutGrid, content:(<CustomizeSite/>)},
  ]
  
    //set default page to first item in SideBarItems
    const [activeItem, setActiveItem] = useState(SideBarItems[0]['name'])

        return (
            <div className="flex h-screen">
                {/**Creates design of the sidebar Menu*/}
                <Sidepanel SideBarItems={SideBarItems} activeItem={activeItem} setActiveItem={setActiveItem} />
                    <div className="flex-1 flex overflow-hidden">
                        <main className="flex-1 overflow-y-auto p-4">
                            {/**Content of current sideBar items */}
                            {SideBarItems.map((item)=>(activeItem === item.name && item.content))}
                        </main>
<<<<<<< HEAD
                        <aside className="w-96 overflow-y-auto">
=======
                        <aside className="w-80 overflow-y-auto border-l">
                            {/**Preview Page Content */}
>>>>>>> debc506d4b5635fe8b013d2cee7f26ad93b1ad24
                        <Preview/>
                        </aside>
                    </div>
            </div>
        )
}

