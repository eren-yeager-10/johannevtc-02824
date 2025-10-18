import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import AvailabilityCalendar from "./AvailabilityCalendar";
import RecurringBooking, { type RecurringPattern } from "./RecurringBooking";
import ReminderSettings, { type ReminderSettingsType } from "./ReminderSettings";

const AdvancedBooking = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [recurringPattern, setRecurringPattern] = useState<RecurringPattern | null>(
    null
  );
  const [reminderSettings, setReminderSettings] = useState<ReminderSettingsType | null>(
    null
  );

  const handleBooking = () => {
    if (!selectedDate) {
      toast({
        title: "Date requise",
        description: "Veuillez sélectionner une date pour votre réservation.",
        variant: "destructive",
      });
      return;
    }

    // Simuler l'envoi de la réservation
    console.log({
      date: selectedDate,
      recurring: recurringPattern,
      reminders: reminderSettings,
    });

    toast({
      title: "Réservation confirmée !",
      description: "Vous recevrez un email de confirmation sous peu.",
    });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-8">
        Réservation avancée
      </h2>
      
      <AvailabilityCalendar onDateSelect={setSelectedDate} />
      
      <RecurringBooking onPatternChange={setRecurringPattern} />
      
      <ReminderSettings onSettingsChange={setReminderSettings} />
      
      <Button 
        onClick={handleBooking}
        className="w-full bg-brand-blue hover:bg-brand-blue/90"
      >
        Confirmer la réservation
      </Button>
    </div>
  );
};

export default AdvancedBooking;