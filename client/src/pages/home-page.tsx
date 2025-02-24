import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AnimatedBackground from "@/components/sections/animated-background";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { SiInstagram } from "react-icons/si";

// Lazy load video section
const VideoSection = lazy(() => import("@/components/sections/video-section"));

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-8 px-4">
          <div className="container mx-auto text-center">
            <div className="w-[300px] h-[300px] mx-auto">
              <img 
                src="/IMG_9553.png" 
                alt="Pure Game Classic Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="mt-4">
              <a 
                href="https://www.instagram.com/pure_game_hoops/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white border-none hover:opacity-90"
                >
                  <SiInstagram className="h-5 w-5" />
                  Follow us on Instagram
                </Button>
              </a>
            </div>
            <p className="text-2xl mt-4 text-white font-medium opacity-0 animate-fade-in">
              Where pure basketball dreams take flight
            </p>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Suspense fallback={<Skeleton className="w-full aspect-video rounded-lg" />}>
                <VideoSection />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Event Images Section */}
        <section className="py-8 bg-white/5 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/58FCBF88-9EB2-41C8-BF3B-1AC8D8234DE9.png" 
                  alt="Pure Game Classic Details" 
                  className="w-full h-auto"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/AEB8F1CD-B10C-469E-95B4-91BED78A7F93.png" 
                  alt="Pure Game Classic Schedule" 
                  className="w-full h-auto"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Additional Features Section */}
        <section className="py-8 bg-gray-900/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-2">Live Music</h3>
                <p className="text-gray-300">Enjoy live performances throughout the event</p>
              </div>
              <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-2">Food Trucks</h3>
                <p className="text-gray-300">Various food options from local vendors</p>
              </div>
              <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-2">Concessions</h3>
                <p className="text-gray-300">Refreshments and snacks available</p>
              </div>
            </div>
          </div>
        </section>

        {/* Event Details */}
        <section className="py-16 container mx-auto text-center text-white">
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-xl">Date & Time</h3>
              <p>March 15, 2025</p>
              <p>Doors Open 9:30 AM</p>
            </div>
            <div>
              <h3 className="font-bold text-xl">Location</h3>
              <p>Northside High School</p>
              <p>926 Green St</p>
              <p>Warner Robins, GA</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}