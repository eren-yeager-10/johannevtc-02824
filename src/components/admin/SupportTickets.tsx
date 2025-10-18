
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InternalMessaging } from "@/components/Chat/InternalMessaging";
import { ReviewsList } from "@/components/ReviewsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Star, Flag } from "lucide-react";

const SupportTickets = () => {
  // Données simulées pour la démonstration
  const tickets = [
    {
      id: "1",
      title: "Objet perdu dans le véhicule",
      status: "En attente",
      priority: "Moyenne",
      created: "2024-02-10",
      customer: "Jean Martin",
    },
    {
      id: "2",
      title: "Problème de facturation",
      status: "En cours",
      priority: "Haute",
      created: "2024-02-09",
      customer: "Marie Dubois",
    },
    {
      id: "3",
      title: "Retard important",
      status: "Résolu",
      priority: "Basse",
      created: "2024-02-08",
      customer: "Pierre Lambert",
    }
  ];

  const reviews = [
    {
      id: "1",
      rating: 4,
      comment: "Excellent service, chauffeur très professionnel",
      userName: "Sophie B.",
      date: "10/02/2024"
    },
    {
      id: "2",
      rating: 5,
      comment: "Course parfaite, à l'heure et très agréable",
      userName: "Michel D.",
      date: "09/02/2024"
    },
    {
      id: "3",
      rating: 3,
      comment: "Service correct mais retard au départ",
      userName: "Anne L.",
      date: "08/02/2024"
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Support Client & Réclamations</h2>

      <Tabs defaultValue="tickets" className="w-full">
        <TabsList>
          <TabsTrigger value="tickets" className="flex items-center gap-2">
            <Flag className="h-4 w-4" />
            Tickets
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Avis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tickets">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <Input
                placeholder="Rechercher un ticket..."
                className="max-w-sm"
              />
              <Button>Nouveau Ticket</Button>
            </div>
            
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <Card key={ticket.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{ticket.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Client: {ticket.customer}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 rounded text-sm ${
                          ticket.status === 'En cours' ? 'bg-yellow-100 text-yellow-800' :
                          ticket.status === 'Résolu' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {ticket.status}
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">
                          {ticket.created}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>

        <TabsContent value="chat">
          <Card className="p-6">
            <InternalMessaging />
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Avis Récents</h3>
              <Button variant="outline">Exporter les Avis</Button>
            </div>
            <ReviewsList reviews={reviews} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupportTickets;
