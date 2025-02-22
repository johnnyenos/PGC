import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Navbar from "@/components/layout/navbar";
import { Calendar, MapPin, QrCode } from "lucide-react";

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