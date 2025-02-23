import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/">
                <Button variant="ghost" className="p-0">
                  <img 
                    src="/IMG_2055.jpeg" 
                    alt="Pure Game Classic Logo" 
                    className="h-8 w-auto"
                  />
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/three-point">
                <Button variant="ghost">3-Point Contest</Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/dunk-contest">
                <Button variant="ghost">Dunk Contest</Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/all-stars">
                <Button variant="ghost">All-Stars</Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}