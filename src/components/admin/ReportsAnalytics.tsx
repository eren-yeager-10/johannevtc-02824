import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ReportsAnalytics = () => {
  const data = [
    { name: 'Jan', courses: 400, revenus: 2400 },
    { name: 'Fév', courses: 300, revenus: 1398 },
    { name: 'Mar', courses: 500, revenus: 9800 },
    { name: 'Avr', courses: 278, revenus: 3908 },
    { name: 'Mai', courses: 189, revenus: 4800 },
    { name: 'Jun', courses: 239, revenus: 3800 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Rapports et analyses</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2">Courses totales</h3>
          <p className="text-3xl font-bold">1,906</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2">Revenus totaux</h3>
          <p className="text-3xl font-bold">26,106€</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2">Chauffeurs actifs</h3>
          <p className="text-3xl font-bold">42</p>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Évolution des courses et revenus</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="courses" stroke="#8884d8" name="Courses" />
              <Line yAxisId="right" type="monotone" dataKey="revenus" stroke="#82ca9d" name="Revenus (€)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default ReportsAnalytics;