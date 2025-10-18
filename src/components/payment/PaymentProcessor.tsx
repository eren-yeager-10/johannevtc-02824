
import { useToast } from "@/hooks/use-toast";

interface PaymentProcessorProps {
  amount: number;
  rideId: string;
  clientInfo: {
    name: string;
    address: string;
  };
  rideInfo: {
    pickupAddress: string;
    destinationAddress: string;
    distance: number;
    date: string;
    time: string;
  };
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
}

export const PaymentProcessor = ({ 
  amount, 
  rideId,
  clientInfo,
  rideInfo,
  onSuccess, 
  onError 
}: PaymentProcessorProps) => {
  const { toast } = useToast();
  const COMMISSION_RATE = 0.20; // 20% de commission

  const calculateNetAmount = (grossAmount: number) => {
    const commission = grossAmount * COMMISSION_RATE;
    return grossAmount - commission;
  };

  const verifyCardBalance = async (cardNumber: string): Promise<boolean> => {
    try {
      // Simulation d'une vérification de solde bancaire
      const response = await fetch(`/api/check-balance/${cardNumber}`);
      const data = await response.json();
      return data.hasBalance;
    } catch (error) {
      console.error("Erreur lors de la vérification du solde:", error);
      return false;
    }
  };

  const verifyBalance = async (cardNumber: string): Promise<boolean> => {
    const hasValidBalance = await verifyCardBalance(cardNumber);
    if (!hasValidBalance) {
      toast({
        title: "Solde insuffisant",
        description: "Le compte bancaire associé à cette carte ne dispose pas d'un solde suffisant.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const blockAmount = async (amount: number): Promise<boolean> => {
    // Simulation de blocage du montant
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.05;
        if (success) {
          toast({
            title: "Montant bloqué",
            description: `${amount}€ ont été bloqués sur votre carte`,
          });
        }
        resolve(success);
      }, 1000);
    });
  };

  const generateOrderConfirmation = () => {
    const grossAmount = amount;
    const netAmount = calculateNetAmount(amount);
    const commission = amount * COMMISSION_RATE;

    return {
      orderNumber: `CMD-${Date.now()}`,
      clientName: clientInfo.name,
      clientAddress: clientInfo.address,
      pickupAddress: rideInfo.pickupAddress,
      destinationAddress: rideInfo.destinationAddress,
      distance: rideInfo.distance,
      date: rideInfo.date,
      time: rideInfo.time,
      grossAmount,
      commission,
      netAmount,
      status: "en attente"
    };
  };

  const generateInvoice = (orderConfirmation: any, driverId: string) => {
    return {
      invoiceNumber: `FAC-${Date.now()}`,
      ...orderConfirmation,
      driverId,
      paymentMethod: "Carte bancaire",
      status: "payée",
      dateFacturation: new Date().toISOString(),
      companyName: "Johanne VTC",
      companyAddress: "Adresse de la société"
    };
  };

  const processPayment = async (cardNumber: string, driverId: string) => {
    try {
      // Vérification du solde
      const hasBalance = await verifyBalance(cardNumber);
      if (!hasBalance) {
        onError("Solde insuffisant");
        return;
      }

      // Blocage du montant
      const blocked = await blockAmount(amount);
      if (!blocked) {
        onError("Impossible de bloquer le montant");
        return;
      }

      // Génération du bon de commande
      const orderConfirmation = generateOrderConfirmation();
      console.log("Bon de commande généré:", orderConfirmation);

      // Génération de la facture
      const invoice = generateInvoice(orderConfirmation, driverId);
      console.log("Facture générée:", invoice);

      const transactionId = Math.random().toString(36).substr(2, 9);
      onSuccess(transactionId);

      toast({
        title: "Paiement réussi",
        description: `Votre paiement de ${amount}€ a été traité avec succès`,
      });

    } catch (error) {
      onError("Erreur lors du traitement du paiement");
    }
  };

  return null; // Ce composant ne rend rien, il fournit uniquement la logique
};
