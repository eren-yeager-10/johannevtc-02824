
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { useState } from "react";
import { DateRange } from "react-day-picker";

const PaymentHistory = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });

  const mockPayments = [
    {
      id: "1",
      date: "2024-02-10",
      clientName: "Jean Dupont",
      amount: 45.50,
      status: "Payé",
      driverCommission: 36.40,
      platformCommission: 9.10,
    },
    {
      id: "2",
      date: "2024-02-09",
      clientName: "Marie Martin",
      amount: 32.00,
      status: "Payé",
      driverCommission: 25.60,
      platformCommission: 6.40,
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-end mb-6">
        <div className="flex-1">
          <DatePickerWithRange
            dateRange={dateRange}
            onDateRangeChange={(range: DateRange) => setDateRange(range)}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="paid">Payés</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="failed">Échoués</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-64">
          <Input placeholder="Rechercher par client ou chauffeur" />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Commission Chauffeur</TableHead>
            <TableHead>Commission Plateforme</TableHead>
            <TableHead>Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockPayments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{payment.date}</TableCell>
              <TableCell>{payment.clientName}</TableCell>
              <TableCell>{payment.amount.toFixed(2)}€</TableCell>
              <TableCell>{payment.driverCommission.toFixed(2)}€</TableCell>
              <TableCell>{payment.platformCommission.toFixed(2)}€</TableCell>
              <TableCell>{payment.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentHistory;
