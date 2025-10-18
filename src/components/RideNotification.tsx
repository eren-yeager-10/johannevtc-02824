
import { useEffect, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Timer, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RideNotificationProps {
  estimatedTime?: number; // en minutes
  rideId?: string;
}

export const RideNotification = ({ estimatedTime = 5, rideId }: RideNotificationProps) => {
  const [timeLeft, setTimeLeft] = useState(estimatedTime * 60); // Conversion en secondes
  const { toast } = useToast();
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission | null>(null);

  useEffect(() => {
    // Demander la permission pour les notifications
    if ("Notification" in window) {
      Notification.requestPermission().then(permission => {
        setNotificationPermission(permission);
      });
    }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      // Notification toast
      toast({
        title: "Votre chauffeur est arrivé !",
        description: "Votre course vous attend.",
      });

      // Notification du navigateur
      if (notificationPermission === "granted") {
        new Notification("Votre chauffeur est arrivé !", {
          body: "Votre course vous attend.",
          icon: "/favicon.ico",
        });

        // Jouer un son
        const audio = new Audio("/notification-sound.mp3");
        audio.play().catch(e => console.log("Erreur lors de la lecture du son:", e));
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, notificationPermission]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow animate-fade-in">
      <Timer className="w-5 h-5 text-brand-blue" />
      <Badge variant="secondary" className="text-lg font-semibold">
        {formatTime(timeLeft)}
      </Badge>
      <Bell className={`w-5 h-5 ${timeLeft <= 60 ? 'text-red-500 animate-bounce' : 'text-gray-400'}`} />
    </div>
  );
};
