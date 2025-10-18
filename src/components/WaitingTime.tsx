import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface WaitingTimeProps {
  vehicleType: string;
  pickup: string;
}

export const WaitingTime = ({ vehicleType, pickup }: WaitingTimeProps) => {
  const [waitingTime, setWaitingTime] = useState<number | null>(null);

  const calculateWaitingTime = () => {
    // Simulation of waiting time calculation based on vehicle type
    const baseTime = 5; // 5 minutes base
    const vehicleFactors: Record<string, number> = {
      berline: 1,
      suv: 1.2,
      van: 1.5,
      luxe: 1.3,
    };

    const factor = vehicleFactors[vehicleType] || 1;
    // Add random factor between 0.8 and 1.2
    const randomFactor = 0.8 + Math.random() * 0.4;
    
    return Math.round(baseTime * factor * randomFactor);
  };

  useEffect(() => {
    if (vehicleType && pickup) {
      const time = calculateWaitingTime();
      setWaitingTime(time);
    }
  }, [vehicleType, pickup]);

  if (!waitingTime) return null;

  return (
    <div className="flex items-center space-x-2 text-brand-blue">
      <Clock className="h-4 w-4" />
      <span className="text-sm font-medium">
        Estimated waiting time: {waitingTime} minutes
      </span>
    </div>
  );
};