
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  Wallet, 
  Banknote, 
  Check, 
  Apple, 
  CircleDollarSign, 
  Landmark 
} from "lucide-react";
import { PaymentMethodCard } from "./PaymentMethodCard";
import { SplitPaymentDialog } from "./SplitPaymentDialog";

interface PaymentOptionsProps {
  amount: number;
  onPaymentComplete?: () => void;
}

export const PaymentOptions = ({ amount, onPaymentComplete }: PaymentOptionsProps) => {
  const { toast } = useToast();
  const [showCashOption, setShowCashOption] = useState(false);
  const [showSplitPayment, setShowSplitPayment] = useState(false);
  const [splitCount, setSplitCount] = useState(2);

  const handlePayment = async (method: string) => {
    try {
      // Simuler un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Paiement réussi",
        description: `Votre paiement de ${amount.toFixed(2)}€ par ${method} a été traité avec succès`,
      });

      if (method === 'espèces') {
        setShowCashOption(true);
      }

      if (onPaymentComplete) {
        onPaymentComplete();
      }
    } catch (error) {
      toast({
        title: "Erreur de paiement",
        description: "Une erreur est survenue lors du traitement du paiement. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const handleSplitChange = (newSplitCount: number) => {
    setSplitCount(newSplitCount);
  };

  return (
    <div className="space-y-6 p-2 sm:p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <PaymentMethodCard
          icon={CreditCard}
          title="Carte Bancaire"
          description="CB, Visa, Mastercard"
          buttonText={`Payer ${amount.toFixed(2)}€`}
          onPayment={() => handlePayment('carte bancaire')}
        />

        <PaymentMethodCard
          icon={Banknote}
          title="Espèces"
          description="Paiement au chauffeur"
          buttonText="Payer en espèces"
          buttonClassName="bg-green-600 hover:bg-green-700"
          onPayment={() => handlePayment('espèces')}
        />

        <PaymentMethodCard
          icon={CircleDollarSign}
          title="PayPal"
          description="Paiement sécurisé PayPal"
          buttonText={`Payer ${amount.toFixed(2)}€`}
          buttonClassName="bg-blue-500 hover:bg-blue-600"
          onPayment={() => handlePayment('PayPal')}
        />

        <PaymentMethodCard
          icon={Landmark}
          title="Chèque"
          description="Paiement par chèque"
          buttonText={`Payer ${amount.toFixed(2)}€`}
          buttonClassName="bg-purple-600 hover:bg-purple-700"
          onPayment={() => handlePayment('chèque')}
        />

        <PaymentMethodCard
          icon={Apple}
          title="Apple Pay"
          description="Paiement rapide et sécurisé"
          buttonText={`Payer ${amount.toFixed(2)}€`}
          buttonClassName="bg-black hover:bg-gray-800"
          onPayment={() => handlePayment('Apple Pay')}
        />

        <PaymentMethodCard
          icon={Wallet}
          title="Lydia / Pumpkin"
          description="Applications de paiement mobile"
          buttonText={`Payer ${amount.toFixed(2)}€`}
          buttonClassName="bg-pink-600 hover:bg-pink-700"
          onPayment={() => handlePayment('Lydia')}
        />
      </div>

      <SplitPaymentDialog
        amount={amount}
        splitCount={splitCount}
        onSplitChange={handleSplitChange}
        open={showSplitPayment}
        onOpenChange={setShowSplitPayment}
      />

      {showCashOption && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            Important : Pour le paiement en espèces, veuillez :
            <ul className="list-disc pl-5 mt-2">
              <li>Préparer le montant exact de {amount.toFixed(2)}€</li>
              <li>Avoir la somme sur vous avant le début de la course</li>
              <li>Le chauffeur ne peut pas garantir d'avoir de la monnaie</li>
            </ul>
          </p>
        </div>
      )}
    </div>
  );
};
