
import { Card } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StarIcon, Truck, MapPin, Users } from "lucide-react";

const PerformanceStats = () => {
  // Données simulées pour la démonstration
  const performanceData = [
    { date: 'Lun', courses: 45, revenu: 900, satisfaction: 4.8 },
    { date: 'Mar', courses: 38, revenu: 760, satisfaction: 4.7 },
    { date: 'Mer', courses: 52, revenu: 1040, satisfaction: 4.9 },
    { date: 'Jeu', courses: 41, revenu: 820, satisfaction: 4.6 },
    { date: 'Ven', courses: 55, revenu: 1100, satisfaction: 4.8 },
    { date: 'Sam', courses: 64, revenu: 1280, satisfaction: 4.7 },
    { date: 'Dim', courses: 48, revenu: 960, satisfaction: 4.9 },
  ];

  const topDrivers = [
    { id: 1, name: "Jean Dupont", courses: 145, rating: 4.9, revenue: 2900 },
    { id: 2, name: "Marie Martin", courses: 132, rating: 4.8, revenue: 2640 },
    { id: 3, name: "Pierre Lambert", courses: 128, rating: 4.8, revenue: 2560 },
    { id: 4, name: "Sophie Bernard", courses: 125, rating: 4.7, revenue: 2500 },
    { id: 5, name: "Lucas Petit", courses: 120, rating: 4.7, revenue: 2400 },
  ];

  const regionData = [
    { region: "Paris Centre", courses: 250 },
    { region: "Paris Nord", courses: 180 },
    { region: "Paris Sud", courses: 160 },
    { region: "Paris Est", courses: 140 },
    { region: "Paris Ouest", courses: 170 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Suivi des Performances</h2>
      
      {/* KPIs principaux */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Courses Totales</p>
              <h3 className="text-2xl font-bold">343</h3>
            </div>
            <Truck className="h-8 w-8 text-primary opacity-75" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Revenue Total</p>
              <h3 className="text-2xl font-bold">6,860€</h3>
            </div>
            <svg className="h-8 w-8 text-primary opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Note Moyenne</p>
              <h3 className="text-2xl font-bold flex items-center gap-1">
                4.8
                <StarIcon className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              </h3>
            </div>
            <Users className="h-8 w-8 text-primary opacity-75" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Zones Actives</p>
              <h3 className="text-2xl font-bold">5</h3>
            </div>
            <MapPin className="h-8 w-8 text-primary opacity-75" />
          </div>
        </Card>
      </div>

      {/* Graphiques de performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Évolution Hebdomadaire</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="courses" stroke="#8884d8" name="Courses" />
                <Line yAxisId="right" type="monotone" dataKey="revenu" stroke="#82ca9d" name="Revenu (€)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Répartition par Zone</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="courses" fill="#8884d8" name="Nombre de courses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Tableau des meilleurs chauffeurs */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Top 5 des Chauffeurs</h3>
        <ScrollArea className="h-[300px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Chauffeur</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Revenus</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topDrivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell>{driver.name}</TableCell>
                  <TableCell>{driver.courses}</TableCell>
                  <TableCell className="flex items-center gap-1">
                    {driver.rating}
                    <StarIcon className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  </TableCell>
                  <TableCell>{driver.revenue}€</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default PerformanceStats;
