
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const AdminHeader = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem("adminEmail");
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès",
    });
    navigate("/");
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 mb-2 sm:mb-6 bg-white dark:bg-gray-800 p-3 sm:p-6 rounded-lg shadow-sm">
      <h1 className="text-xl xs:text-2xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        Administration
      </h1>
      <Button 
        variant="outline" 
        onClick={handleLogout}
        className="w-full sm:w-auto gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all text-sm sm:text-base py-1 sm:py-2"
      >
        <LogOut className="h-4 w-4" />
        Déconnexion
      </Button>
    </div>
  );
};
