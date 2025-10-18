
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Euro, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

type PriceType = {
  id: string;
  name: string;
  basePrice: number;
  pricePerKm: number;
  pricePerMinute: number;
  category: string;
};

const PricingManagement = () => {
  const [prices, setPrices] = useState<PriceType[]>([
    {
      id: "1",
      name: "Standard",
      basePrice: 5,
      pricePerKm: 1.5,
      pricePerMinute: 0.3,
      category: "Berline",
    },
    {
      id: "2",
      name: "Premium",
      basePrice: 8,
      pricePerKm: 2.0,
      pricePerMinute: 0.4,
      category: "Van",
    },
  ]);

  const { toast } = useToast();
  const [newPrice, setNewPrice] = useState({
    name: "",
    basePrice: "",
    pricePerKm: "",
    pricePerMinute: "",
    category: "",
  });

  const handleAddPrice = () => {
    if (!newPrice.name || !newPrice.basePrice || !newPrice.pricePerKm || !newPrice.pricePerMinute || !newPrice.category) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    const newPriceData: PriceType = {
      id: (prices.length + 1).toString(),
      name: newPrice.name,
      basePrice: parseFloat(newPrice.basePrice),
      pricePerKm: parseFloat(newPrice.pricePerKm),
      pricePerMinute: parseFloat(newPrice.pricePerMinute),
      category: newPrice.category,
    };

    setPrices([...prices, newPriceData]);
    setNewPrice({
      name: "",
      basePrice: "",
      pricePerKm: "",
      pricePerMinute: "",
      category: "",
    });

    toast({
      title: "Succès",
      description: "Le tarif a été ajouté avec succès",
    });

    // Fermer le dialogue
    const dialogCloseButton = document.querySelector("[role='dialog'] button[type='button']") as HTMLButtonElement;
    if (dialogCloseButton) {
      dialogCloseButton.click();
    }
  };

  const handleEdit = (priceId: string) => {
    console.log("Edit price:", priceId);
  };

  const handleDelete = (priceId: string) => {
    setPrices(prices.filter(price => price.id !== priceId));
    toast({
      title: "Succès",
      description: "Le tarif a été supprimé avec succès",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des tarifs</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Euro className="mr-2 h-4 w-4" />
              Ajouter un tarif
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau tarif</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name">Nom du tarif</label>
                <Input
                  id="name"
                  value={newPrice.name}
                  onChange={(e) => setNewPrice({ ...newPrice, name: e.target.value })}
                  placeholder="Nom du tarif"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="basePrice">Prix de base (€)</label>
                <Input
                  id="basePrice"
                  type="number"
                  step="0.01"
                  value={newPrice.basePrice}
                  onChange={(e) => setNewPrice({ ...newPrice, basePrice: e.target.value })}
                  placeholder="Prix de base"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="pricePerKm">Prix par km (€)</label>
                <Input
                  id="pricePerKm"
                  type="number"
                  step="0.01"
                  value={newPrice.pricePerKm}
                  onChange={(e) => setNewPrice({ ...newPrice, pricePerKm: e.target.value })}
                  placeholder="Prix par km"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="pricePerMinute">Prix par minute (€)</label>
                <Input
                  id="pricePerMinute"
                  type="number"
                  step="0.01"
                  value={newPrice.pricePerMinute}
                  onChange={(e) => setNewPrice({ ...newPrice, pricePerMinute: e.target.value })}
                  placeholder="Prix par minute"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="category">Catégorie</label>
                <Select
                  value={newPrice.category}
                  onValueChange={(value) => setNewPrice({ ...newPrice, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Berline">Berline</SelectItem>
                    <SelectItem value="Van">Van</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddPrice}>Ajouter le tarif</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Prix de base</TableHead>
            <TableHead>Prix par km</TableHead>
            <TableHead>Prix par minute</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prices.map((price) => (
            <TableRow key={price.id}>
              <TableCell>{price.name}</TableCell>
              <TableCell>{price.basePrice}€</TableCell>
              <TableCell>{price.pricePerKm}€</TableCell>
              <TableCell>{price.pricePerMinute}€</TableCell>
              <TableCell>{price.category}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(price.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(price.id)}>
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

export default PricingManagement;
