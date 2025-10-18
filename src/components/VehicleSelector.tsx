
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Leaf, Zap } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

export type VehicleType = "berline" | "suv" | "van" | "luxe";

interface VehicleSelectorProps {
  onVehicleSelect: (type: VehicleType) => void;
  selectedVehicle: VehicleType;
}

interface Vehicle {
  type: VehicleType;
  label: string;
  description: string;
  isEco?: boolean;
  isElectric?: boolean;
  carbonEmission: number; // g/km
}

export const VehicleSelector = ({ onVehicleSelect, selectedVehicle }: VehicleSelectorProps) => {
  const [showEcoOnly, setShowEcoOnly] = useState(false);
  const { toast } = useToast();

  const vehicles: Vehicle[] = [
    { 
      type: "berline", 
      label: "Berline", 
      description: "4 places, 2 valises",
      isElectric: true,
      carbonEmission: 0
    },
    { 
      type: "suv", 
      label: "SUV", 
      description: "5 places, 3 valises",
      isEco: true,
      carbonEmission: 95
    },
    { 
      type: "van", 
      label: "Van", 
      description: "7 places, 4 valises",
      carbonEmission: 150
    },
    { 
      type: "luxe", 
      label: "Luxe", 
      description: "4 places, service premium",
      isElectric: true,
      carbonEmission: 0
    },
  ];

  const filteredVehicles = showEcoOnly 
    ? vehicles.filter(v => v.isEco || v.isElectric)
    : vehicles;

  const selectedVehicleData = vehicles.find(v => v.type === selectedVehicle);

  const handleCompensate = () => {
    if (selectedVehicleData) {
      const estimatedDistance = 20; // km - moyenne estimée
      const totalEmission = selectedVehicleData.carbonEmission * estimatedDistance;
      const compensationCost = (totalEmission / 1000) * 0.25; // 0.25€ par kg de CO2

      toast({
        title: "Compensation carbone",
        description: `Pour compenser ${totalEmission}g de CO2, nous ajouterons ${compensationCost.toFixed(2)}€ à votre course pour des projets écologiques.`,
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Type de véhicule</label>
        <div className="flex items-center space-x-2">
          <Switch
            id="eco-mode"
            checked={showEcoOnly}
            onCheckedChange={setShowEcoOnly}
          />
          <Label htmlFor="eco-mode">Véhicules écologiques uniquement</Label>
        </div>
      </div>

      <Select 
        value={selectedVehicle} 
        onValueChange={(value: VehicleType) => onVehicleSelect(value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sélectionnez un véhicule" />
        </SelectTrigger>
        <SelectContent>
          {filteredVehicles.map((vehicle) => (
            <SelectItem key={vehicle.type} value={vehicle.type}>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{vehicle.label}</span>
                  {vehicle.isElectric && (
                    <Badge variant="secondary" className="flex items-center space-x-1">
                      <Zap className="h-3 w-3" />
                      <span>Électrique</span>
                    </Badge>
                  )}
                  {vehicle.isEco && (
                    <Badge variant="secondary" className="flex items-center space-x-1">
                      <Leaf className="h-3 w-3" />
                      <span>Éco</span>
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-gray-500">{vehicle.description}</span>
                <span className="text-xs text-gray-500">
                  Émission CO2: {vehicle.carbonEmission} g/km
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedVehicleData && selectedVehicleData.carbonEmission > 0 && (
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-2"
          onClick={handleCompensate}
        >
          <Leaf className="w-4 h-4 mr-2" />
          Compenser l'empreinte carbone
        </Button>
      )}
    </div>
  );
};
