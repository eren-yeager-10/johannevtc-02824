
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wallet, ArrowUpRight, ArrowDownLeft, Calendar, Clock, Euro, Download } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface AdminTransaction {
  id: string;
  date: Date;
  type: "credit" | "debit";
  amount: number;
  description: string;
  status: "completed" | "pending" | "failed";
  driverId?: string;
  rideId?: string;
  commission: number;
}

const PaymentManagement = () => {
  const { toast } = useToast();
  // Données de démonstration
  const totalBalance = 15250.75;
  const totalPending = 2180.50;
  const totalCommissions = 3045.15;

  const transactions: AdminTransaction[] = [
    {
      id: "1",
      date: new Date(),
      type: "credit",
      amount: 45.00,
      description: "Paiement course #1234",
      status: "completed",
      driverId: "D1234",
      rideId: "R1234",
      commission: 9.00
    },
    {
      id: "2",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      type: "debit",
      amount: 36.00,
      description: "Versement chauffeur #D1234",
      status: "pending",
      driverId: "D1234",
      rideId: "R1234",
      commission: 9.00
    },
    {
      id: "3",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      type: "credit",
      amount: 75.00,
      description: "Paiement course #1235",
      status: "completed",
      driverId: "D1235",
      rideId: "R1235",
      commission: 15.00
    }
  ];

  const handleExportTransactions = () => {
    toast({
      title: "Export en cours",
      description: "Les transactions sont en cours d'export...",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gestion des paiements</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Solde total
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBalance.toFixed(2)}€</div>
            <p className="text-xs text-muted-foreground">
              Mise à jour : {format(new Date(), "HH:mm")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              En attente
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPending.toFixed(2)}€</div>
            <p className="text-xs text-muted-foreground">
              Transactions en cours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total commissions
            </CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCommissions.toFixed(2)}€</div>
            <p className="text-xs text-muted-foreground">
              Commissions cumulées
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Historique des transactions</CardTitle>
            <CardDescription>Suivi détaillé des paiements et versements</CardDescription>
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
                <TableHead>Commission</TableHead>
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
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{transaction.description}</span>
                      {transaction.driverId && (
                        <span className="text-xs text-muted-foreground">
                          Chauffeur ID: {transaction.driverId}
                        </span>
                      )}
                    </div>
                  </TableCell>
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
                  <TableCell className="text-orange-600 font-medium">
                    {transaction.commission.toFixed(2)}€
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

export default PaymentManagement;
