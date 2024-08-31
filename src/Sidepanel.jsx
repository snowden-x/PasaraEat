import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, LayoutGrid, LogOut } from "lucide-react"
import {Link} from "react-router-dom"

export default function Sidepanel({ activeItem, setActiveItem }) {
  const menuItems = [
    { name: "Home", icon: Home },
    { name: "Interfaces", icon: LayoutGrid },
  ]

  return (
    <div className="flex h-screen w-64 flex-col bg-muted p-4">
      <div className="text-2xl font-bold mb-6">Restaurant Admin</div>
      <ScrollArea className="flex-1">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.name}
              variant={activeItem === item.name ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveItem(item.name)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Button>
          ))}
        </nav>
      </ScrollArea>
      <Button variant="ghost" className="w-full justify-start mt-auto">
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  )
}