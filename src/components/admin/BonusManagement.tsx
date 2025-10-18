
import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Award, Calendar, TrendingUp, CreditCard } from "lucide-react";

interface Driver {
  id: string;
  name: string;
  earnings: {
    weekly: number;
    monthly: number;
    yearly: number;
  };
  bonuses: {
    type: 'weekly' | 'monthly' | 'yearly';
    amount: number;
    date: string;
  }[];
}

// Données simulées des chauffeurs
const mockDrivers: Driver[] = [
  {
    id: "1",
    name: "Jean Dupont",
    earnings: {
      weekly: 950,
      monthly: 3800,
      yearly: 45600
    },
    bonuses: [
      { type: 'weekly', amount: 100, date: '2024-03-15' }
    ]
  },
  {
    id: "2",
    name: "Marie Martin",
    earnings: {
      weekly: 1200,
      monthly: 4800,
      yearly: 57600
    },
    bonuses: [
      { type: 'monthly', amount: 300, date: '2024-03-01' }
    ]
  },
  {
    id: "3",
    name: "Pierre Lambert",
    earnings: {
      weekly: 850,
      monthly: 3400,
      yearly: 40800
    },
    bonuses: []
  }
];

const bonusThresholds = {
  weekly: { min: 800, target: 1000, excellent: 1200 },
  monthly: { min: 3200, target: 4000, excellent: 4800 },
  yearly: { min: 38400, target: 48000, excellent: 57600 }
};

const BonusManagement = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [bonusAmount, setBonusAmount] = useState<string>('');
  const { toast } = useToast();

  const getBadgeVariant = (earnings: number, period: 'weekly' | 'monthly' | 'yearly') => {
    const thresholds = bonusThresholds[period];
    if (earnings >= thresholds.excellent) return "default"; // Changé de "success" à "default"
    if (earnings >= thresholds.target) return "secondary";
    if (earnings >= thresholds.min) return "outline";
    return "destructive";
  };

  const handleBonusSubmit = () => {
    if (!selectedDriver || !bonusAmount) return;

    const newBonus = {
      type: selectedPeriod,
      amount: parseFloat(bonusAmount),
      date: new Date().toISOString().split('T')[0]
    };

    toast({
      title: "Bonus attribué avec succès",
      description: `Un bonus de ${bonusAmount}€ a été attribué à ${selectedDriver.name}`,
    });

    setSelectedDriver(null);
    setBonusAmount('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestion des Bonus</h2>
        <Select value={selectedPeriod} onValueChange={(value: 'weekly' | 'monthly' | 'yearly') => setSelectedPeriod(value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sélectionner la période" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Période</SelectLabel>
              <SelectItem value="weekly">Hebdomadaire</SelectItem>
              <SelectItem value="monthly">Mensuel</SelectItem>
              <SelectItem value="yearly">Annuel</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Objectif {selectedPeriod === 'weekly' ? 'hebdomadaire' : selectedPeriod === 'monthly' ? 'mensuel' : 'annuel'}</p>
            <p className="text-2xl font-bold">{bonusThresholds[selectedPeriod].target}€</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-full">
            <Award className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Excellence</p>
            <p className="text-2xl font-bold">{bonusThresholds[selectedPeriod].excellent}€</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-4">
          <div className="p-3 bg-orange-100 rounded-full">
            <Calendar className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Minimum requis</p>
            <p className="text-2xl font-bold">{bonusThresholds[selectedPeriod].min}€</p>
          </div>
        </Card>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Chauffeur</TableHead>
              <TableHead>Recettes {selectedPeriod === 'weekly' ? 'hebdomadaires' : selectedPeriod === 'monthly' ? 'mensuelles' : 'annuelles'}</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Derniers bonus</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockDrivers.map((driver) => (
              <TableRow key={driver.id}>
                <TableCell className="font-medium">{driver.name}</TableCell>
                <TableCell>
                  {driver.earnings[selectedPeriod]}€
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={getBadgeVariant(driver.earnings[selectedPeriod], selectedPeriod)}
                    className={
                      driver.earnings[selectedPeriod] >= bonusThresholds[selectedPeriod].excellent 
                        ? "bg-green-500 hover:bg-green-600 text-white" 
                        : undefined
                    }
                  >
                    {driver.earnings[selectedPeriod] >= bonusThresholds[selectedPeriod].excellent ? 'Excellent' :
                     driver.earnings[selectedPeriod] >= bonusThresholds[selectedPeriod].target ? 'Objectif atteint' :
                     driver.earnings[selectedPeriod] >= bonusThresholds[selectedPeriod].min ? 'En progression' : 'En dessous'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    {driver.bonuses
                      .filter(bonus => bonus.type === selectedPeriod)
                      .map((bonus, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CreditCard className="w-4 h-4 text-primary" />
                          {bonus.amount}€ ({bonus.date})
                        </div>
                      ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline"
                        onClick={() => setSelectedDriver(driver)}
                        disabled={driver.earnings[selectedPeriod] < bonusThresholds[selectedPeriod].min}
                      >
                        Attribuer un bonus
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Attribuer un bonus à {driver.name}</DialogTitle>
                        <DialogDescription>
                          Attribuez un bonus pour les performances {selectedPeriod === 'weekly' ? 'hebdomadaires' : selectedPeriod === 'monthly' ? 'mensuelles' : 'annuelles'}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Montant du bonus</label>
                          <Input
                            type="number"
                            placeholder="Montant en €"
                            value={bonusAmount}
                            onChange={(e) => setBonusAmount(e.target.value)}
                          />
                        </div>
                        <Button onClick={handleBonusSubmit} className="w-full">
                          Confirmer le bonus
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default BonusManagement;
