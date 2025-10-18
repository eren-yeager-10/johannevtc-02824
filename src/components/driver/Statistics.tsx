import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Statistics = () => {
  const mockData = [
    { date: "Lun", rides: 12, earnings: 240 },
    { date: "Mar", rides: 15, earnings: 300 },
    { date: "Mer", rides: 10, earnings: 200 },
    { date: "Jeu", rides: 18, earnings: 360 },
    { date: "Ven", rides: 20, earnings: 400 },
    { date: "Sam", rides: 25, earnings: 500 },
    { date: "Dim", rides: 16, earnings: 320 },
  ];

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Statistiques hebdomadaires</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="rides"
              stroke="#8884d8"
              name="Courses"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="earnings"
              stroke="#82ca9d"
              name="Gains (€)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default Statistics;