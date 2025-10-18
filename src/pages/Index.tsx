
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Safety from "../components/Safety";
import Footer from "../components/Footer";
import { ChatWindow } from "../components/Chat/ChatWindow";
import { AIChatbot } from "../components/Chat/AIChatbot";
import { InternalMessaging } from "../components/Chat/InternalMessaging";
import QuickOrderForm from "../components/QuickOrderForm";
import { DriverReview } from "../components/DriverReview";
import { ReviewsList } from "../components/ReviewsList";
import Fleet from "../components/Fleet";
import AdvancedBooking from "../components/booking/AdvancedBooking";
import { GroupBookingForm } from "../components/booking/GroupBookingForm";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DriversMap from "@/components/drivers/DriversMap";

const mockReviews = [
  {
    id: "1",
    rating: 5,
    comment: "Excellent service, chauffeur très professionnel !",
    userName: "Marie L.",
    date: "2024-02-20"
  },
  {
    id: "2",
    rating: 4,
    comment: "Très bon trajet, ponctuel et agréable.",
    userName: "Pierre D.",
    date: "2024-02-19"
  }
];

const Index = () => {
  const isMobile = useIsMobile();

  const handleGroupBookingSubmit = (values: any) => {
    console.log('Group booking submitted:', values);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <div id="booking-section" className="container mx-auto py-8 sm:py-12 px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-uber font-bold">
            Réservation de course
          </h2>
          <Fleet />
        </div>
        
        <Tabs defaultValue="solo" className="w-full">
          <TabsList aria-label="Options de réservation">
            <TabsTrigger 
              value="solo" 
              aria-label="Réservation Solo"
              aria-controls="solo-tab"
            >
              Réservation Solo
            </TabsTrigger>
            <TabsTrigger 
              value="group" 
              aria-label="Réservation de Groupe"
              aria-controls="group-tab"
            >
              Réservation de Groupe
            </TabsTrigger>
            <TabsTrigger 
              value="map" 
              aria-label="Chauffeurs à proximité"
              aria-controls="map-tab"
            >
              Chauffeurs à proximité
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="solo" id="solo-tab">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Réservation immédiate</h3>
                <QuickOrderForm />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Réservation avancée</h3>
                <AdvancedBooking />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="group" id="group-tab">
            <div className="max-w-2xl mx-auto">
              <GroupBookingForm onSubmit={handleGroupBookingSubmit} />
            </div>
          </TabsContent>

          <TabsContent value="map" id="map-tab">
            <DriversMap />
          </TabsContent>
        </Tabs>
      </div>
      
      <Services />
      <Safety />
      <div className="container mx-auto py-8 sm:py-12 px-4">
        <h2 className="text-2xl sm:text-3xl font-uber font-bold text-center mb-6 sm:mb-8">
          Avis de nos clients
        </h2>
        <div className="max-w-2xl mx-auto">
          <ReviewsList reviews={mockReviews} />
          <div className="mt-6 sm:mt-8">
            <DriverReview driverId="123" driverName="Jean Dupont" />
          </div>
        </div>
      </div>
      <div className="container mx-auto py-6 sm:py-8 px-4 space-y-6 sm:space-y-8">
        <h2 className="text-2xl sm:text-3xl font-uber font-bold text-center mb-4 sm:mb-8">
          Communication
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          <ChatWindow />
          <AIChatbot />
          <InternalMessaging />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
