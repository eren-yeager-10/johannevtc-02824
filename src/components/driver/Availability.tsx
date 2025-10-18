import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Availability = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Availability</h3>
        <div className="flex items-center gap-2">
          <Label htmlFor="availability">Available</Label>
          <Switch
            id="availability"
            checked={isAvailable}
            onCheckedChange={setIsAvailable}
          />
        </div>
      </div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </Card>
  );
};

export default Availability;