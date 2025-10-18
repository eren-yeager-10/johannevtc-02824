import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Car, Star, MapPin, ArrowRight, Building } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Driver {
  id: string;
  name: string;
  vehicleType: string;
  rating: number;
  photo: string;
  location: {
    street: string;
    district: string;
    region: string;
    coordinates: { x: number; y: number };
  };
  status: 'available' | 'busy' | 'offline';
  distanceFromCenter: number;
}

const parisDistricts = [
  { 
    name: "Le Marais",
    path: "M250,200 L300,200 L300,250 L250,250 Z",
    type: "historic"
  },
  {
    name: "Quartier Latin",
    path: "M200,300 L250,300 L250,350 L200,350 Z",
    type: "historic"
  },
  {
    name: "Montmartre",
    path: "M150,150 L200,150 L200,200 L150,200 Z",
    type: "historic"
  },
  {
    name: "Champs-Élysées",
    path: "M300,150 L350,150 L350,200 L300,200 Z",
    type: "commercial"
  }
];

const parisAlleys = [
  {
    name: "Passage des Panoramas",
    path: "M220,230 L260,230",
    type: "pedestrian"
  },
  {
    name: "Passage Verdeau",
    path: "M280,210 L280,240",
    type: "pedestrian"
  },
  {
    name: "Passage du Grand Cerf",
    path: "M180,270 L220,270",
    type: "pedestrian"
  },
  {
    name: "Passage Brady",
    path: "M330,290 L330,320",
    type: "pedestrian"
  }
];

const parisStreets = [
  { 
    name: "Rue de Rivoli",
    path: "M150,250 L450,250",
    direction: "horizontal",
    type: "major"
  },
  {
    name: "Avenue des Champs-Élysées",
    path: "M200,150 L500,150",
    direction: "horizontal",
    type: "major"
  },
  {
    name: "Boulevard Saint-Germain",
    path: "M100,350 L400,350",
    direction: "horizontal",
    type: "major"
  },
  {
    name: "Rue Saint-Honoré",
    path: "M175,200 L425,200",
    direction: "horizontal",
    type: "secondary"
  },
  {
    name: "Boulevard Haussmann",
    path: "M150,300 L450,300",
    direction: "horizontal",
    type: "major"
  },

  {
    name: "Avenue de l'Opéra",
    path: "M300,100 L300,400",
    direction: "vertical",
    type: "major"
  },
  {
    name: "Rue de la Paix",
    path: "M250,150 L250,350",
    direction: "vertical",
    type: "secondary"
  },
  {
    name: "Rue Royale",
    path: "M350,125 L350,375",
    direction: "vertical",
    type: "secondary"
  },
  {
    name: "Boulevard Sébastopol",
    path: "M200,100 L200,400",
    direction: "vertical",
    type: "major"
  },
  {
    name: "Rue du Faubourg Saint-Honoré",
    path: "M400,125 L400,375",
    direction: "vertical",
    type: "secondary"
  }
];

const landmarks = [
  { 
    name: "Tour Eiffel",
    position: "bottom-1/3 left-20",
    icon: "🗼"
  },
  { 
    name: "Arc de Triomphe",
    position: "top-20 right-32",
    icon: "🏛️"
  },
  { 
    name: "Notre-Dame",
    position: "bottom-32 left-32",
    icon: "⛪"
  },
  { 
    name: "Louvre",
    position: "center",
    icon: "🏛️"
  },
  { 
    name: "Sacré-Cœur",
    position: "top-20 left-32",
    icon: "⛪"
  }
];

