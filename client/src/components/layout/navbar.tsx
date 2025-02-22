import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Medal, LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logoutMutation } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/">
                <Button variant="ghost" className="flex items-center gap-2">
                  <Medal className="h-5 w-5" />
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
            <NavigationMenuItem>
              <Link href="/giveaway">
                <Button variant="ghost">Giveaway</Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-2">
          {user ? (
            <Button
              variant="ghost"
              onClick={() => logoutMutation.mutate()}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Link href="/auth">
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}