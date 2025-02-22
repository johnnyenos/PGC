import { useQuery } from "@tanstack/react-query";
import PlayerCard from "@/components/player-card";
import Navbar from "@/components/layout/navbar";
import { Player } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function ThreePointPage() {
  const { data: players, isLoading } = useQuery<Player[]>({
    queryKey: ["/api/players/threepoint"],
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container py-8">
        <h1 className="text-4xl font-bold mb-8">3-Point Contest Participants</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(6).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-[200px]" />
            ))
          ) : (
            players?.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
