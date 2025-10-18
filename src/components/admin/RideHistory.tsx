
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, MapPin, AlertCircle, Clock, Ban, CheckCircle, History } from "lucide-react";
import { format } from "date-fns";

interface Ride {
  id: string;
  driverName: string;
  clientName: string;
  pickup: string;
  destination: string;
  date: Date;
  status: "completed" | "cancelled" | "disputed";
  amount: number;
  disputeReason?: string;
}

const RideHistory = () => {
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  
  // Données simulées pour la démonstration
  const [rides] = useState<Ride[]>([
    {
      id: "1",
      driverName: "Pierre Martin",
      clientName: "Jean Dupont",
      pickup: "23 Rue de la Paix",
      destination: "Aéroport Charles de Gaulle",
      date: new Date("2024-02-06T10:30:00"),
      status: "completed",
      amount: 45,
    },
    {
      id: "2",
      driverName: "Sophie Dubois",
      clientName: "Marie Martin",
      pickup: "15 Avenue des Champs-Élysées",
      destination: "Gare du Nord",
      date: new Date("2024-02-06T14:15:00"),
      status: "disputed",
      amount: 35,
      disputeReason: "Retard important",
    },
    {
      id: "3",
      driverName: "Lucas Bernard",
      clientName: "Alice Petit",
      pickup: "8 Place de la Bastille",
      destination: "Tour Eiffel",
      date: new Date("2024-02-06T16:45:00"),
      status: "cancelled",
      amount: 25,
    }
  ]);

  const getStatusBadge = (status: Ride["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Terminée
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <Ban className="h-3 w-3" />
            Annulée
          </Badge>
        );
      case "disputed":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Litige
          </Badge>
        );
    }
  };

  return (
    <Card className="p-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <History className="h-6 w-6" />
        Historique des courses et réclamations
      </h2>
      <ScrollArea className="h-[600px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Chauffeur</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Trajet</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rides.map((ride) => (
              <TableRow key={ride.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {format(ride.date, "dd/MM/yyyy HH:mm")}
                  </div>
                </TableCell>
                <TableCell>{ride.driverName}</TableCell>
                <TableCell>{ride.clientName}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3" /> {ride.pickup}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3" /> {ride.destination}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{ride.amount}€</TableCell>
                <TableCell>{getStatusBadge(ride.status)}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Clock className="h-4 w-4" />
                        Détails
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Détails de la course</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Informations générales</h4>
                          <div className="space-y-2 text-sm">
                            <p><span className="font-medium">Date:</span> {format(ride.date, "dd/MM/yyyy HH:mm")}</p>
                            <p><span className="font-medium">Chauffeur:</span> {ride.driverName}</p>
                            <p><span className="font-medium">Client:</span> {ride.clientName}</p>
                            <p><span className="font-medium">Montant:</span> {ride.amount}€</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Trajet</h4>
                          <div className="space-y-2 text-sm">
                            <p><span className="font-medium">Départ:</span> {ride.pickup}</p>
                            <p><span className="font-medium">Destination:</span> {ride.destination}</p>
                          </div>
                        </div>
                        {ride.status === "disputed" && ride.disputeReason && (
                          <div>
                            <h4 className="font-medium mb-2 text-red-500">Motif du litige</h4>
                            <p className="text-sm">{ride.disputeReason}</p>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </Card>
  );
};

export default RideHistory;
