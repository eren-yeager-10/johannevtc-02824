
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Percent, Plus, Trash2, Edit } from "lucide-react";

type Promotion = {
  id: string;
  code: string;
  type: "percentage" | "fixed" | "free_ride";
  value: number;
  validFrom: string;
  validUntil: string;
  usageLimit: number;
  description: string;
  status: "active" | "inactive" | "expired";
};

const PromotionsManagement = () => {
  const { toast } = useToast();
  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: "1",
      code: "WELCOME2024",
      type: "percentage",
      value: 20,
      validFrom: "2024-01-01",
      validUntil: "2024-12-31",
      usageLimit: 1000,
      description: "20% de réduction sur votre première course",
      status: "active",
    },
    {
      id: "2",
      code: "SUMMER10",
      type: "fixed",
      value: 10,
      validFrom: "2024-06-01",
      validUntil: "2024-08-31",
      usageLimit: 500,
      description: "10€ de réduction sur les courses en été",
      status: "inactive",
    },
  ]);

  const [newPromotion, setNewPromotion] = useState({
    code: "",
    type: "percentage",
    value: "",
    validFrom: "",
    validUntil: "",
    usageLimit: "",
    description: "",
  });

  const handleAddPromotion = () => {
    if (!newPromotion.code || !newPromotion.value || !newPromotion.validFrom || !newPromotion.validUntil) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    const promotion: Promotion = {
      id: (promotions.length + 1).toString(),
      code: newPromotion.code,
      type: newPromotion.type as "percentage" | "fixed" | "free_ride",
      value: Number(newPromotion.value),
      validFrom: newPromotion.validFrom,
      validUntil: newPromotion.validUntil,
      usageLimit: Number(newPromotion.usageLimit),
      description: newPromotion.description,
      status: "active",
    };

    setPromotions([...promotions, promotion]);
    setNewPromotion({
      code: "",
      type: "percentage",
      value: "",
      validFrom: "",
      validUntil: "",
      usageLimit: "",
      description: "",
    });

    toast({
      title: "Succès",
      description: "Le code promo a été ajouté avec succès",
    });
  };

  const handleDelete = (promoId: string) => {
    setPromotions(promotions.filter(promo => promo.id !== promoId));
    toast({
      title: "Succès",
      description: "Le code promo a été supprimé avec succès",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des promotions</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une promotion
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle promotion</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="code">Code promo</label>
                <Input
                  id="code"
                  value={newPromotion.code}
                  onChange={(e) => setNewPromotion({ ...newPromotion, code: e.target.value })}
                  placeholder="ex: WELCOME2024"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="type">Type de réduction</label>
                <Select
                  value={newPromotion.type}
                  onValueChange={(value) => setNewPromotion({ ...newPromotion, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Pourcentage</SelectItem>
                    <SelectItem value="fixed">Montant fixe</SelectItem>
                    <SelectItem value="free_ride">Course gratuite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="value">Valeur</label>
                <Input
                  id="value"
                  type="number"
                  value={newPromotion.value}
                  onChange={(e) => setNewPromotion({ ...newPromotion, value: e.target.value })}
                  placeholder={newPromotion.type === "percentage" ? "ex: 20" : "ex: 10"}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="validFrom">Valide du</label>
                  <Input
                    id="validFrom"
                    type="date"
                    value={newPromotion.validFrom}
                    onChange={(e) => setNewPromotion({ ...newPromotion, validFrom: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="validUntil">Au</label>
                  <Input
                    id="validUntil"
                    type="date"
                    value={newPromotion.validUntil}
                    onChange={(e) => setNewPromotion({ ...newPromotion, validUntil: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="usageLimit">Limite d'utilisation</label>
                <Input
                  id="usageLimit"
                  type="number"
                  value={newPromotion.usageLimit}
                  onChange={(e) => setNewPromotion({ ...newPromotion, usageLimit: e.target.value })}
                  placeholder="ex: 1000"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description">Description</label>
                <Input
                  id="description"
                  value={newPromotion.description}
                  onChange={(e) => setNewPromotion({ ...newPromotion, description: e.target.value })}
                  placeholder="Description de la promotion"
                />
              </div>
              <Button onClick={handleAddPromotion}>Ajouter la promotion</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Valeur</TableHead>
            <TableHead>Validité</TableHead>
            <TableHead>Limite</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {promotions.map((promo) => (
            <TableRow key={promo.id}>
              <TableCell className="font-medium">{promo.code}</TableCell>
              <TableCell>
                {promo.type === "percentage" ? (
                  <span className="flex items-center">
                    <Percent className="h-4 w-4 mr-1" />
                    Pourcentage
                  </span>
                ) : promo.type === "fixed" ? (
                  "Montant fixe"
                ) : (
                  "Course gratuite"
                )}
              </TableCell>
              <TableCell>
                {promo.type === "percentage"
                  ? `${promo.value}%`
                  : promo.type === "fixed"
                  ? `${promo.value}€`
                  : "Gratuit"}
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <div>Du: {new Date(promo.validFrom).toLocaleDateString()}</div>
                  <div>Au: {new Date(promo.validUntil).toLocaleDateString()}</div>
                </div>
              </TableCell>
              <TableCell>{promo.usageLimit}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(promo.status)}`}>
                  {promo.status === "active"
                    ? "Actif"
                    : promo.status === "inactive"
                    ? "Inactif"
                    : "Expiré"}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(promo.id)}
                    className="text-red-500 hover:text-red-600"
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

export default PromotionsManagement;
