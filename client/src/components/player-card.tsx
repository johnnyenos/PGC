import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Player, PlayerStats, SocialMedia } from "@shared/schema";
import { SiInstagram, SiFacebook, SiYoutube } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const StatDisplay = ({ label, value }: { label: string; value: number }) => (
  <div className="text-center">
    <p className="text-xl md:text-2xl font-bold">{value}</p>
    <p className="text-xs md:text-sm text-muted-foreground">{label}</p>
  </div>
);

const SocialMediaLinks = ({ social }: { social: SocialMedia }) => (
  <div className="flex gap-6 justify-center mt-4">
    {social.instagram && (
      <a 
        href={social.instagram} 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-2 hover:bg-accent rounded-full transition-colors"
      >
        <SiInstagram className="h-6 w-6 hover:text-[#E1306C]" />
      </a>
    )}
    {social.twitter && (
      <a 
        href={social.twitter} 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-2 hover:bg-accent rounded-full transition-colors"
      >
        <FaTwitter className="h-6 w-6 hover:text-[#1DA1F2]" />
      </a>
    )}
    {social.facebook && (
      <a 
        href={social.facebook} 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-2 hover:bg-accent rounded-full transition-colors"
      >
        <SiFacebook className="h-6 w-6 hover:text-[#4267B2]" />
      </a>
    )}
    {social.youtube && (
      <a 
        href={social.youtube} 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-2 hover:bg-accent rounded-full transition-colors"
      >
        <SiYoutube className="h-6 w-6 hover:text-[#FF0000]" />
      </a>
    )}
  </div>
);

export default function PlayerCard({ player }: { player: Player }) {
  const stats = player.stats as PlayerStats;
  const socialMedia = player.social_media as SocialMedia;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg md:text-xl flex items-center gap-2">
          {player.jersey_number && (
            <span className="text-sm bg-primary/10 px-2 py-1 rounded">
              #{player.jersey_number}
            </span>
          )}
          {player.name}
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          {player.position && `${player.position} • `}
          {player.height && `${player.height} • `}
          {player.weight && `${player.weight} lbs`}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">School</p>
          <p className="font-medium">{player.school}</p>
        </div>

        {stats && (
          <div className="grid grid-cols-4 gap-2 py-4 border-y">
            <StatDisplay 
              label="PPG" 
              value={stats.points_per_game} 
            />
            <StatDisplay 
              label="APG" 
              value={stats.assists_per_game} 
            />
            <StatDisplay 
              label="RPG" 
              value={stats.rebounds_per_game} 
            />
            <StatDisplay 
              label="FG%" 
              value={stats.field_goal_percentage} 
            />
          </div>
        )}

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

        {socialMedia && <SocialMediaLinks social={socialMedia} />}

        {player.highlight_video_url && (
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full py-6 text-lg"
              >
                Watch Highlights
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] w-[95vw]">
              <DialogHeader>
                <DialogTitle>{player.name} Highlights</DialogTitle>
              </DialogHeader>
              <AspectRatio ratio={16/9}>
                <iframe
                  src={player.highlight_video_url}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-md"
                />
              </AspectRatio>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
}