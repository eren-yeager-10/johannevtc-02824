import React from 'react';
import { Car, ArrowLeft } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const vehicles = [
  {
    type: "Berline Standard",
    description: "Confortable et économique",
    capacity: "4 passagers",
    price: "À partir de 15€",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&h=600"
  },
  {
    type: "Berline Premium",
    description: "Élégance et confort supérieur",
    capacity: "4 passagers",
    price: "À partir de 20€",
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&h=600"
  },
  {
    type: "SUV Compact",
    description: "Polyvalent et pratique",
    capacity: "5 passagers",
    price: "À partir de 18€",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&h=600"
  },
  {
    type: "SUV Premium",
    description: "Luxe et espace",
    capacity: "6 passagers",
    price: "À partir de 25€",
    image: "https://images.unsplash.com/photo-1670363550496-d54c4360d711?auto=format&fit=crop&w=800&h=600"
  },
  {
    type: "Van Standard",
    description: "Idéal pour les groupes",
    capacity: "8 passagers",
    price: "À partir de 25€",
    image: "https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?auto=format&fit=crop&w=800&h=600"
  },
  {
    type: "Van Premium",
    description: "Confort maximal en groupe",
    capacity: "8 passagers",
    price: "À partir de 30€",
    image: "https://images.unsplash.com/photo-1624812879332-d70f7f2a3094?auto=format&fit=crop&w=800&h=600"
  },
  {
    type: "Luxe Classique",
    description: "Pour vos occasions spéciales",
    capacity: "4 passagers",
    price: "À partir de 35€",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&h=600"
  },
  {
    type: "Luxe Sport",
    description: "Performance et prestige",
    capacity: "2 passagers",
    price: "À partir de 40€",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&h=600"
  },
  {
    type: "Électrique Compact",
    description: "Écologique et moderne",
    capacity: "4 passagers",
    price: "À partir de 17€",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&h=600"
  },
  {
    type: "Électrique Premium",
    description: "Luxe éco-responsable",
    capacity: "5 passagers",
    price: "À partir de 28€",
    image: "https://images.unsplash.com/photo-1687141572261-4aa4c5f89c3a?auto=format&fit=crop&w=800&h=600"
  },
  {
    type: "Hybride Berline",
    description: "Le meilleur des deux mondes",
    capacity: "4 passagers",
    price: "À partir de 19€",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&h=600"
  },
  {
    type: "Hybride SUV",
    description: "Économique et spacieux",
    capacity: "6 passagers",
    price: "À partir de 24€",
    image: "https://images.unsplash.com/photo-1633859947324-d1120d7e6d24?auto=format&fit=crop&w=800&h=600"
  },
  {
    type: "Minibus Standard",
    description: "Transport de groupe",
    capacity: "12 passagers",
    price: "À partir de 35€",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&h=600"
  },
  {
    type: "Minibus Premium",
    description: "Confort pour grands groupes",
    capacity: "12 passagers",
    price: "À partir de 40€",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&h=600"
  },
  {
    type: "Berline Business",
    description: "Pour vos déplacements professionnels",
    capacity: "4 passagers",
    price: "À partir de 22€",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&h=600"
  },
  {
    type: "SUV Business",
    description: "Confort et prestance",
    capacity: "5 passagers",
    price: "À partir de 27€",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&h=600"
  },
  {
    type: "Limousine Standard",
    description: "Élégance et raffinement",
    capacity: "6 passagers",
    price: "À partir de 45€",
    image: "https://images.unsplash.com/photo-1539799139339-50c5fe1e2b1b?auto=format&fit=crop&w=800&h=600"
  },
  {
    type: "Limousine Premium",
    description: "Le summum du luxe",
    capacity: "8 passagers",
    price: "À partir de 55€",
    image: "https://images.unsplash.com/photo-1539799139339-50c5fe1e2b1b?auto=format&fit=crop&w=800&h=600"
  },
  {
    type: "Cabriolet",
    description: "Pour les beaux jours",
    capacity: "4 passagers",
    price: "À partir de 32€",
    image: "https://images.unsplash.com/photo-1501066927591-314112b5888e?auto=format&fit=crop&w=800&h=600"
  },
  {
    type: "Coupé Sport",
    description: "Style et performance",
    capacity: "2 passagers",
    price: "À partir de 38€",
    image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&h=600"
  },
  {
    type: "4x4 Aventure",
    description: "Pour tous les terrains",
    capacity: "5 passagers",
    price: "À partir de 29€",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&h=600"
  },
  {
    type: "Navette Aéroport",
    description: "Transport aéroport dédié",
    capacity: "8 passagers",
    price: "À partir de 28€",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&h=600"
  },
  {
    type: "Van Luxe",
    description: "Transport VIP en groupe",
    capacity: "7 passagers",
    price: "À partir de 42€",
    image: "https://images.unsplash.com/photo-1624812879332-d70f7f2a3094?auto=format&fit=crop&w=800&h=600"
  },
  {
    type: "Berline Familiale",
    description: "Idéal pour les familles",
    capacity: "5 passagers",
    price: "À partir de 21€",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&h=600"
  }
];

const Fleet = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Car className="h-4 w-4" />
          Notre Flotte
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="absolute left-4 top-4">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Retour</span>
            </Button>
          </DialogClose>
          <DialogTitle className="text-2xl font-uber text-center flex-grow">
            Notre Flotte de Véhicules
          </DialogTitle>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.type}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-fade-in"
            >
              <div className="relative h-48 mb-4 overflow-hidden rounded-md">
                <img
                  src={vehicle.image}
                  alt={vehicle.type}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-uber font-semibold mb-2">{vehicle.type}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{vehicle.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{vehicle.capacity}</p>
              <p className="text-brand-blue dark:text-blue-400 font-semibold">{vehicle.price}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Fleet;