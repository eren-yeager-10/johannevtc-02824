
import { useEffect, useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: string;
  type: 'transaction' | 'driver' | 'order';
  message: string;
  timestamp: Date;
  read: boolean;
}

const AdminNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission | null>(null);

  // Simuler la réception de nouvelles notifications (à remplacer par une vraie API)
  useEffect(() => {
    const mockNewNotifications: Notification[] = [
      {
        id: '1',
        type: 'transaction',
        message: 'Nouvelle transaction : 45€ de Jean Dupont',
        timestamp: new Date(),
        read: false
      },
      {
        id: '2',
        type: 'driver',
        message: 'Nouveau chauffeur inscrit : Marie Martin',
        timestamp: new Date(),
        read: false
      }
    ];

    const interval = setInterval(() => {
      const randomNotif = mockNewNotifications[Math.floor(Math.random() * mockNewNotifications.length)];
      handleNewNotification({
        ...randomNotif,
        id: Date.now().toString(),
        timestamp: new Date()
      });
    }, 30000); // Toutes les 30 secondes pour la démo

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Demander la permission pour les notifications du navigateur
    if ("Notification" in window) {
      Notification.requestPermission().then(permission => {
        setNotificationPermission(permission);
      });
    }
  }, []);

  const handleNewNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev]);

    // Afficher un toast
    toast({
      title: "Nouvelle notification",
      description: notification.message,
    });

    // Notification du navigateur si autorisé
    if (notificationPermission === "granted") {
      new Notification("Administration VTC", {
        body: notification.message,
        icon: "/favicon.ico"
      });
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        <Bell className="h-6 w-6 text-gray-600" />
        {unreadCount > 0 && (
          <Badge 
            className="absolute -top-2 -right-2 px-2 py-1 text-xs bg-red-500"
          >
            {unreadCount}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default AdminNotification;
