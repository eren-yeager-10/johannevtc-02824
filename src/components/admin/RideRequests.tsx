import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Car,
  Ban,
  UserX,
  CheckCircle,
  AlertCircle,
  TimerOff,
  XCircle,
  Clock,
  DollarSign,
  Ban as BanIcon,
  CheckSquare,
  UserCheck,
} from "lucide-react";

interface Driver {
  id: string;
  name: string;
  status: "available" | "busy" | "blocked";
  rating: number;
  commission: number;
  blockReason?: string;
  blockedUntil?: Date;
}

interface RideRequest {
  id: string;
  clientName: string;
  pickup: string;
  destination: string;
  date: string;
  status: "pending" | "assigned" | "completed" | "blocked";
  price: number;
  driverId?: string;
  paymentStatus?: "pending" | "blocked" | "completed";
  commissionAmount?: number;
}

const RideRequests = () => {
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] = useState<RideRequest | null>(null);
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);
  const [requests, setRequests] = useState<RideRequest[]>([
    {
      id: "1",
      clientName: "Jean Dupont",
      pickup: "23 Rue de la Paix",
      destination: "Aéroport Charles de Gaulle",
      date: "2024-02-06",
      status: "pending",
      price: 45,
      driverId: "1",
      paymentStatus: "pending"
    },
    {
      id: "2",
      clientName: "Marie Martin",
      pickup: "15 Avenue des Champs-Élysées",
      destination: "Gare du Nord",
      date: "2024-02-06",
      status: "assigned",
      price: 35,
      driverId: "2",
      paymentStatus: "pending"
    }
  ]);
  
  const [drivers, setDrivers] = useState<Driver[]>([
    {
      id: "1",
      name: "Pierre Martin",
      status: "available",
      rating: 4.8,
      commission: 15
    },
    {
      id: "2",
      name: "Sophie Dubois",
      status: "available",
      rating: 4.9,
      commission: 15
    }
  ]);

  const blockDriver = (driverId: string, temporary: boolean = false, reason: string = "") => {
    setDrivers(prevDrivers => prevDrivers.map(driver => {
      if (driver.id === driverId) {
        return {
          ...driver,
          status: "blocked",
          blockReason: reason,
          blockedUntil: temporary ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : undefined
        };
      }
      return driver;
    }));

    // Mise à jour des courses associées au chauffeur
    setRequests(prevRequests => prevRequests.map(request => {
      if (request.driverId === driverId && request.status === "assigned") {
        return {
          ...request,
          status: "pending",
          driverId: undefined
        };
      }
      return request;
    }));

    toast({
      title: "Chauffeur bloqué",
      description: temporary ? "Le chauffeur a été temporairement bloqué" : "Le chauffeur a été définitivement bloqué",
    });
  };

  const unblockDriver = (driverId: string) => {
    setDrivers(prevDrivers => prevDrivers.map(driver => {
      if (driver.id === driverId) {
        return {
          ...driver,
          status: "available",
          blockReason: undefined,
          blockedUntil: undefined
        };
      }
      return driver;
    }));

    toast({
      title: "Chauffeur débloqué",
      description: "Le chauffeur a été réactivé avec succès",
    });
  };

  const calculateCommission = (price: number, driverId: string) => {
    const driver = drivers.find(d => d.id === driverId);
    if (!driver) return 0;
    return (price * driver.commission) / 100;
  };

  const handleAssignDriver = (requestId: string, driverId: string) => {
    // Vérifier si le chauffeur est disponible
    const driver = drivers.find(d => d.id === driverId);
    if (!driver || driver.status !== "available") {
      toast({
        title: "Erreur d'attribution",
        description: "Le chauffeur n'est pas disponible pour le moment",
        variant: "destructive"
      });
      return;
    }

    setRequests(prevRequests => prevRequests.map(request => {
      if (request.id === requestId) {
        return {
          ...request,
          driverId,
          status: "assigned"
        };
      }
      return request;
    }));

    setDrivers(prevDrivers => prevDrivers.map(driver => {
      if (driver.id === driverId) {
        return {
          ...driver,
          status: "busy"
        };
      }
      return driver;
    }));

    toast({
      title: "Course attribuée",
      description: "La course a été attribuée au chauffeur avec succès",
    });

    // Fermer la boîte de dialogue après l'attribution
    const dialogCloseButton = document.querySelector("[type='button'][aria-label='Close']") as HTMLButtonElement;
    if (dialogCloseButton) {
      dialogCloseButton.click();
    }
  };

  const handlePaymentComplete = (requestId: string, driverId: string) => {
    setRequests(prevRequests => prevRequests.map(request => {
      if (request.id === requestId) {
        const commissionAmount = calculateCommission(request.price, driverId);
        return {
          ...request,
          status: "completed",
          paymentStatus: "completed",
          commissionAmount
        };
      }
      return request;
    }));

    // Libérer le chauffeur
    setDrivers(prevDrivers => prevDrivers.map(driver => {
      if (driver.id === driverId) {
        return {
          ...driver,
          status: "available"
        };
      }
      return driver;
    }));

    toast({
      title: "Paiement effectué",
      description: "La commission a été prélevée automatiquement",
    });
  };

  const handleBlockPayment = (requestId: string) => {
    setRequests(prevRequests => prevRequests.map(request => {
      if (request.id === requestId) {
        return {
          ...request,
          paymentStatus: "blocked"
        };
      }
      return request;
    }));

    toast({
      title: "Montant bloqué",
      description: "Le montant de la course a été bloqué en attente de validation",
    });
  };

  const handleCancelRide = (requestId: string) => {
    const request = requests.find(r => r.id === requestId);
    if (!request) return;

    setRequests(prevRequests => prevRequests.map(request => {
      if (request.id === requestId) {
        return {
          ...request,
          status: "blocked",
          paymentStatus: "blocked"
        };
      }
      return request;
    }));

    // Si un chauffeur était assigné, le rendre disponible
    if (request.driverId) {
      setDrivers(prevDrivers => prevDrivers.map(driver => {
        if (driver.id === request.driverId) {
          return {
            ...driver,
            status: "available"
          };
        }
        return driver;
      }));
    }

    toast({
      title: "Course annulée",
      description: "La course a été annulée et le paiement bloqué",
    });
  };

  return (
    <Card className="p-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Car className="h-6 w-6" />
        Gestion des courses et chauffeurs
      </h2>
      <ScrollArea className="h-[600px]">
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Chauffeurs
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers.map((driver) => (
                  <TableRow key={driver.id}>
                    <TableCell>{driver.name}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={driver.status === "blocked" ? "destructive" : 
                               driver.status === "busy" ? "secondary" : "default"}
                        className="flex items-center gap-1"
                      >
                        {driver.status === "blocked" ? <BanIcon className="h-3 w-3" /> : 
                         driver.status === "busy" ? <Clock className="h-3 w-3" /> : 
                         <CheckCircle className="h-3 w-3" />}
                        {driver.status === "blocked" ? "Bloqué" : 
                         driver.status === "busy" ? "Occupé" : "Disponible"}
                      </Badge>
                    </TableCell>
                    <TableCell>{driver.rating}/5</TableCell>
                    <TableCell>{driver.commission}%</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {driver.status === "blocked" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => unblockDriver(driver.id)}
                            className="flex items-center gap-1"
                          >
                            <UserCheck className="h-4 w-4" />
                            Débloquer
                          </Button>
                        ) : (
                          <>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => blockDriver(driver.id, true, "Suspension temporaire")}
                              className="flex items-center gap-1"
                            >
                              <TimerOff className="h-4 w-4" />
                              Bloquer temp.
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => blockDriver(driver.id, false, "Blocage définitif")}
                              className="flex items-center gap-1"
                            >
                              <Ban className="h-4 w-4" />
                              Bloquer déf.
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Car className="h-5 w-5" />
              Demandes de courses
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Départ</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Paiement</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.clientName}</TableCell>
                    <TableCell>{request.pickup}</TableCell>
                    <TableCell>{request.destination}</TableCell>
                    <TableCell className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {request.price}€
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          request.status === "completed" ? "default" :
                          request.status === "blocked" ? "destructive" : 
                          "secondary"
                        }
                        className="flex items-center gap-1"
                      >
                        {request.status === "completed" ? <CheckCircle className="h-3 w-3" /> :
                         request.status === "blocked" ? <XCircle className="h-3 w-3" /> :
                         request.status === "assigned" ? <UserCheck className="h-3 w-3" /> :
                         <Clock className="h-3 w-3" />}
                        {request.status === "completed" ? "Terminée" : 
                         request.status === "blocked" ? "Annulée" :
                         request.status === "assigned" ? "Attribuée" : "En attente"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          request.paymentStatus === "completed" ? "default" :
                          request.paymentStatus === "blocked" ? "secondary" : 
                          "destructive"
                        }
                        className="flex items-center gap-1"
                      >
                        {request.paymentStatus === "completed" ? <CheckSquare className="h-3 w-3" /> :
                         request.paymentStatus === "blocked" ? <AlertCircle className="h-3 w-3" /> :
                         <Clock className="h-3 w-3" />}
                        {request.paymentStatus === "completed" ? "Payé" :
                         request.paymentStatus === "blocked" ? "Bloqué" : "En attente"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {request.status === "pending" && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="flex items-center gap-1"
                              >
                                <UserCheck className="h-4 w-4" />
                                Attribuer
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Attribuer un chauffeur</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                {drivers
                                  .filter(driver => driver.status === "available")
                                  .map(driver => (
                                    <Button
                                      key={driver.id}
                                      variant="outline"
                                      onClick={() => handleAssignDriver(request.id, driver.id)}
                                      className="w-full justify-start gap-2"
                                    >
                                      <UserCheck className="h-4 w-4" />
                                      {driver.name} - Note: {driver.rating}/5
                                    </Button>
                                  ))}
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                        
                        {request.status !== "completed" && request.status !== "blocked" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleBlockPayment(request.id)}
                              className="flex items-center gap-1"
                            >
                              <AlertCircle className="h-4 w-4" />
                              Bloquer montant
                            </Button>
                            {request.driverId && (
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handlePaymentComplete(request.id, request.driverId!)}
                                className="flex items-center gap-1"
                              >
                                <CheckSquare className="h-4 w-4" />
                                Valider paiement
                              </Button>
                            )}
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleCancelRide(request.id)}
                              className="flex items-center gap-1"
                            >
                              <XCircle className="h-4 w-4" />
                              Annuler
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
};

export default RideRequests;
