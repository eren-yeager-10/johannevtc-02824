
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Banknote } from "lucide-react";

const Earnings = () => {
  const COMMISSION_RATE = 0.20;

  const mockEarnings = [
    {
      period: "Cette semaine",
      rides: {
        card: 35,
        cash: 10
      },
      earnings: {
        card: 825,
        cash: 200
      },
      tips: {
        card: 65,
        cash: 20
      }
    },
    {
      period: "Semaine dernière",
      rides: {
        card: 42,
        cash: 8
      },
      earnings: {
        card: 980,
        cash: 180
      },
      tips: {
        card: 75,
        cash: 25
      }
    },
    {
      period: "Ce mois",
      rides: {
        card: 155,
        cash: 25
      },
      earnings: {
        card: 3600,
        cash: 500
      },
      tips: {
        card: 280,
        cash: 40
      }
    }
  ];

  const calculateNetAmount = (grossAmount: number) => {
    const commission = grossAmount * COMMISSION_RATE;
    return grossAmount - commission;
  };

  return (
    <Card className="p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Informations sur la commission</h3>
        <p className="text-sm text-gray-600">
          Commission Johanne VTC : {COMMISSION_RATE * 100}% sur les paiements par carte
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Période</TableHead>
            <TableHead>Courses (CB/ESP)</TableHead>
            <TableHead>Revenus bruts</TableHead>
            <TableHead>Commission</TableHead>
            <TableHead>Revenus nets</TableHead>
            <TableHead>Pourboires</TableHead>
            <TableHead>Total net</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockEarnings.map((earning) => {
            const totalCardEarnings = earning.earnings.card;
            const commission = totalCardEarnings * COMMISSION_RATE;
            const netCardEarnings = calculateNetAmount(totalCardEarnings);
            const totalTips = earning.tips.card + earning.tips.cash;
            const totalCashEarnings = earning.earnings.cash;
            const finalTotal = netCardEarnings + totalCashEarnings + totalTips;

            return (
              <TableRow key={earning.period}>
                <TableCell>{earning.period}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Badge variant="outline" className="flex items-center gap-1 w-fit">
                      <CreditCard className="h-3 w-3" />
                      {earning.rides.card}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1 w-fit">
                      <Banknote className="h-3 w-3" />
                      {earning.rides.cash}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-1">
                      <CreditCard className="h-3 w-3" />
                      {earning.earnings.card}€
                    </span>
                    <span className="flex items-center gap-1">
                      <Banknote className="h-3 w-3" />
                      {earning.earnings.cash}€
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-red-500">
                  -{commission.toFixed(2)}€
                </TableCell>
                <TableCell>
                  {netCardEarnings.toFixed(2)}€
                </TableCell>
                <TableCell>
                  {totalTips}€
                </TableCell>
                <TableCell className="font-medium">
                  {finalTotal.toFixed(2)}€
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-2">Notes importantes</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Les paiements sont effectués de façon hebdomadaire</li>
          <li>• La commission de 20% s'applique uniquement aux paiements par carte</li>
          <li>• Les pourboires ne sont pas soumis à commission</li>
          <li>• Les paiements en espèces sont conservés intégralement par le chauffeur</li>
        </ul>
      </div>
    </Card>
  );
};

export default Earnings;
