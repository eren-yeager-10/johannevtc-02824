
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, ArrowUpRight, ArrowDownLeft, Calendar, Clock, Euro, Download } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  date: Date;
  type: "credit" | "debit";
  amount: number;
  description: string;
  status: "completed" | "pending" | "failed";
  rideId?: string;
}

const VirtualAccount = () => {
  const { toast } = useToast();
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const balance = 1250.75;
  const pendingBalance = 180.50;
  const minWithdrawAmount = 50;

  const transactions: Transaction[] = [
    {
      id: "1",
      date: new Date(),
      type: "credit",
      amount: 45.00,
      description: "Course #1234",
      status: "completed",
      rideId: "1234"
    },
    {
      id: "2",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      type: "credit",
      amount: 32.50,
      description: "Course #1235",
      status: "pending",
      rideId: "1235"
    },
    {
      id: "3",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      type: "debit",
      amount: 1000.00,
      description: "Retrait vers compte bancaire",
      status: "completed"
    }
  ];

  const handleWithdraw = () => {
    if (balance < minWithdrawAmount) {
      toast({
        title: "Retrait impossible",
        description: `Le montant minimum de retrait est de ${minWithdrawAmount}€`,
        variant: "destructive"
      });
      return;
    }

    setIsWithdrawing(true);
    // Simuler une requête de retrait
    setTimeout(() => {
      toast({
        title: "Demande de retrait envoyée",
        description: "Votre demande de retrait sera traitée sous 24-48h",
      });
      setIsWithdrawing(false);
    }, 1500);
  };

  const handleExportTransactions = () => {
    toast({
      title: "Export en cours",
      description: "Vos transactions sont en cours d'export...",
    });
    // Logique d'export à implémenter
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Solde disponible
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{balance.toFixed(2)}€</div>
            <p className="text-xs text-muted-foreground">
              Dernière mise à jour : {format(new Date(), "HH:mm")}
            </p>
            <Button
              onClick={handleWithdraw}
              disabled={isWithdrawing || balance < minWithdrawAmount}
              className="mt-4 w-full"
            >
              {isWithdrawing ? "Traitement en cours..." : "Retirer les fonds"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              En attente de règlement
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingBalance.toFixed(2)}€</div>
            <p className="text-xs text-muted-foreground">
              Sera disponible dans 24-48h
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">Historique des transactions</CardTitle>
            <CardDescription>
              Suivi détaillé de vos revenus et retraits
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={handleExportTransactions}
          >
            <Download className="h-4 w-4" />
            Exporter
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {format(transaction.date, "dd/MM/yyyy")}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {format(transaction.date, "HH:mm")}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {transaction.type === "credit" ? (
                        <ArrowDownLeft className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-blue-500" />
                      )}
                      <span>
                        {transaction.type === "credit" ? "Crédit" : "Débit"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className={
                    transaction.type === "credit" 
                      ? "text-green-600 font-medium" 
                      : "text-blue-600 font-medium"
                  }>
                    {transaction.type === "credit" ? "+" : "-"}
                    {transaction.amount.toFixed(2)}€
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      transaction.status === "completed" 
                        ? "default"
                        : transaction.status === "pending"
                        ? "secondary"
                        : "destructive"
                    }>
                      {transaction.status === "completed" && "Terminé"}
                      {transaction.status === "pending" && "En attente"}
                      {transaction.status === "failed" && "Échec"}
                    </Badge>
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

export default VirtualAccount;
