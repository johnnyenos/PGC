import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Player } from "@shared/schema";

export default function PlayerCard({ player }: { player: Player }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">{player.name}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">School</p>
          <p className="font-medium">{player.school}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Top Accolade</p>
          <p className="font-medium">{player.accolade}</p>
        </div>
        {player.team && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Team</p>
            <p className="font-medium">{player.team}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
