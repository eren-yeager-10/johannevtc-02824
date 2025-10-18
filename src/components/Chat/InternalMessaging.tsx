
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Mail } from "lucide-react";

interface InternalMessage {
  id: string;
  sender: string;
  recipient: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export const InternalMessaging = () => {
  const [messages, setMessages] = useState<InternalMessage[]>([
    {
      id: "1",
      sender: "Support",
      recipient: "Utilisateur",
      content: "Bonjour, comment pouvons-nous vous aider aujourd'hui ?",
      timestamp: new Date(Date.now() - 86400000),
      read: true
    },
    {
      id: "2",
      sender: "Utilisateur",
      recipient: "Support",
      content: "J'ai oublié un objet dans le véhicule hier soir.",
      timestamp: new Date(Date.now() - 82800000),
      read: true
    },
    {
      id: "3",
      sender: "Support",
      recipient: "Utilisateur",
      content: "Je comprends. Pouvez-vous me donner plus de détails sur l'objet et l'heure de votre course ?",
      timestamp: new Date(Date.now() - 79200000),
      read: true
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: InternalMessage = {
      id: Date.now().toString(),
      sender: 'Utilisateur',
      recipient: 'Support',
      content: newMessage,
      timestamp: new Date(),
      read: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé avec succès.",
    });
  };

  return (
    <div className="flex flex-col h-[400px] w-full max-w-md mx-auto border rounded-lg bg-white shadow-lg">
      <div className="p-4 border-b bg-green-600 text-white rounded-t-lg flex items-center gap-2">
        <Mail className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Messagerie Interne</h2>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'Utilisateur' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'Utilisateur'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm font-semibold">{message.sender}</p>
                <p>{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Écrivez votre message..."
            className="flex-1"
          />
          <Button type="submit">
            Envoyer
          </Button>
        </div>
      </form>
    </div>
  );
};
