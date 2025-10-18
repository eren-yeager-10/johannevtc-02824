import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { IdentityForm, type IdentityFormData } from "./identity/IdentityForm";
import { PaymentOptions } from "./payment/PaymentOptions";
import { LocationButtons } from "./location/LocationButtons";
import { JourneyForm, type JourneyFormData } from "./journey/JourneyForm";
import { useToast } from "@/hooks/use-toast";

const QuickOrderForm = () => {
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [showIdentityForm, setShowIdentityForm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [identityData, setIdentityData] = useState<IdentityFormData | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [userLocation, setUserLocation] = useState<string>('');
  const { toast } = useToast();

  const handleLocationFound = (address: string) => {
    setUserLocation(address);
    setIsLocating(false);
  };

  const handleJourneySubmit = (data: JourneyFormData) => {
    setShowIdentityForm(true);
  };

  const handleIdentitySubmit = (data: IdentityFormData) => {
    setIdentityData(data);
    setShowIdentityForm(false);
    setShowPayment(true);
  };

  const handlePriceCalculated = (price: number) => {
    setEstimatedPrice(price);
  };

  const handlePaymentComplete = () => {
    // Créer une nouvelle demande de course
    const newRideRequest = {
      clientName: identityData ? `${identityData.firstName} ${identityData.lastName}` : "Client",
      pickup: userLocation,
      destination: "Destination",
      date: new Date().toLocaleString(),
      status: "pending",
      price: estimatedPrice || 0
    };

    // Envoyer une notification à l'administrateur
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Nouvelle demande de course !", {
        body: `${newRideRequest.clientName} souhaite aller de ${newRideRequest.pickup} à ${newRideRequest.destination}`,
        icon: "/favicon.ico"
      });
    }

    // Afficher un toast pour confirmer la commande
    toast({
      title: "Commande confirmée !",
      description: "Votre chauffeur vous contactera bientôt.",
    });

    // Réinitialiser le formulaire
    setShowPayment(false);
    setShowIdentityForm(false);
    setIdentityData(null);
    setEstimatedPrice(null);
    setUserLocation('');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <LocationButtons 
          isLocating={isLocating} 
          onLocationFound={handleLocationFound}
        />
        {estimatedPrice && (
          <div className="text-lg font-bold text-brand-blue">
            Prix estimé: {estimatedPrice}€
          </div>
        )}
      </div>

      {!showIdentityForm && !showPayment ? (
        <JourneyForm
          onSubmit={handleJourneySubmit}
          onPriceCalculated={handlePriceCalculated}
          initialPickup={userLocation}
        />
      ) : showIdentityForm ? (
        <IdentityForm 
          onSubmit={handleIdentitySubmit}
          onBack={() => setShowIdentityForm(false)}
        />
      ) : (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold">Choisissez votre moyen de paiement</h3>
            <p className="text-sm text-gray-500">Paiement sécurisé via Stripe</p>
          </div>
          <PaymentOptions 
            amount={estimatedPrice || 0} 
            onPaymentComplete={handlePaymentComplete}
          />
          <Button
            onClick={() => {
              setShowPayment(false);
              setShowIdentityForm(true);
            }}
            variant="outline"
            className="w-full mt-4"
          >
            Retour
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuickOrderForm;