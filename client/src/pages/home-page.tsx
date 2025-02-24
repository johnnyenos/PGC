import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AnimatedBackground from "@/components/sections/animated-background";
import { AspectRatio } from "@/components/ui/aspect-ratio";


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
            <div className="w-[500px] h-[500px] mx-auto">
              <img 
                src="/IMG_9553.png" 
                alt="Pure Game Classic Logo" 
                className="w-full h-full object-contain"
              />
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
              <p>City Sports Arena</p>
              <p>123 Basketball Court</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}