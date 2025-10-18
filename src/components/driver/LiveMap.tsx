
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navigation, MapPin, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Location {
  lat: number;
  lng: number;
  timestamp: number;
}

interface LiveMapProps {
  userLocation: Location | null;
  pickup?: string;
  destination?: string;
}

const LiveMap = ({ userLocation, pickup, destination }: LiveMapProps) => {
  const { toast } = useToast();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    try {
      // Initialisation de la carte
      mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: userLocation ? [userLocation.lng, userLocation.lat] : [2.3522, 48.8566], // Paris par défaut
        zoom: 12
      });

      // Ajout des contrôles de navigation
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Gérer les erreurs de chargement
      map.current.on('error', (e) => {
        console.error('Erreur Mapbox:', e);
        setMapError("Erreur lors du chargement de la carte");
      });

    } catch (error) {
      console.error('Erreur lors de l\'initialisation de la carte:', error);
      setMapError("Impossible d'initialiser la carte");
    }

    return () => {
      map.current?.remove();
    };
  }, []);

  // Mise à jour de la position sur la carte
  useEffect(() => {
    if (!map.current || !userLocation) return;

    // Mettre à jour le centre de la carte
    map.current.setCenter([userLocation.lng, userLocation.lat]);

    // Ajouter ou mettre à jour le marqueur de position
    new mapboxgl.Marker({
      color: "#FF0000"
    })
      .setLngLat([userLocation.lng, userLocation.lat])
      .addTo(map.current);

  }, [userLocation]);

  // Fonction pour ouvrir Waze avec la position actuelle
  const openWazeNavigation = () => {
    if (pickup && destination) {
      const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(destination)}&navigate=yes&from=${encodeURIComponent(pickup)}`;
      window.open(wazeUrl, '_blank');
    } else if (userLocation) {
      const { lat, lng } = userLocation;
      window.open(`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`, '_blank');
    } else {
      toast({
        title: "Position non disponible",
        description: "Impossible d'obtenir votre position actuelle.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Suivi en temps réel</h3>
        <Button onClick={openWazeNavigation} className="flex items-center gap-2">
          <Navigation className="w-4 h-4" />
          Ouvrir dans Waze
        </Button>
      </div>

      {mapError ? (
        <div className="bg-red-50 p-4 rounded-lg flex items-center gap-2">
          <AlertTriangle className="text-red-500" />
          <p className="text-red-700">{mapError}</p>
        </div>
      ) : (
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
          <div ref={mapContainer} className="absolute inset-0" />
          
          <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
            {pickup && (
              <div className="bg-white p-3 rounded-lg shadow flex items-center gap-2 pointer-events-auto">
                <MapPin className="text-green-500" />
                <div>
                  <p className="font-medium text-sm">Point de départ</p>
                  <p className="text-gray-600">{pickup}</p>
                </div>
              </div>
            )}
            
            {destination && (
              <div className="bg-white p-3 rounded-lg shadow flex items-center gap-2 pointer-events-auto">
                <MapPin className="text-red-500" />
                <div>
                  <p className="font-medium text-sm">Destination</p>
                  <p className="text-gray-600">{destination}</p>
                </div>
              </div>
            )}
            
            {userLocation && (
              <div className="bg-white p-3 rounded-lg shadow pointer-events-auto">
                <p className="font-medium text-sm">Position actuelle</p>
                <p className="text-gray-600">Lat : {userLocation.lat.toFixed(6)}</p>
                <p className="text-gray-600">Long : {userLocation.lng.toFixed(6)}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Dernière mise à jour : {new Date(userLocation.timestamp).toLocaleTimeString()}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

export default LiveMap;
