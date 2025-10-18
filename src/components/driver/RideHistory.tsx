import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const RideHistory = () => {
  const mockHistory = [
    {
      id: "1",
      date: "2024-03-20",
      passenger: "Marie Martin",
      pickup: "Gare du Nord",
      destination: "CDG Airport",
      amount: "45€",
      status: "completed",
    },
    {
      id: "2",
      date: "2024-03-19",
      passenger: "Pierre Durand",
      pickup: "Eiffel Tower",
      destination: "Arc de Triomphe",
      amount: "25€",
      status: "completed",
    },
  ];

  return (
    <Card className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Passenger</TableHead>
            <TableHead>Pickup</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockHistory.map((ride) => (
            <TableRow key={ride.id}>
              <TableCell>{ride.date}</TableCell>
              <TableCell>{ride.passenger}</TableCell>
              <TableCell>{ride.pickup}</TableCell>
              <TableCell>{ride.destination}</TableCell>
              <TableCell>{ride.amount}</TableCell>
              <TableCell>{ride.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default RideHistory;