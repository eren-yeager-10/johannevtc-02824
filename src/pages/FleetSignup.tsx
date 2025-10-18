
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { PhoneInput } from "@/components/identity/PhoneInput";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const ACCEPTED_DOC_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];

const fleetSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  address: z.string().min(5, "Adresse invalide"),
  city: z.string().min(2, "Ville invalide"),
  postalCode: z.string().min(5, "Code postal invalide"),
  birthDate: z.string().min(1, "Date de naissance requise"),
  drivingLicenseNumber: z.string().min(5, "Numéro de permis invalide"),
  drivingLicenseDate: z.string().min(1, "Date d'obtention du permis requise"),
  vtcCard: z.string().min(5, "Numéro de carte VTC invalide"),
  vehicleModel: z.string().min(2, "Modèle du véhicule requis"),
  vehicleYear: z.string().min(4, "Année du véhicule requise"),
  vehiclePlate: z.string().min(4, "Plaque d'immatriculation requise"),
  experience: z.boolean(),
  termsAccepted: z.boolean().refine((val) => val === true, "Vous devez accepter les conditions"),
  
  // Documents requis
  identityDocument: z.any()
    .refine((files) => files?.length === 1, "Document d'identité requis")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "Taille maximale: 5MB")
    .refine(
      (files) => ACCEPTED_DOC_TYPES.includes(files?.[0]?.type),
      "Format accepté: PDF, JPG, PNG"
    ),
  drivingLicense: z.any()
    .refine((files) => files?.length === 1, "Permis de conduire requis")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "Taille maximale: 5MB")
    .refine(
      (files) => ACCEPTED_DOC_TYPES.includes(files?.[0]?.type),
      "Format accepté: PDF, JPG, PNG"
    ),
  vtcCardDocument: z.any()
    .refine((files) => files?.length === 1, "Carte VTC requise")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "Taille maximale: 5MB")
    .refine(
      (files) => ACCEPTED_DOC_TYPES.includes(files?.[0]?.type),
      "Format accepté: PDF, JPG, PNG"
    ),
  insurance: z.any()
    .refine((files) => files?.length === 1, "Attestation d'assurance requise")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "Taille maximale: 5MB")
    .refine(
      (files) => ACCEPTED_DOC_TYPES.includes(files?.[0]?.type),
      "Format accepté: PDF, JPG, PNG"
    ),
  vehicleRegistration: z.any()
    .refine((files) => files?.length === 1, "Carte grise requise")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "Taille maximale: 5MB")
    .refine(
      (files) => ACCEPTED_DOC_TYPES.includes(files?.[0]?.type),
      "Format accepté: PDF, JPG, PNG"
    ),
  kbis: z.any()
    .refine((files) => files?.length === 1, "Extrait Kbis requis")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "Taille maximale: 5MB")
    .refine(
      (files) => ACCEPTED_DOC_TYPES.includes(files?.[0]?.type),
      "Format accepté: PDF, JPG, PNG"
    ),
});

const FleetSignup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof fleetSchema>>({
    resolver: zodResolver(fleetSchema),
    defaultValues: {
      experience: false,
      termsAccepted: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof fleetSchema>) => {
    try {
      console.log(values);
      toast({
        title: "Demande envoyée !",
        description: "Nous examinerons votre candidature dans les plus brefs délais.",
      });
      // Redirection après quelques secondes
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du formulaire.",
      });
    }
  };

  return (
    <div 
      className="min-h-screen pt-20 px-4 md:px-0 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="w-fit flex items-center gap-2 bg-white/95"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Button>
          <h1 className="text-2xl md:text-4xl font-bold text-white">Rejoindre la flotte</h1>
        </div>

        <Card className="max-w-3xl mx-auto bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Informations personnelles</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <Input placeholder="Jean" {...field} />
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
                          <Input placeholder="Dupont" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="jean.dupont@example.com" {...field} />
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

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresse</FormLabel>
                      <FormControl>
                        <Textarea placeholder="123 rue de la Paix" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ville</FormLabel>
                        <FormControl>
                          <Input placeholder="Paris" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Code postal</FormLabel>
                        <FormControl>
                          <Input placeholder="75000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date de naissance</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="drivingLicenseDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date d'obtention du permis</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="drivingLicenseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numéro de permis</FormLabel>
                        <FormControl>
                          <Input placeholder="12AB34567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vtcCard"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numéro de carte VTC</FormLabel>
                        <FormControl>
                          <Input placeholder="VTC123456" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Informations du véhicule</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="vehicleModel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Modèle du véhicule</FormLabel>
                        <FormControl>
                          <Input placeholder="Mercedes Classe E" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vehicleYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Année</FormLabel>
                        <FormControl>
                          <Input placeholder="2023" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vehiclePlate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plaque d'immatriculation</FormLabel>
                        <FormControl>
                          <Input placeholder="AB-123-CD" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Documents requis</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="identityDocument"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        <FormLabel>Pièce d'identité</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => onChange(e.target.files)}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="drivingLicense"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        <FormLabel>Permis de conduire</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => onChange(e.target.files)}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="vtcCardDocument"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        <FormLabel>Carte professionnelle VTC</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => onChange(e.target.files)}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="insurance"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        <FormLabel>Attestation d'assurance</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => onChange(e.target.files)}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="vehicleRegistration"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        <FormLabel>Carte grise</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => onChange(e.target.files)}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="kbis"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        <FormLabel>Extrait Kbis</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => onChange(e.target.files)}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="experience"
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
                          J'ai de l'expérience en tant que chauffeur VTC
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="termsAccepted"
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
                          J'accepte les conditions d'utilisation et la politique de confidentialité
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full bg-[#0EA5E9] hover:bg-[#0EA5E9]/90">
                Envoyer ma candidature
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default FleetSignup;
