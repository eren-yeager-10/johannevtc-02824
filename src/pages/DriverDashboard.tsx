
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import DriverMap from "@/components/driver/DriverMap";
import CurrentRides from "@/components/driver/CurrentRides";
import RideHistory from "@/components/driver/RideHistory";
import Earnings from "@/components/driver/Earnings";
import Ratings from "@/components/driver/Ratings";
import Statistics from "@/components/driver/Statistics";
import Documents from "@/components/driver/Documents";
import Availability from "@/components/driver/Availability";
import ZonePreferences from "@/components/driver/ZonePreferences";
import VirtualAccount from "@/components/driver/VirtualAccount";

const DriverDashboard = () => {
  const [isOnline, setIsOnline] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="container mx-auto p-4 space-y-4 sm:space-y-6 pt-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Tableau de bord</h1>
        <div className="flex items-center gap-4">
          <Label htmlFor="online-status" className="whitespace-nowrap">
            {isOnline ? "En ligne" : "Hors ligne"}
          </Label>
          <Switch
            id="online-status"
            checked={isOnline}
            onCheckedChange={setIsOnline}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="lg:col-span-2 p-4">
          <DriverMap />
        </Card>
        <Card className="p-4">
          <CurrentRides />
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Statistics />
        <Documents />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Availability />
        <ZonePreferences />
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="w-full flex flex-wrap justify-start gap-2">
          <TabsTrigger value="account" className="flex-1 sm:flex-none">Compte virtuel</TabsTrigger>
          <TabsTrigger value="history" className="flex-1 sm:flex-none">Historique</TabsTrigger>
          <TabsTrigger value="earnings" className="flex-1 sm:flex-none">Revenus</TabsTrigger>
          <TabsTrigger value="ratings" className="flex-1 sm:flex-none">Évaluations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <VirtualAccount />
        </TabsContent>
        
        <TabsContent value="history">
          <RideHistory />
        </TabsContent>
        
        <TabsContent value="earnings">
          <Earnings />
        </TabsContent>
        
        <TabsContent value="ratings">
          <Ratings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DriverDashboard;
