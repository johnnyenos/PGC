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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const StatDisplay = ({ label, value }: { label: string; value: number }) => (
  <div className="text-center">
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);

const DetailedStatDisplay = ({ stats }: { stats: PlayerStats }) => (
  <div className="w-[300px] space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <StatDisplay label="PPG" value={stats.points_per_game} />
      <StatDisplay label="APG" value={stats.assists_per_game} />
      <StatDisplay label="RPG" value={stats.rebounds_per_game} />
      <StatDisplay label="SPG" value={stats.steals_per_game} />
      <StatDisplay label="BPG" value={stats.blocks_per_game} />
      <StatDisplay label="FG%" value={stats.field_goal_percentage} />
    </div>
    <div className="pt-4 border-t">
      <div className="text-sm text-muted-foreground">
        3PT%: {stats.three_point_percentage}%
      </div>
    </div>
  </div>
);

const SocialMediaLinks = ({ social }: { social: SocialMedia }) => (
  <div className="flex gap-4 justify-center mt-4">
    {social.instagram && (
      <a href={social.instagram} target="_blank" rel="noopener noreferrer">
        <SiInstagram className="h-5 w-5 hover:text-[#E1306C] transition-colors" />
      </a>
    )}
    {social.twitter && (
      <a href={social.twitter} target="_blank" rel="noopener noreferrer">
        <FaTwitter className="h-5 w-5 hover:text-[#1DA1F2] transition-colors" />
      </a>
    )}
    {social.facebook && (
      <a href={social.facebook} target="_blank" rel="noopener noreferrer">
        <SiFacebook className="h-5 w-5 hover:text-[#4267B2] transition-colors" />
      </a>
    )}
    {social.youtube && (
      <a href={social.youtube} target="_blank" rel="noopener noreferrer">
        <SiYoutube className="h-5 w-5 hover:text-[#FF0000] transition-colors" />
      </a>
    )}
  </div>
);

export default function PlayerCard({ player }: { player: Player }) {
  const stats = player.stats as PlayerStats;
  const socialMedia = player.social_media as SocialMedia;

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl flex items-center gap-2">
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
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="grid grid-cols-4 gap-2 py-4 border-y cursor-pointer group-hover:bg-primary/5 transition-colors duration-300">
                <StatDisplay label="PPG" value={stats.points_per_game} />
                <StatDisplay label="APG" value={stats.assists_per_game} />
                <StatDisplay label="RPG" value={stats.rebounds_per_game} />
                <StatDisplay label="FG%" value={stats.field_goal_percentage} />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80" align="center">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Detailed Statistics</h4>
                <DetailedStatDisplay stats={stats} />
              </div>
            </HoverCardContent>
          </HoverCard>
        )}

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Top Accolade</p>
          <p className="font-medium">{player.accolade}</p>
        </div>

        {player.team && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Team</p>
            <p className="font-medium capitalize">{player.team}</p>
          </div>
        )}

        {socialMedia && <SocialMediaLinks social={socialMedia} />}

        {player.highlight_video_url && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                Watch Highlights
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
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