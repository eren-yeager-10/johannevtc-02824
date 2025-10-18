
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MapIcon, Loader2 } from "lucide-react";

interface LocationButtonsProps {
  isLocating: boolean;
  onLocationFound: (address: string) => void;
}

export const LocationButtons = ({ isLocating, onLocationFound }: LocationButtonsProps) => {
  const { toast } = useToast();

  const getCurrentLocationAndOpenWaze = async () => {
    if (!navigator.geolocation) {
      toast({
        title: "Géolocalisation non supportée",
        description: "Votre navigateur ne supporte pas la géolocalisation.",
        variant: "destructive",
      });
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      const { latitude, longitude } = position.coords;
      const locationString = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
      onLocationFound(locationString);
      
      // Ouvrir directement Waze avec la position
      window.open(`https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`, '_blank');
      
      toast({
        title: "Position trouvée !",
        description: "Ouverture de Waze avec votre position actuelle.",
      });
    } catch (error: any) {
      let errorMessage = "Impossible d'obtenir votre position.";
      
      if (error.code === 1) {
        errorMessage = "L'accès à votre position a été refusé. Pour autoriser l'accès:\n" +
          "1. Cliquez sur l'icône 🔒 dans la barre d'adresse\n" +
          "2. Sélectionnez 'Autoriser' pour la géolocalisation\n" +
          "3. Actualisez la page";
      } else if (error.code === 2) {
        errorMessage = "Position indisponible. Veuillez vérifier que votre GPS est activé et réessayez.";
      } else if (error.code === 3) {
        errorMessage = "Délai d'attente dépassé. Veuillez vérifier votre connexion et réessayer.";
      }

      toast({
        title: "Erreur de localisation",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex gap-2">
      {isLocating ? (
        <Button disabled className="bg-brand-blue">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Localisation...
        </Button>
      ) : (
        <Button
          onClick={getCurrentLocationAndOpenWaze}
          className="bg-brand-blue hover:bg-brand-blue/90 text-white"
        >
          <MapIcon className="mr-2 h-4 w-4" />
          Me localiser sur Waze
        </Button>
      )}
    </div>
  );
};
