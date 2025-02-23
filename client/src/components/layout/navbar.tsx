import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Medal } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/">
                <Button variant="ghost" className="flex items-center gap-2">
                  <Medal className="h-5 w-5 text-[#E31B23]" />
                  <span className="font-bold">Pure Game Classic</span>
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/players">
                <Button variant="ghost">Players</Button>
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