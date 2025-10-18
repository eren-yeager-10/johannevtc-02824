
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import BlockUserDialog from "../admin/BlockUserDialog";
import { useToast } from "@/hooks/use-toast";

const CurrentRides = () => {
  const { toast } = useToast();
  const [currentRide] = useState({
    id: "R123",
    clientId: "C1",
    clientName: "Sophie Martin",
    pickup: "23 Rue de la Paix",
    destination: "Gare du Nord",
    status: "en_cours"
  });

  const handleBlockUser = (userId: string, reason: string, permanent: boolean) => {
    // Dans un cas réel, ceci appellerait une API
    console.log(`Blocage du client ${userId} pour la raison: ${reason}`);
    
    toast({
      title: permanent ? "Demande de bannissement envoyée" : "Demande de blocage envoyée",
      description: "Un administrateur examinera votre demande",
    });
  };

  return (
    <div className="space-y-4">
      <CardHeader className="px-0">
        <CardTitle>Course en cours</CardTitle>
      </CardHeader>

      <CardContent className="px-0">
        {currentRide ? (
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{currentRide.clientName}</h3>
                    <p className="text-sm text-muted-foreground">ID: {currentRide.clientId}</p>
                  </div>
                  <Badge>{currentRide.status}</Badge>
                </div>

                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-semibold">Départ:</span> {currentRide.pickup}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Destination:</span> {currentRide.destination}
                  </p>
                </div>

                <div className="flex justify-end space-x-2">
                  <BlockUserDialog
                    userId={currentRide.clientId}
                    userName={currentRide.clientName}
                    onBlock={handleBlockUser}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <p className="text-muted-foreground">Aucune course en cours</p>
        )}
      </CardContent>
    </div>
  );
};

export default CurrentRides;
