
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Users } from "lucide-react";

interface SplitPaymentDialogProps {
  amount: number;
  splitCount: number;
  onSplitChange: (value: number) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SplitPaymentDialog = ({
  amount,
  splitCount,
  onSplitChange,
  open,
  onOpenChange,
}: SplitPaymentDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Users className="mr-2 h-4 w-4" />
          Partager le paiement
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Partager le paiement</DialogTitle>
          <DialogDescription>
            Divisez le montant total entre plusieurs personnes
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Nombre de personnes</Label>
            <Input
              type="number"
              min="1"
              max="10"
              value={splitCount}
              onChange={(e) => onSplitChange(parseInt(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label>Montant par personne</Label>
            <div className="text-2xl font-bold">
              {(amount / splitCount).toFixed(2)}€
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
