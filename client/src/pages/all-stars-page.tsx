import { useQuery } from "@tanstack/react-query";
import PlayerCard from "@/components/player-card";
import Navbar from "@/components/layout/navbar";
import { Player } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AllStarsPage() {
  const { data: players, isLoading } = useQuery<Player[]>({
    queryKey: ["/api/players/allstar"],
  });

  const risingStars = players?.filter(p => p.team === 'rising') || [];
  const varsityStars = players?.filter(p => p.team === 'varsity') || [];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container py-8">
        <h1 className="text-4xl font-bold mb-8">All-Star Players</h1>

        <Tabs defaultValue="rising" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rising">Rising Stars</TabsTrigger>
            <TabsTrigger value="varsity">Varsity Stars</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rising">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {isLoading ? (
                Array(6).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-[200px]" />
                ))
              ) : (
                risingStars.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="varsity">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {isLoading ? (
                Array(6).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-[200px]" />
                ))
              ) : (
                varsityStars.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
