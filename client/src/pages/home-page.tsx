import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Navbar from "@/components/layout/navbar";
import { Calendar, MapPin, QrCode } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 bg-[#0A0F1C]">
          <div className="container mx-auto text-center text-white">
            <h1 className="text-5xl font-bold mb-6">Pure Game Classic 2025</h1>
            <p className="text-xl mb-8">Where Basketball Dreams Take Flight</p>
            <div className="flex justify-center gap-4">
              <Link href="/players">
                <Button size="lg" className="bg-[#E31B23] hover:bg-[#E31B23]/90">View Participants</Button>
              </Link>
              <Link href="/giveaway">
                <Button size="lg" className="bg-[#004B87] hover:bg-[#004B87]/90">Enter Giveaway</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-12 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Featured Video</h2>
              <AspectRatio ratio={16/9} className="bg-black rounded-lg overflow-hidden border-2 border-gray-700">
                <video 
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/PGCvid.MP4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </AspectRatio>
              <p className="text-gray-400 text-center mt-4">
                Experiencing the Pure Game Classic
              </p>
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
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/58FCBF88-9EB2-41C8-BF3B-1AC8D8234DE9.png" 
                  alt="Pure Game Classic Details" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section className="py-16 bg-[#f8f9fa]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Event Schedule</h2>

            {/* Middle School Events */}
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-semibold text-[#004B87]">Middle School Division</h3>
              <div className="grid gap-2">
                <p className="text-lg"><span className="font-semibold">10:00 AM</span> - Middle School Girls 3 Point Contest</p>
                <p className="text-lg"><span className="font-semibold">10:30 AM</span> - Middle School Boys 3 Point Contest</p>
                <p className="text-lg"><span className="font-semibold">11:00 AM</span> - Middle School Girls All Star Game</p>
                <p className="text-lg"><span className="font-semibold">12:00 PM</span> - Middle School Boys All Star Game</p>
              </div>
            </div>

            {/* Rising Stars Events */}
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-semibold text-[#E31B23]">Rising Stars Division</h3>
              <div className="grid gap-2">
                <p className="text-lg"><span className="font-semibold">1:00 PM</span> - Rising Stars High School Girls 3 Point Contest</p>
                <p className="text-lg"><span className="font-semibold">1:30 PM</span> - Rising Stars High School Boys 3 Point Contest</p>
                <p className="text-lg"><span className="font-semibold">2:00 PM</span> - Rising Stars High School Girls All Star Game</p>
                <p className="text-lg"><span className="font-semibold">3:00 PM</span> - Rising Stars High School Boys All Star Game</p>
              </div>
            </div>

            {/* Varsity Events */}
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-semibold text-[#004B87]">Varsity Division</h3>
              <div className="grid gap-2">
                <p className="text-lg"><span className="font-semibold">4:00 PM</span> - Varsity Dunk Contest</p>
                <p className="text-lg"><span className="font-semibold">4:30 PM</span> - Varsity Girls 3 Point Contest</p>
                <p className="text-lg"><span className="font-semibold">5:00 PM</span> - Varsity Boys 3 Point Contest</p>
                <p className="text-lg"><span className="font-semibold">5:30 PM</span> - Varsity Girls All Star Game</p>
                <p className="text-lg"><span className="font-semibold">6:30 PM</span> - Varsity Boys All Star Game</p>
              </div>
            </div>

            {/* Admission Info */}
            <div className="mt-12 text-center p-6 bg-white rounded-lg shadow-sm">
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
                <p>Giveaway Entry</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}