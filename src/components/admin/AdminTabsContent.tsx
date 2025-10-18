
import { TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import UserManagement from "./UserManagement";
import PaymentManagement from "./PaymentManagement";
import ReportsAnalytics from "./ReportsAnalytics";
import RideRequests from "./RideRequests";
import RideHistory from "./RideHistory";
import PerformanceStats from "./PerformanceStats";
import SupportTickets from "./SupportTickets";
import PromotionsManagement from "./PromotionsManagement";
import ZonesManagement from "./ZonesManagement";
import VirtualAccountAdmin from "./VirtualAccountAdmin";
import BonusManagement from "./BonusManagement";

export const AdminTabsContent = () => {
  return (
    <div className="mt-4 space-y-4">
      <TabsContent value="rides">
        <Card className="p-2 sm:p-4 shadow-lg border-0">
          <RideRequests />
        </Card>
      </TabsContent>

      <TabsContent value="history">
        <Card className="p-2 sm:p-4 shadow-lg border-0">
          <RideHistory />
        </Card>
      </TabsContent>

      <TabsContent value="analytics">
        <Card className="p-2 sm:p-4 shadow-lg border-0">
          <ReportsAnalytics />
        </Card>
      </TabsContent>

      <TabsContent value="performance">
        <Card className="p-2 sm:p-4 shadow-lg border-0">
          <PerformanceStats />
        </Card>
      </TabsContent>

      <TabsContent value="bonus">
        <Card className="p-2 sm:p-4 shadow-lg border-0">
          <BonusManagement />
        </Card>
      </TabsContent>

      <TabsContent value="support">
        <Card className="p-2 sm:p-4 shadow-lg border-0">
          <SupportTickets />
        </Card>
      </TabsContent>
      
      <TabsContent value="users">
        <Card className="p-2 sm:p-4 shadow-lg border-0">
          <UserManagement />
        </Card>
      </TabsContent>
      
      <TabsContent value="payments">
        <Card className="p-2 sm:p-4 shadow-lg border-0">
          <PaymentManagement />
        </Card>
      </TabsContent>

      <TabsContent value="virtual">
        <Card className="p-2 sm:p-4 shadow-lg border-0">
          <VirtualAccountAdmin />
        </Card>
      </TabsContent>

      <TabsContent value="promotions">
        <Card className="p-2 sm:p-4 shadow-lg border-0">
          <PromotionsManagement />
        </Card>
      </TabsContent>

      <TabsContent value="zones">
        <Card className="p-2 sm:p-4 shadow-lg border-0">
          <ZonesManagement />
        </Card>
      </TabsContent>
    </div>
  );
};
