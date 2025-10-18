import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { MessageSquare } from "lucide-react";

interface Message {
  content: string;
  isBot: boolean;
  timestamp: Date;
}

export const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
      isBot: true,
      timestamp: new Date(Date.now() - 7200000)
    },
    {
      content: "J'aimerais connaître les tarifs pour une course.",
      isBot: false,
      timestamp: new Date(Date.now() - 7100000)
    },
    {
      content: "Je peux vous aider avec ça. Les tarifs dépendent de la distance et du type de véhicule. Pour une estimation précise, pourriez-vous me donner votre point de départ et d'arrivée ?",
      isBot: true,
      timestamp: new Date(Date.now() - 7000000)
    }
  ]);
  const [input, setInput] = useState('');
  const { toast } = useToast();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      content: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const botMessage: Message = {
        content: "Je suis là pour vous aider. Comment puis-je vous assister aujourd'hui ?",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[400px] w-full max-w-md mx-auto border rounded-lg bg-white shadow-lg">
      <div className="p-4 border-b bg-blue-600 text-white rounded-t-lg flex items-center gap-2">
        <MessageSquare className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Assistant IA</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isBot
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-blue-600 text-white'
              }`}
            >
              <p>{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question..."
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
