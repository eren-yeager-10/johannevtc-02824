import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "./PhoneInput";
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

const identitySchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis"),
  lastName: z.string().min(2, "Le nom est requis"),
  phone: z.string().refine((value) => {
    try {
      // Vérifie si le numéro est valide pour n'importe quel pays de l'UE
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
  email: z.string().email("L'adresse email n'est pas valide"),
  wantInvoice: z.boolean().default(false),
});

export type IdentityFormData = z.infer<typeof identitySchema>;

interface IdentityFormProps {
  onSubmit: (data: IdentityFormData) => void;
  onBack: () => void;
}

export const IdentityForm = ({ onSubmit, onBack }: IdentityFormProps) => {
  const form = useForm<IdentityFormData>({
    resolver: zodResolver(identitySchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      wantInvoice: false,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="Votre prénom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Votre nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Votre adresse email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="wantInvoice"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Je souhaite recevoir des factures par email
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="w-full"
          >
            Retour
          </Button>
          <Button type="submit" className="w-full bg-brand-blue hover:bg-brand-blue/90">
            Continuer vers le paiement
          </Button>
        </div>
      </form>
    </Form>
  );
};