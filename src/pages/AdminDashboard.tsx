
import { Tabs } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { AdminTabsContent } from "@/components/admin/AdminTabsContent";
import AdminNotification from "@/components/admin/AdminNotification";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminEmail = localStorage.getItem("adminEmail");
    console.log("Checking admin authentication...");
    
    if (!adminEmail || !adminEmail.endsWith("@admin.com")) {
      console.log("Admin authentication failed, redirecting to login...");
      navigate("/admin/login");
    } else {
      console.log("Admin authenticated:", adminEmail);
    }
  }, [navigate]);

  return (
    <ScrollArea className="w-full h-screen">
      <AdminNotification />
      <div className="container mx-auto px-2 sm:px-4 py-2 space-y-4 pt-16 min-w-[300px]">
        <AdminHeader />
        <Tabs defaultValue="rides" className="w-full">
          <AdminTabs />
          <AdminTabsContent />
        </Tabs>
      </div>
    </ScrollArea>
  );
};

export default AdminDashboard;
