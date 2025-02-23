import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Navbar from "@/components/layout/navbar";
import { Calendar, MapPin, QrCode } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load video section
const VideoSection = lazy(() => import("@/components/sections/video-section"));

// Optimize schedule rendering
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
            <div className="w-96 h-96 mx-auto">
              <img 
                src="/IMG_9553.png" 
                alt="Pure Game Classic Logo" 
                className="w-full h-full object-contain"
              />
            </div>
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
                  src="/AEB8F1CD-B10C-469E-95B4-91BED78A7F93.png" 
                  alt="Pure Game Classic Schedule" 
                  className="w-full h-auto"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/58FCBF88-9EB2-41C8-BF3B-1AC8D8234DE9.png" 
                  alt="Pure Game Classic Details" 
                  className="w-full h-auto"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Event Schedule</h2>

            {/* Middle School Events */}
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-semibold text-[#E31B23]">Middle School Division</h3>
              <div className="grid gap-2">
                <ScheduleItem time="10:00 AM" event="Middle School Girls 3 Point Contest" />
                <ScheduleItem time="10:30 AM" event="Middle School Boys 3 Point Contest" />
                <ScheduleItem time="11:00 AM" event="Middle School Girls All Star Game" />
                <ScheduleItem time="12:00 PM" event="Middle School Boys All Star Game" />
              </div>
            </div>

            {/* Rising Stars Events */}
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-semibold text-[#E31B23]">Rising Stars Division</h3>
              <div className="grid gap-2">
                <ScheduleItem time="1:00 PM" event="Rising Stars High School Girls 3 Point Contest" />
                <ScheduleItem time="1:30 PM" event="Rising Stars High School Boys 3 Point Contest" />
                <ScheduleItem time="2:00 PM" event="Rising Stars High School Girls All Star Game" />
                <ScheduleItem time="3:00 PM" event="Rising Stars High School Boys All Star Game" />
              </div>
            </div>

            {/* Varsity Events */}
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-semibold text-[#E31B23]">Varsity Division</h3>
              <div className="grid gap-2">
                <ScheduleItem time="4:00 PM" event="Varsity Dunk Contest" />
                <ScheduleItem time="4:30 PM" event="Varsity Girls 3 Point Contest" />
                <ScheduleItem time="5:00 PM" event="Varsity Boys 3 Point Contest" />
                <ScheduleItem time="5:30 PM" event="Varsity Girls All Star Game" />
                <ScheduleItem time="6:30 PM" event="Varsity Boys All Star Game" />
              </div>
            </div>

            {/* Admission Info */}
            <div className="mt-12 text-center p-6 rounded-lg border border-gray-700">
              <h3 className="text-2xl font-bold mb-4">Admission</h3>
              <div className="space-y-2">
                <p className="text-lg">General Admission: <span className="font-semibold">$15</span></p>
                <p className="text-lg">Students with ID: <span className="font-semibold">$10</span></p>
                <p className="text-lg">Coaches and Kids 7 & Under: <span className="font-semibold text-[#E31B23]">FREE</span></p>
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
      </main>
    </div>
  );
}