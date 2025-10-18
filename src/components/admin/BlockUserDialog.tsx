
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Ban, UserX, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BlockUserDialogProps {
  userId: string;
  userName: string;
  onBlock: (userId: string, reason: string, permanent: boolean) => void;
}

const BlockUserDialog = ({ userId, userName, onBlock }: BlockUserDialogProps) => {
  const [reason, setReason] = useState("");
  const [permanent, setPermanent] = useState(false);
  const { toast } = useToast();

  const handleBlock = () => {
    if (!reason.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez fournir une raison pour le blocage",
        variant: "destructive",
      });
      return;
    }

    onBlock(userId, reason, permanent);
    setReason("");
    setPermanent(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Ban className="h-4 w-4" />
          Bloquer
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bloquer {userName}</DialogTitle>
          <DialogDescription>
            {permanent 
              ? "Cette action bannira définitivement l'utilisateur de la plateforme." 
              : "Cette action bloquera temporairement l'utilisateur."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Raison du blocage</Label>
            <Textarea
              id="reason"
              placeholder="Expliquez la raison du blocage..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="permanent"
              checked={permanent}
              onChange={(e) => setPermanent(e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="permanent" className="flex items-center gap-2 text-red-500">
              <UserX className="h-4 w-4" />
              Bannissement définitif
            </Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <DialogTrigger asChild>
              <Button variant="outline">Annuler</Button>
            </DialogTrigger>
            <Button 
              variant="destructive"
              onClick={handleBlock}
              className="gap-2"
            >
              <AlertCircle className="h-4 w-4" />
              {permanent ? "Bannir définitivement" : "Bloquer temporairement"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlockUserDialog;
