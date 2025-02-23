import { AspectRatio } from "@/components/ui/aspect-ratio";
import { memo } from "react";

function VideoSection() {
  return (
    <>
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
    </>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(VideoSection);
