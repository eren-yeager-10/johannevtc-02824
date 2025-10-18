import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Supabase credentials are missing');
}

const supabase = SUPABASE_URL && SUPABASE_ANON_KEY 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

interface Message {
  id: number;
  content: string;
  sender_id: string;
  created_at: string;
  sender_name: string;
}

export const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Bonjour, je suis en route vers votre position.",
      sender_id: "2",
      created_at: new Date(Date.now() - 3600000).toISOString(),
      sender_name: "Chauffeur Pierre"
    },
    {
      id: 2,
      content: "D'accord, je vous attends devant l'entrée principale.",
      sender_id: "1",
      created_at: new Date(Date.now() - 3500000).toISOString(),
      sender_name: "Client"
    },
    {
      id: 3,
      content: "Je serai là dans environ 5 minutes.",
      sender_id: "2",
      created_at: new Date(Date.now() - 3400000).toISOString(),
      sender_name: "Chauffeur Pierre"
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  // Simulons un utilisateur connecté (à remplacer par votre système d'auth)
  const currentUser = {
    id: '1',
    name: 'Client'
  };

  useEffect(() => {
    if (!supabase) {
      setError("La connexion à la base de données n'est pas disponible");
      return;
    }

    // Charger les messages existants
    const fetchMessages = async () => {
      const { data, error: fetchError } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (fetchError) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les messages",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        setMessages(data);
      }
    };

    fetchMessages();

    // Souscrire aux nouveaux messages
    const channel = supabase
      .channel('messages')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages' 
        }, 
        (payload) => {
          setMessages(current => [...current, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      toast({
        title: "Erreur",
        description: "La connexion à la base de données n'est pas disponible",
        variant: "destructive",
      });
      return;
    }
    
    if (!newMessage.trim()) return;

    const { error: sendError } = await supabase
      .from('messages')
      .insert([
        {
          content: newMessage,
          sender_id: currentUser.id,
          sender_name: currentUser.name
        }
      ]);

    if (sendError) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message",
        variant: "destructive",
      });
      return;
    }

    setNewMessage('');
  };

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto my-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col h-[500px] w-full max-w-md mx-auto border rounded-lg shadow-lg bg-white">
      <div className="p-4 border-b bg-brand-blue text-white rounded-t-lg">
        <h2 className="text-xl font-bold">Chat avec votre chauffeur</h2>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender_id === currentUser.id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender_id === currentUser.id
                    ? 'bg-brand-blue text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                <p className="text-sm font-semibold">{message.sender_name}</p>
                <p>{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(message.created_at).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={sendMessage} className="p-4 border-t">
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
