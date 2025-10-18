import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type RecurringPattern = {
  frequency: "daily" | "weekly" | "monthly";
  interval: number;
  endDate: string;
};

const RecurringBooking = ({
  onPatternChange,
}: {
  onPatternChange: (pattern: RecurringPattern) => void;
}) => {
  const [pattern, setPattern] = useState<RecurringPattern>({
    frequency: "weekly",
    interval: 1,
    endDate: "",
  });

  const handleChange = (
    key: keyof RecurringPattern,
    value: string | number
  ) => {
    const newPattern = { ...pattern, [key]: value };
    setPattern(newPattern);
    onPatternChange(newPattern);
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Réservation récurrente</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Fréquence</Label>
          <RadioGroup
            defaultValue={pattern.frequency}
            onValueChange={(value) =>
              handleChange("frequency", value as RecurringPattern["frequency"])
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="daily" id="daily" />
              <Label htmlFor="daily">Quotidien</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="weekly" id="weekly" />
              <Label htmlFor="weekly">Hebdomadaire</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monthly" id="monthly" />
              <Label htmlFor="monthly">Mensuel</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Intervalle</Label>
          <Select
            value={pattern.interval.toString()}
            onValueChange={(value) => handleChange("interval", parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez l'intervalle" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Date de fin</Label>
          <Input
            type="date"
            value={pattern.endDate}
            onChange={(e) => handleChange("endDate", e.target.value)}
          />
        </div>
      </div>
    </Card>
  );
};

export default RecurringBooking;