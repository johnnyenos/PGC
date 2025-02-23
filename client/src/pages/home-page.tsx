import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Navbar from "@/components/layout/navbar";
import { Calendar, MapPin, QrCode, Instagram } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load video section
const VideoSection = lazy(() => import("@/components/sections/video-section"));

const ScheduleItem = ({ time, event }: { time: string; event: string }) => (
  <p className="text-lg">
    <span className="font-semibold">{time}</span> - {event}
  </p>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <div className="w-[600px] h-[600px] mx-auto">
              <img 
                src="/IMG_9553.png" 
                alt="Pure Game Classic Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-2xl mt-8 text-white font-medium opacity-0 animate-fade-in">
              Where pure basketball dreams take flight
            </p>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Suspense fallback={<Skeleton className="w-full aspect-video rounded-lg" />}>
                <VideoSection />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Event Images Section */}
        <section className="py-8">
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

        {/* Event Features */}
        <section className="py-16 bg-gray-800/50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6 rounded-lg border border-gray-700 hover:border-[#E31B23] transition-colors">
                <h3 className="text-2xl font-bold mb-4">Live Music</h3>
                <p className="text-gray-300">Experience amazing performances throughout the event</p>
              </div>
              <div className="p-6 rounded-lg border border-gray-700 hover:border-[#004B87] transition-colors">
                <h3 className="text-2xl font-bold mb-4">Food Trucks</h3>
                <p className="text-gray-300">Enjoy a variety of delicious local food options</p>
              </div>
              <div className="p-6 rounded-lg border border-gray-700 hover:border-[#E31B23] transition-colors">
                <h3 className="text-2xl font-bold mb-4">Concessions</h3>
                <p className="text-gray-300">Quick snacks and refreshments available</p>
              </div>
            </div>
          </div>
        </section>

        {/* Event Details */}
        <section className="py-16 container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <Calendar className="h-8 w-8 text-[#004B87]" />
              <div>
                <h3 className="font-bold">Date & Time</h3>
                <p>March 15, 2025</p>
                <p>Doors Open 9:30 AM</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="h-8 w-8 text-[#E31B23]" />
              <div>
                <h3 className="font-bold">Location</h3>
                <p>City Sports Arena</p>
                <p>123 Basketball Court</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <QrCode className="h-8 w-8 text-[#004B87]" />
              <div>
                <h3 className="font-bold">Quick Access</h3>
                <p>Scan QR code for</p>
                <p>Event Details</p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="py-8 text-center">
          <a 
            href="https://instagram.com/puregameclassic" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white hover:opacity-90 transition-opacity"
          >
            <Instagram className="w-5 h-5" />
            <span>Follow us on Instagram</span>
          </a>
        </section>
      </main>
    </div>
  );
}