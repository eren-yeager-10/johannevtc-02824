
import { useEffect, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface PriceCalculatorProps {
  pickup: string;
  destination: string;
  onPriceCalculated: (price: number) => void;
}

export const PriceCalculator = ({ pickup, destination, onPriceCalculated }: PriceCalculatorProps) => {
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();

  const simulateDistance = (start: string, end: string): number => {
    // Simulation simple basée sur la longueur des adresses
    // Plus les adresses sont différentes, plus la distance est grande
    const difference = Math.abs(start.length - end.length);
    const baseDistance = Math.max(5, difference * 2); // Distance minimum de 5km
    return baseDistance + Math.random() * 10; // Ajoute un facteur aléatoire
  };

  const simulateTrafficTime = (distance: number): number => {
    // Simulation du temps de trajet en minutes
    const baseTime = distance * 2; // 2 minutes par km en moyenne
    const trafficFactor = 1 + (Math.random() * 0.5); // Facteur de trafic aléatoire entre 1 et 1.5
    return baseTime * trafficFactor;
  };

  const calculatePrice = async () => {
    if (!pickup || !destination) return;
    
    setIsCalculating(true);
    try {
      // Simulation de la distance
      const distanceInKm = simulateDistance(pickup, destination);
      // Simulation du temps de trajet
      const durationInMinutes = simulateTrafficTime(distanceInKm);
      
      // Prix de base
      const BASE_PRICE = 5;
      // Prix par kilomètre
      const PRICE_PER_KM = 1.5;
      // Prix par minute
      const PRICE_PER_MINUTE = 0.5;
      
      // Calculer le prix total
      const price = BASE_PRICE + 
                   (distanceInKm * PRICE_PER_KM) + 
                   (durationInMinutes * PRICE_PER_MINUTE);
      
      // Arrondir à 2 décimales
      const roundedPrice = Math.round(price * 100) / 100;
      
      onPriceCalculated(roundedPrice);
      
      toast({
        title: "Prix estimé calculé",
        description: `Distance estimée: ${distanceInKm.toFixed(1)}km, Durée estimée: ${Math.round(durationInMinutes)}min`,
      });
    } catch (error) {
      console.error('Erreur lors du calcul du prix:', error);
      toast({
        title: "Erreur",
        description: "Impossible de calculer le prix pour le moment.",
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    if (pickup && destination) {
      calculatePrice();
    }
  }, [pickup, destination]);

  return null;
};
