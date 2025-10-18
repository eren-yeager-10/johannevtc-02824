import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type ReminderSettingsType = {
  enabled: boolean;
  timing: "1h" | "3h" | "24h";
  method: "email" | "sms" | "both";
};

const ReminderSettings = ({
  onSettingsChange,
}: {
  onSettingsChange: (settings: ReminderSettingsType) => void;
}) => {
  const [settings, setSettings] = useState<ReminderSettingsType>({
    enabled: true,
    timing: "24h",
    method: "both",
  });

  const handleChange = (key: keyof ReminderSettingsType, value: string | boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Rappels</h3>
        <div className="flex items-center space-x-2">
          <Switch
            id="notifications"
            checked={settings.enabled}
            onCheckedChange={(checked) => handleChange("enabled", checked)}
          />
          <Label htmlFor="notifications">Activer les rappels</Label>
        </div>
      </div>

      {settings.enabled && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Quand me rappeler ?</Label>
            <Select
              value={settings.timing}
              onValueChange={(value) =>
                handleChange("timing", value as ReminderSettingsType["timing"])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez le délai" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">1 heure avant</SelectItem>
                <SelectItem value="3h">3 heures avant</SelectItem>
                <SelectItem value="24h">24 heures avant</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Comment me rappeler ?</Label>
            <Select
              value={settings.method}
              onValueChange={(value) =>
                handleChange("method", value as ReminderSettingsType["method"])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez la méthode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="both">Email et SMS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ReminderSettings;