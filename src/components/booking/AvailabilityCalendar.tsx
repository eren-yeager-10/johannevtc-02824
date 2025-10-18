import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { addDays, format } from "date-fns";
import { fr } from "date-fns/locale";

const AvailabilityCalendar = ({
  onDateSelect,
}: {
  onDateSelect: (date: Date) => void;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      onDateSelect(date);
    }
  };

  // Simuler des créneaux disponibles
  const availableSlots = Array.from({ length: 7 }, (_, i) => ({
    date: addDays(new Date(), i),
    available: Math.random() > 0.3,
  }));

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Calendrier de disponibilité</h3>
      <div className="grid gap-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          locale={fr}
          className="rounded-md border"
          components={{
            DayContent: ({ date }) => {
              const slot = availableSlots.find(
                (s) => format(s.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
              );
              return (
                <div className="relative w-full h-full flex items-center justify-center">
                  {date.getDate()}
                  {slot && (
                    <Badge
                      variant={slot.available ? "default" : "secondary"}
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-[0.6rem] px-1"
                    >
                      {slot.available ? "Dispo" : "Complet"}
                    </Badge>
                  )}
                </div>
              );
            },
          }}
        />
      </div>
    </Card>
  );
};

export default AvailabilityCalendar;