const mockDrivers: Driver[] = [
  {
    id: "1",
    name: "Jean Dupont",
    vehicleType: "berline",
    rating: 4.8,
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
    location: { 
      street: "Rue de Rivoli",
      district: "Le Marais",
      region: "Île-de-France",
      coordinates: { x: 250, y: 280 }
    },
    status: 'available',
    distanceFromCenter: 1.2
  },
  {
    id: "2",
    name: "Marie Martin",
    vehicleType: "suv",
    rating: 4.9,
    photo: "https://randomuser.me/api/portraits/women/2.jpg",
    location: { 
      street: "Avenue des Champs-Élysées",
      district: "Champs-Élysées",
      region: "Île-de-France",
      coordinates: { x: 350, y: 200 }
    },
    status: 'available',
    distanceFromCenter: 2.5
  },
  {
    id: "3",
    name: "Pierre Dubois",
    vehicleType: "berline",
    rating: 4.7,
    photo: "https://randomuser.me/api/portraits/men/3.jpg",
    location: { 
      street: "Boulevard Saint-Germain",
      district: "Quartier Latin",
      region: "Île-de-France",
      coordinates: { x: 300, y: 350 }
    },
    status: 'available',
    distanceFromCenter: 3.1
  },
  {
    id: "4",
    name: "Sophie Laurent",
    vehicleType: "van",
    rating: 4.9,
    photo: "https://randomuser.me/api/portraits/women/4.jpg",
    location: { 
      street: "Rue du Faubourg Saint-Honoré",
      district: "Champs-Élysées",
      region: "Île-de-France",
      coordinates: { x: 400, y: 250 }
    },
    status: 'available',
    distanceFromCenter: 3.8
  },
  {
    id: "5",
    name: "Lucas Bernard",
    vehicleType: "suv",
    rating: 4.6,
    photo: "https://randomuser.me/api/portraits/men/5.jpg",
    location: { 
      street: "Place de la Concorde",
      district: "Champs-Élysées",
      region: "Île-de-France",
      coordinates: { x: 320, y: 220 }
    },
    status: 'available',
    distanceFromCenter: 1.8
  }
];

const DriversMap = () => {
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>('all');
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const { toast } = useToast();

  const filteredDrivers = mockDrivers.filter(
    driver => (selectedVehicleType === 'all' || driver.vehicleType === selectedVehicleType) &&
    driver.distanceFromCenter <= 4
  );

  const handleVehicleSelect = (type: string) => {
    setSelectedVehicleType(type);
  };

  return (
    <div className="space-y-6">
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex space-x-3 px-2">
          {[
            { id: 'all', label: 'Tous' },
            { id: 'berline', label: 'Berline' },
            { id: 'suv', label: 'SUV' },
            { id: 'van', label: 'Van' }
          ].map((type) => (
            <Button
              key={type.id}
              variant={selectedVehicleType === type.id ? "default" : "outline"}
              onClick={() => handleVehicleSelect(type.id)}
              className="shrink-0 min-w-[100px]"
            >
              {type.label}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <Card>
        <CardContent className="p-4">
          <ScrollArea className="w-full">
            <div className="relative w-[1000px] h-[700px] bg-blue-50 rounded-lg overflow-hidden">
              <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                {parisDistricts.map((district, index) => (
                  <g key={`district-${index}`}>
                    <path
                      d={district.path}
                      fill={district.type === "historic" ? "#f0e6d2" : "#e6f0d2"}
                      stroke="#64748b"
                      strokeWidth="2"
                      opacity="0.3"
                    />
                    <text
                      x={district.path.split(' ')[0].split('M')[1]}
                      y={district.path.split(' ')[1]}
                      fontSize="14"
                      fill="#1e293b"
                      className="font-semibold"
                    >
                      {district.name}
                    </text>
                  </g>
                ))}

                {parisAlleys.map((alley, index) => (
                  <g key={`alley-${index}`}>
                    <path
                      d={alley.path}
                      stroke="#94a3b8"
                      strokeWidth="2"
                      strokeDasharray="4"
                      fill="none"
                    />
                    <text
                      x={alley.path.split(' ')[0].split('M')[1]}
                      y={parseInt(alley.path.split(' ')[1]) - 5}
                      fontSize="10"
                      fill="#64748b"
                      className="italic"
                    >
                      {alley.name}
                    </text>
                  </g>
                ))}

                {parisStreets.map((street, index) => (
                  <g key={`street-${index}`}>
                    <path
                      d={street.path}
                      stroke={street.type === "major" ? "#475569" : "#94a3b8"}
                      strokeWidth={street.type === "major" ? "6" : "4"}
                      fill="none"
                    />
                    <text
                      x={street.direction === "vertical" 
                        ? street.path.split(',')[0].split('M')[1]
                        : String((parseInt(street.path.split(',')[0].split('M')[1]) + parseInt(street.path.split('L')[1].split(',')[0])) / 2)
                      }
                      y={street.direction === "vertical"
                        ? String((parseInt(street.path.split(',')[1]) + parseInt(street.path.split('L')[1].split(',')[1])) / 2)
                        : String(parseInt(street.path.split(',')[1]) - 10)
                      }
                      fontSize="12"
                      fill="#1e293b"
                      textAnchor="middle"
                      transform={street.direction === "vertical" ? `rotate(-90 ${street.path.split(',')[0].split('M')[1]} ${(parseInt(street.path.split(',')[1]) + parseInt(street.path.split('L')[1].split(',')[1])) / 2})` : ""}
                      className="font-semibold"
                    >
                      {street.name}
                    </text>
                  </g>
                ))}
              </svg>

              {landmarks.map((landmark, index) => (
                <div
                  key={index}
                  className={`absolute ${landmark.position} text-sm font-semibold text-gray-800 bg-white/90 px-3 py-2 rounded-md shadow-sm transform -translate-x-1/2 flex items-center gap-2`}
                >
                  <span className="text-lg">{landmark.icon}</span>
                  {landmark.name}
                </div>
              ))}

              {filteredDrivers.map((driver) => (
                <button
                  key={driver.id}
                  className="absolute touch-manipulation transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${driver.location.coordinates.x}px`,
                    top: `${driver.location.coordinates.y}px`
                  }}
                  onClick={() => setSelectedDriver(driver)}
                >
                  <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Car className="w-6 h-6 text-primary" />
                  </div>
                  <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-white/90 px-2 py-1 rounded-md shadow-sm text-xs space-y-1">
                    <div className="whitespace-nowrap">{driver.location.street}</div>
                    <div className="text-gray-500">{driver.distanceFromCenter.toFixed(1)} km</div>
                  </div>
                </button>
              ))}

              <div className="absolute bottom-4 right-4 bg-white/90 p-4 rounded-md shadow-sm z-10">
                <div className="text-sm font-semibold mb-3">Légende</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-1 bg-gray-600"></div>
                    <span className="text-xs">Artères principales</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-1 bg-gray-400"></div>
                    <span className="text-xs">Rues secondaires</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-1 border-t-2 border-dashed border-gray-400"></div>
                    <span className="text-xs">Ruelles piétonnes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-4 bg-yellow-100/30 border border-gray-400"></div>
                    <span className="text-xs">Quartiers historiques</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-4 bg-green-100/30 border border-gray-400"></div>
                    <span className="text-xs">Zones commerciales</span>
                  </div>
                </div>
              </div>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>

      {selectedDriver && (
        <Sheet open={!!selectedDriver} onOpenChange={() => setSelectedDriver(null)}>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Détails du chauffeur</SheetTitle>
              <SheetDescription>
                <div className="space-y-4 mt-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedDriver.photo}
                      alt={selectedDriver.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{selectedDriver.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>{selectedDriver.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Badge variant="outline" className="flex items-center gap-2 w-fit">
                      <Car className="w-4 h-4" />
                      {selectedDriver.vehicleType.charAt(0).toUpperCase() + selectedDriver.vehicleType.slice(1)}
                    </Badge>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>Rue : {selectedDriver.location.street}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building className="w-4 h-4" />
                      <span>Quartier : {selectedDriver.location.district}</span>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      Distance : {selectedDriver.distanceFromCenter.toFixed(1)} km
                    </div>
                  </div>

                  <Button 
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Réservation en cours",
                        description: `Votre demande a été envoyée au chauffeur dans ${selectedDriver.location.street}.`,
                      });
                      setSelectedDriver(null);
                    }}
                  >
                    Réserver maintenant
                  </Button>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default DriversMap;
