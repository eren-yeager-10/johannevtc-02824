
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BecomeDriver from "./pages/BecomeDriver";
import Book from "./pages/Book";
import DriverDashboard from "./pages/DriverDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./components/admin/AdminLogin";
import RemoveLovableBadge from "./components/admin/RemoveLovableBadge";
import FleetSignup from "./pages/FleetSignup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="johanne-vtc-theme">
      <TooltipProvider>
        <RemoveLovableBadge />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/become-driver" element={<BecomeDriver />} />
            <Route path="/fleet-signup" element={<FleetSignup />} />
            <Route path="/book" element={<Book />} />
            <Route path="/driver/dashboard" element={<DriverDashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
