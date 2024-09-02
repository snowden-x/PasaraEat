import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {LogOut } from "lucide-react"

    

export default function Sidepanel({SideBarItems, activeItem, setActiveItem }) {


//function to loop SideBarItems and return a menu
function CreateSideBarMenu({ array_containing_sideBar_items, activeItem, setActiveItem }) {
  return (
    <>
      {array_containing_sideBar_items.map((sideBaritem) => (
        <Button
          key={sideBaritem.name}
          variant={activeItem === sideBaritem.name ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveItem(sideBaritem.name)}
        >
          <sideBaritem.icon className="mr-2 h-4 w-4" />
          {sideBaritem.name}
        </Button>
      ))}
    </>
  );
}
  
  return (
    <div className="flex h-screen w-64 flex-col bg-muted p-4">
      <div className="text-2xl font-bold mb-6">Restaurant Admin</div>
        <ScrollArea className="flex-1">
          <nav className="space-y-2">
              <CreateSideBarMenu array_containing_sideBar_items={SideBarItems} activeItem={activeItem} setActiveItem={setActiveItem}/>
          </nav>
        </ScrollArea>
      <Button variant="ghost" className="w-full justify-start mt-auto">
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  )
}