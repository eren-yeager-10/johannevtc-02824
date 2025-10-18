
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import LiveMap from "./LiveMap";

const DriverMap = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; timestamp: number } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ 
            lat: latitude, 
            lng: longitude,
            timestamp: position.timestamp 
          });
        },
        (error) => {
          let errorMessage = "Unable to get your location.";
          if (error.code === 1) {
            errorMessage = "Please allow location access to use this feature.";
          }
          toast({
            title: "Location Error",
            description: errorMessage,
            variant: "destructive",
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      toast({
        title: "Geolocation Not Supported",
        description: "Your browser does not support geolocation.",
        variant: "destructive",
      });
    }
  }, [toast]);

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
      <LiveMap userLocation={userLocation} />
    </div>
  );
};

export default DriverMap;
