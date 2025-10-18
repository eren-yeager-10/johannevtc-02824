
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "../identity/PhoneInput";
import { isValidPhoneNumber } from 'libphonenumber-js';

const formSchema = z.object({
  pickup: z.string().min(2, "L'adresse de départ est requise"),
  destination: z.string().min(2, "L'adresse de destination est requise"),
  date: z.string().min(2, "La date est requise"),
  time: z.string().min(2, "L'heure est requise"),
  groupSize: z.string().min(1, "La taille du groupe est requise"),
  notes: z.string().optional(),
  organizerName: z.string().min(2, "Le nom de l'organisateur est requis"),
  organizerEmail: z.string().email("Email invalide"),
  organizerPhone: z.string().refine((value) => {
    try {
      return isValidPhoneNumber(value, 'FR') || 
             isValidPhoneNumber(value, 'DE') ||
             isValidPhoneNumber(value, 'IT') ||
             isValidPhoneNumber(value, 'ES') ||
             isValidPhoneNumber(value, 'BE') ||
             isValidPhoneNumber(value, 'NL');
    } catch {
      return false;
    }
  }, "Numéro de téléphone invalide"),
});

type GroupBookingFormProps = {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
};

export const GroupBookingForm = ({ onSubmit }: GroupBookingFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickup: "",
      destination: "",
      date: "",
      time: "",
      groupSize: "",
      notes: "",
      organizerName: "",
      organizerEmail: "",
      organizerPhone: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl font-semibold mb-6">Réservation de Groupe</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="pickup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse de départ</FormLabel>
                <FormControl>
                  <Input placeholder="123 rue de Paris" {...field} />
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
                  <Input placeholder="456 avenue des Champs-Élysées" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Heure</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="groupSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Taille du groupe</FormLabel>
                <FormControl>
                  <Input type="number" min="2" max="20" placeholder="Nombre de personnes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes supplémentaires</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Informations complémentaires (besoins spéciaux, équipements...)" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="organizerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de l'organisateur</FormLabel>
                <FormControl>
                  <Input placeholder="Jean Dupont" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="organizerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email de l'organisateur</FormLabel>
                <FormControl>
                  <Input placeholder="jean.dupont@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="organizerPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone de l'organisateur</FormLabel>
                <FormControl>
                  <PhoneInput
                    value={field.value}
                    onChange={field.onChange}
                    error={!!form.formState.errors.organizerPhone}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full bg-brand-blue hover:bg-brand-blue/90">
          Réserver pour le groupe
        </Button>
      </form>
    </Form>
  );
};
