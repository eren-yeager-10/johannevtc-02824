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
import { useEffect } from 'react';

const formSchema = z.object({
  pickup: z.string().min(2, "L'adresse de départ est requise"),
  destination: z.string().min(2, "L'adresse de destination est requise"),
  date: z.string().min(2, "La date est requise"),
  time: z.string().min(2, "L'heure est requise"),
  passengers: z.string().min(1, "Le nombre de passagers est requis"),
  notes: z.string().optional(),
  name: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().refine((value) => {
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

type BookingFormProps = {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
};

export const BookingForm = ({ onSubmit }: BookingFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickup: "",
      destination: "",
      date: "",
      time: "",
      passengers: "",
      notes: "",
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if ((name === "pickup" || name === "destination") && value.pickup && value.destination) {
        const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(value.destination)}&navigate=yes&from=${encodeURIComponent(value.pickup)}`;
        window.open(wazeUrl, '_blank');
      }
    });

    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>

        <FormField
          control={form.control}
          name="passengers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de passagers</FormLabel>
              <FormControl>
                <Input type="number" min="1" max="8" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes supplémentaires</FormLabel>
              <FormControl>
                <Textarea placeholder="Informations complémentaires..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Jean Dupont" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="jean.dupont@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <PhoneInput
                    value={field.value}
                    onChange={field.onChange}
                    error={!!form.formState.errors.phone}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full bg-brand-blue hover:bg-brand-blue/90">
          Réserver maintenant
        </Button>
      </form>
    </Form>
  );
};
