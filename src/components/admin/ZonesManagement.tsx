
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MapPin, Edit, Trash2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

type Zone = {
  id: string;
  name: string;
  active: boolean;
  basePrice: number;
  surgePricing: boolean;
  surgeMultiplier: number;
};

const ZonesManagement = () => {
  const [zones, setZones] = useState<Zone[]>([
    {
      id: "1",
      name: "Paris Centre",
      active: true,
      basePrice: 10,
      surgePricing: true,
      surgeMultiplier: 1.5,
    },
    {
      id: "2",
      name: "Aéroport CDG",
      active: true,
      basePrice: 15,
      surgePricing: true,
      surgeMultiplier: 1.8,
    },
  ]);

  const { toast } = useToast();
  const [newZone, setNewZone] = useState({
    name: "",
    basePrice: "",
    surgePricing: false,
    surgeMultiplier: "1.5",
  });

  const handleAddZone = () => {
    if (!newZone.name || !newZone.basePrice) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    const newZoneData: Zone = {
      id: (zones.length + 1).toString(),
      name: newZone.name,
      active: true,
      basePrice: parseFloat(newZone.basePrice),
      surgePricing: newZone.surgePricing,
      surgeMultiplier: parseFloat(newZone.surgeMultiplier),
    };

    setZones([...zones, newZoneData]);
    setNewZone({
      name: "",
      basePrice: "",
      surgePricing: false,
      surgeMultiplier: "1.5",
    });

    toast({
      title: "Succès",
      description: "La zone a été ajoutée avec succès",
    });
  };

  const toggleZoneStatus = (zoneId: string) => {
    setZones(
      zones.map((zone) =>
        zone.id === zoneId ? { ...zone, active: !zone.active } : zone
      )
    );

    const zone = zones.find((z) => z.id === zoneId);
    toast({
      title: "Statut mis à jour",
      description: `La zone ${zone?.name} est maintenant ${
        !zone?.active ? "active" : "inactive"
      }`,
    });
  };

  const handleDelete = (zoneId: string) => {
    setZones(zones.filter((zone) => zone.id !== zoneId));
    toast({
      title: "Succès",
      description: "La zone a été supprimée avec succès",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Gestion des zones</h2>
          <p className="text-muted-foreground">
            Gérez les zones de service et leur tarification
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une zone
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle zone</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nom de la zone</Label>
                <Input
                  id="name"
                  value={newZone.name}
                  onChange={(e) =>
                    setNewZone({ ...newZone, name: e.target.value })
                  }
                  placeholder="ex: Paris Centre"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="basePrice">Prix de base (€)</Label>
                <Input
                  id="basePrice"
                  type="number"
                  value={newZone.basePrice}
                  onChange={(e) =>
                    setNewZone({ ...newZone, basePrice: e.target.value })
                  }
                  placeholder="ex: 10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="surgePricing"
                  checked={newZone.surgePricing}
                  onCheckedChange={(checked) =>
                    setNewZone({ ...newZone, surgePricing: checked })
                  }
                />
                <Label htmlFor="surgePricing">Activer la tarification dynamique</Label>
              </div>
              {newZone.surgePricing && (
                <div className="grid gap-2">
                  <Label htmlFor="surgeMultiplier">Multiplicateur de prix</Label>
                  <Input
                    id="surgeMultiplier"
                    type="number"
                    step="0.1"
                    min="1"
                    max="3"
                    value={newZone.surgeMultiplier}
                    onChange={(e) =>
                      setNewZone({ ...newZone, surgeMultiplier: e.target.value })
                    }
                    placeholder="ex: 1.5"
                  />
                </div>
              )}
              <Button onClick={handleAddZone}>Ajouter la zone</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Zone</TableHead>
            <TableHead>Prix de base</TableHead>
            <TableHead>Tarification dynamique</TableHead>
            <TableHead>Multiplicateur</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {zones.map((zone) => (
            <TableRow key={zone.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {zone.name}
                </div>
              </TableCell>
              <TableCell>{zone.basePrice}€</TableCell>
              <TableCell>
                {zone.surgePricing ? "Activée" : "Désactivée"}
              </TableCell>
              <TableCell>x{zone.surgeMultiplier}</TableCell>
              <TableCell>
                <Switch
                  checked={zone.active}
                  onCheckedChange={() => toggleZoneStatus(zone.id)}
                />
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(zone.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ZonesManagement;
