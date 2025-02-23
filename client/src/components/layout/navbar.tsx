import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const NavLinks = () => (
    <>
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
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/">
          <Button variant="ghost" className="p-0">
            <img 
              src="/IMG_0099.png" 
              alt="Pure Game Classic Logo" 
              className="h-10 w-auto animate-spin-slow"
              style={{
                animation: 'spin 10s linear infinite'
              }}
            />
          </Button>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            <NavLinks />
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80vw] sm:w-[385px]">
            <div className="flex flex-col gap-4 py-4">
              <Link href="/three-point">
                <Button variant="ghost" className="w-full justify-start">3-Point Contest</Button>
              </Link>
              <Link href="/dunk-contest">
                <Button variant="ghost" className="w-full justify-start">Dunk Contest</Button>
              </Link>
              <Link href="/all-stars">
                <Button variant="ghost" className="w-full justify-start">All-Stars</Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}