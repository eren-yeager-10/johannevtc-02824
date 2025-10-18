
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { VehicleSelector, type VehicleType } from "../VehicleSelector";
import { PriceCalculator } from "../PriceCalculator";
import { WaitingTime } from "../WaitingTime";

const formSchema = z.object({
  pickup: z.string().min(2, "L'adresse de départ est requise"),
  destination: z.string().min(2, "L'adresse de destination est requise"),
  vehicleType: z.enum(["berline", "suv", "van", "luxe"]),
});

export type JourneyFormData = z.infer<typeof formSchema>;

interface JourneyFormProps {
  onSubmit: (data: JourneyFormData) => void;
  onPriceCalculated: (price: number) => void;
  initialPickup?: string;
}

export const JourneyForm = ({ onSubmit, onPriceCalculated, initialPickup = '' }: JourneyFormProps) => {
  const form = useForm<JourneyFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickup: initialPickup,
      destination: '',
      vehicleType: 'berline',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">Votre trajet</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="pickup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse de départ</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre position actuelle..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse de destination</FormLabel>
                  <FormControl>
                    <Input placeholder="Où souhaitez-vous aller ?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">Type de véhicule</h3>
          <FormField
            control={form.control}
            name="vehicleType"
            render={({ field }) => (
              <FormItem>
                <VehicleSelector
                  selectedVehicle={field.value as VehicleType}
                  onVehicleSelect={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <PriceCalculator
          pickup={form.watch('pickup')}
          destination={form.watch('destination')}
          onPriceCalculated={onPriceCalculated}
        />

        <WaitingTime
          vehicleType={form.watch('vehicleType')}
          pickup={form.watch('pickup')}
        />

        <Button 
          type="submit" 
          className="w-full bg-brand-blue hover:bg-brand-blue/90"
        >
          Continuer vers le paiement
        </Button>
      </form>
    </Form>
  );
};
