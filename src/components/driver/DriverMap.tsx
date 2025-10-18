
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
          let errorMessage = "Impossible d'obtenir votre position.";
          if (error.code === 1) {
            errorMessage = "Veuillez autoriser l'accès à votre position pour utiliser cette fonctionnalité.";
          }
          toast({
            title: "Erreur de localisation",
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
        title: "Géolocalisation non supportée",
        description: "Votre navigateur ne supporte pas la géolocalisation.",
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
