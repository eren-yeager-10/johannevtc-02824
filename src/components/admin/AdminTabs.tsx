
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MessageSquare, Percent, MapPin, Wallet, Award, History, Car, ChartBar, Target, Users } from "lucide-react";
import { useRef } from "react";

const tabItems = [
  { value: "rides", label: "Courses", icon: Car },
  { value: "history", label: "Historique", icon: History },
  { value: "analytics", label: "Tableau de bord", icon: ChartBar },
  { value: "performance", label: "Performance", icon: Target },
  { value: "bonus", label: "Bonus", icon: Award },
  { value: "support", label: "Support", icon: MessageSquare },
  { value: "users", label: "Utilisateurs", icon: Users },
  { value: "payments", label: "Paiements", icon: Wallet },
  { value: "virtual", label: "Compte Virtuel", icon: Wallet },
  { value: "promotions", label: "Promotions", icon: Percent },
  { value: "zones", label: "Zones", icon: MapPin },
];

export const AdminTabs = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full overflow-hidden">
      <ScrollArea className="w-full whitespace-nowrap rounded-lg bg-white dark:bg-gray-800 shadow-sm">
        <div ref={scrollContainerRef} className="overflow-x-auto">
          <TabsList className="h-auto p-2 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {tabItems.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center justify-start gap-2 px-3 py-2.5 w-full text-left rounded-lg transition-all data-[state=active]:bg-[#0EA5E9] data-[state=active]:text-white hover:bg-[#0EA5E9]/10"
              >
                {tab.icon && <tab.icon className="h-4 w-4 shrink-0" />}
                <span className="truncate">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <ScrollBar orientation="horizontal" className="hidden md:flex" />
      </ScrollArea>
    </div>
  );
};
