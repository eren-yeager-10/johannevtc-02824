
import { Menu, X, Shield, CarTaxiFront, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-background z-50 border-b border-border animate-in">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-2xl font-brand font-bold text-primary">
            <div className="relative">
              <CarTaxiFront size={32} />
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
                J
              </span>
            </div>
            <span>Johanne VTC</span>
          </Link>
          
          {/* Desktop Menu with ScrollArea */}
          <div className="hidden md:block flex-1 max-w-3xl">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex items-center space-x-8 px-4">
                <Link to="#" className="nav-link text-foreground shrink-0">Entreprise</Link>
                <Link to="#" className="nav-link text-foreground shrink-0">Sécurité</Link>
                <Link to="#" className="nav-link text-foreground shrink-0">Aide</Link>
                <Link to="/fleet-signup" className="flex items-center gap-2 btn-primary shrink-0">
                  <Users size={20} />
                  <span>Membre de la flotte</span>
                </Link>
                <Link to="/become-driver" className="btn-primary shrink-0">Become a Driver</Link>
                <Link to="/book" className="btn-secondary shrink-0">Book</Link>
                <Link 
                  to="/admin/dashboard" 
                  className="flex items-center gap-2 nav-link text-foreground hover:text-primary transition-colors shrink-0"
                  title="Accès Administration"
                >
                  <Shield size={20} />
                  <span>Admin</span>
                </Link>
                <ThemeToggle />
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button 
              className="text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-in slide-in">
            <Link to="#" className="block nav-link text-foreground">Entreprise</Link>
            <Link to="#" className="block nav-link text-foreground">Sécurité</Link>
            <Link to="#" className="block nav-link text-foreground">Aide</Link>
            <Link to="/fleet-signup" className="block w-full btn-primary text-center">
              <div className="flex items-center justify-center gap-2">
                <Users size={20} />
                <span>Membre de la flotte</span>
              </div>
            </Link>
            <Link to="/become-driver" className="block w-full btn-primary text-center">Become a Driver</Link>
            <Link to="/book" className="block w-full btn-secondary text-center">Book</Link>
            <Link 
              to="/admin/dashboard" 
              className="block w-full text-center nav-link text-foreground hover:text-primary transition-colors"
            >
              <div className="flex items-center justify-center gap-2">
                <Shield size={20} />
                <span>Administration</span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
