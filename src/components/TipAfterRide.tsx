import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Coins } from "lucide-react";

interface TipAfterRideProps {
  rideAmount: number;
  onTipSubmit: (amount: number) => void;
}

export const TipAfterRide = ({ rideAmount, onTipSubmit }: TipAfterRideProps) => {
  const { toast } = useToast();
  const [tipAmount, setTipAmount] = useState(0);
  const tipPercentages = [0, 5, 10, 15, 20];

  const handleTipChange = (percentage: number) => {
    const tipValue = (rideAmount * percentage) / 100;
    setTipAmount(tipValue);
  };

  const handleSubmitTip = () => {
    onTipSubmit(tipAmount);
    toast({
      title: "Merci pour votre pourboire !",
      description: `Un pourboire de ${tipAmount.toFixed(2)}€ a été ajouté.`,
    });
  };

  return (
    <Card className="p-4">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-5 w-5" />
          Pourboire
        </CardTitle>
        <CardDescription>Ajoutez un pourboire pour remercier votre chauffeur</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          {tipPercentages.map((percentage) => (
            <Button
              key={percentage}
              variant={tipAmount === (rideAmount * percentage) / 100 ? "default" : "outline"}
              onClick={() => handleTipChange(percentage)}
              className="w-16"
            >
              {percentage}%
            </Button>
          ))}
        </div>
        <div className="text-right text-sm text-muted-foreground mb-4">
          Pourboire: {tipAmount.toFixed(2)}€
        </div>
        <Button 
          onClick={handleSubmitTip}
          className="w-full bg-brand-blue hover:bg-brand-blue/90"
        >
          Confirmer le pourboire
        </Button>
      </CardContent>
    </Card>
  );
};