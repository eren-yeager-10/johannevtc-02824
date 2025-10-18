
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

const InvoiceManagement = () => {
  const mockInvoices = [
    {
      id: "1",
      date: "2024-02-10",
      number: "FAC-2024-001",
      client: "Jean Dupont",
      amount: 45.50,
      type: "Client",
      status: "Émise"
    },
    {
      id: "2",
      date: "2024-02-09",
      number: "FAC-2024-002",
      client: "Pierre Martin",
      amount: 32.00,
      type: "Chauffeur",
      status: "Payée"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Générer une facture
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Numéro</TableHead>
            <TableHead>Client/Chauffeur</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockInvoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>{invoice.number}</TableCell>
              <TableCell>{invoice.client}</TableCell>
              <TableCell>{invoice.type}</TableCell>
              <TableCell>{invoice.amount.toFixed(2)}€</TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InvoiceManagement;
