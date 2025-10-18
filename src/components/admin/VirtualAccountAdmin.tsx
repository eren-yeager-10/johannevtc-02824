
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, ArrowUpRight, ArrowDownLeft, Calendar, Clock, Euro, Download } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface WithdrawalRequest {
  id: string;
  date: Date;
  amount: number;
  driverId: string;
  driverName: string;
  status: "pending" | "approved" | "rejected";
  bankInfo: string;
}

const VirtualAccountAdmin = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Données de démonstration
  const totalWithdrawals = 7850.25;
  const pendingWithdrawals = 2450.75;
  const totalDrivers = 12;

  const withdrawalRequests: WithdrawalRequest[] = [
    {
      id: "W1",
      date: new Date(),
      amount: 450.00,
      driverId: "D1234",
      driverName: "Jean Dupont",
      status: "pending",
      bankInfo: "FR76 XXXX XXXX XXXX XXXX"
    },
    {
      id: "W2",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      amount: 750.25,
      driverId: "D1235",
      driverName: "Marie Martin",
      status: "pending",
      bankInfo: "FR76 XXXX XXXX XXXX YYYY"
    }
  ];

  const handleApproveWithdrawal = (requestId: string) => {
    setIsProcessing(true);
    // Simuler le traitement
    setTimeout(() => {
      toast({
        title: "Retrait approuvé",
        description: "Le retrait a été approuvé et sera traité dans les prochaines 24h",
      });
      setIsProcessing(false);
    }, 1500);
  };

  const handleRejectWithdrawal = (requestId: string) => {
    setIsProcessing(true);
    // Simuler le traitement
    setTimeout(() => {
      toast({
        title: "Retrait refusé",
        description: "Le retrait a été refusé et le chauffeur en sera notifié",
        variant: "destructive"
      });
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gestion des retraits</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total des retraits
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWithdrawals.toFixed(2)}€</div>
            <p className="text-xs text-muted-foreground">
              Mise à jour : {format(new Date(), "HH:mm")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Retraits en attente
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingWithdrawals.toFixed(2)}€</div>
            <p className="text-xs text-muted-foreground">
              {totalDrivers} chauffeurs en attente
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Retraits à approuver
            </CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{withdrawalRequests.length}</div>
            <p className="text-xs text-muted-foreground">
              Demandes en attente
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Demandes de retrait en attente</CardTitle>
          <CardDescription>
            Validez ou refusez les demandes de retrait des chauffeurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Chauffeur</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Coordonnées bancaires</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {withdrawalRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {format(request.date, "dd/MM/yyyy")}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {format(request.date, "HH:mm")}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{request.driverName}</span>
                      <span className="text-xs text-muted-foreground">
                        ID: {request.driverId}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {request.amount.toFixed(2)}€
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {request.bankInfo}
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      request.status === "approved" 
                        ? "default"
                        : request.status === "pending"
                        ? "secondary"
                        : "destructive"
                    }>
                      {request.status === "approved" && "Approuvé"}
                      {request.status === "pending" && "En attente"}
                      {request.status === "rejected" && "Refusé"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleApproveWithdrawal(request.id)}
                        disabled={isProcessing || request.status !== "pending"}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        Approuver
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRejectWithdrawal(request.id)}
                        disabled={isProcessing || request.status !== "pending"}
                      >
                        Refuser
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default VirtualAccountAdmin;
