
import { useToast } from "@/components/ui/use-toast";
import { MapIcon, ArrowLeft, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookingForm } from "@/components/booking/BookingForm";
import { GroupBookingForm } from "@/components/booking/GroupBookingForm";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { PriceCalculator } from "@/components/PriceCalculator";
import { PaymentOptions } from "@/components/payment/PaymentOptions";
import { RideNotification } from "@/components/RideNotification";

export default function Book() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [bookingType, setBookingType] = useState<'solo' | 'group' | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);
  const [currentBooking, setCurrentBooking] = useState<any>(null);
  const [showNotification, setShowNotification] = useState(false);
  const isMobile = useIsMobile();

  const openWazeNavigation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        window.open(`https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`, '_blank');
      }, (error) => {
        toast({
          title: "Erreur de localisation",
          description: "Impossible d'obtenir votre position actuelle.",
          variant: "destructive",
        });
      });
    } else {
      toast({
        title: "Erreur",
        description: "La géolocalisation n'est pas supportée par votre navigateur.",
        variant: "destructive",
      });
    }
  };

  const handlePriceCalculated = (price: number) => {
    setCalculatedPrice(price);
  };

  const handleSubmit = (values: any) => {
    setCurrentBooking(values);
    setShowPayment(true);
    // Afficher la notification après la validation du paiement
    setShowNotification(true);
  };

  const handlePaymentComplete = () => {
    toast({
      title: "Réservation confirmée !",
      description: "Votre réservation a été validée avec succès.",
    });
    navigate('/');
  };

  if (showPayment && calculatedPrice > 0) {
    return (
      <div className="min-h-screen pt-16 sm:pt-20 bg-cover bg-center bg-no-repeat bg-black/10 backdrop-blur-sm"
           style={{ 
             backgroundImage: "url('https://images.unsplash.com/photo-1487887235947-a955ef187fcc')",
             backgroundSize: 'cover',
             backgroundPosition: 'center'
           }}>
        <div className="container mx-auto px-4 py-4 sm:py-8">
          <Button
            onClick={() => setShowPayment(false)}
            variant="outline"
            className="mb-4 sm:mb-8 bg-white w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la réservation
          </Button>
          <div className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm p-4 sm:p-8 rounded-lg shadow">
            {showNotification && <RideNotification estimatedTime={5} />}
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Finaliser votre réservation</h2>
            <div className="mb-6 space-y-2 sm:space-y-3">
              <p className="text-base sm:text-lg font-semibold mb-2">Récapitulatif :</p>
              <p className="text-sm sm:text-base">De : {currentBooking.pickup}</p>
              <p className="text-sm sm:text-base">À : {currentBooking.destination}</p>
              <p className="text-sm sm:text-base">Date : {currentBooking.date}</p>
              <p className="text-sm sm:text-base">Heure : {currentBooking.time}</p>
              <p className="text-lg sm:text-xl font-bold mt-4">
                Prix total : {calculatedPrice.toFixed(2)}€
              </p>
            </div>
            <PaymentOptions amount={calculatedPrice} onPaymentComplete={handlePaymentComplete} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen pt-16 sm:pt-20 bg-cover bg-center bg-no-repeat bg-black/10 backdrop-blur-sm"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1487887235947-a955ef187fcc')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 sm:mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="w-full sm:w-auto bg-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-2xl sm:text-4xl font-bold text-white">Réserver une course</h1>
        </div>

        {!bookingType ? (
          <div className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm p-4 sm:p-8 rounded-lg shadow">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setBookingType('solo')}
                className="flex-1 bg-brand-blue hover:bg-brand-blue/90 text-white p-6 sm:p-8"
              >
                <User className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-base sm:text-lg">Réservation Solo</span>
              </Button>
              <Button
                onClick={() => setBookingType('group')}
                className="flex-1 bg-brand-blue hover:bg-brand-blue/90 text-white p-6 sm:p-8"
              >
                <Users className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-base sm:text-lg">Réservation en Groupe</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm p-4 sm:p-8 rounded-lg shadow">
            <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
              <Button
                variant="outline"
                onClick={() => setBookingType(null)}
                className="w-full sm:w-auto"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Button>
              <Button
                onClick={openWazeNavigation}
                className="w-full sm:w-auto bg-brand-blue hover:bg-brand-blue/90 text-white"
              >
                <MapIcon className="mr-2" />
                Suivre sur Waze
              </Button>
            </div>
            {bookingType === 'solo' ? (
              <>
                <BookingForm onSubmit={handleSubmit} />
                {currentBooking && (
                  <PriceCalculator
                    pickup={currentBooking.pickup}
                    destination={currentBooking.destination}
                    onPriceCalculated={handlePriceCalculated}
                  />
                )}
              </>
            ) : (
              <>
                <GroupBookingForm onSubmit={handleSubmit} />
                {currentBooking && (
                  <PriceCalculator
                    pickup={currentBooking.pickup}
                    destination={currentBooking.destination}
                    onPriceCalculated={handlePriceCalculated}
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
