import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPinIcon } from "lucide-react";

const ZonePreferences = () => {
  const zones = [
    { name: "Paris Centre", active: true },
    { name: "La Défense", active: true },
    { name: "Aéroport CDG", active: false },
    { name: "Aéroport Orly", active: true },
    { name: "Versailles", active: false },
  ];

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Zones préférées</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {zones.map((zone) => (
          <div
            key={zone.name}
            className={`flex items-center justify-between p-3 rounded-lg border ${
              zone.active ? "bg-primary/5 border-primary" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <MapPinIcon className="w-5 h-5 text-muted-foreground" />
              <span>{zone.name}</span>
            </div>
            <Button variant={zone.active ? "default" : "outline"} size="sm">
              {zone.active ? "Actif" : "Inactif"}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ZonePreferences;