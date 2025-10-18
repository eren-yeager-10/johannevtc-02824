import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Upload } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { useIsMobile } from "@/hooks/use-mobile"

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const ACCEPTED_DOC_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];

const formSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  city: z.string().min(2, "Ville invalide"),
  vehicle: z.string().min(2, "Type de véhicule requis"),
  license: z.string().min(2, "Numéro de permis requis"),
  experience: z.boolean(),
  profilePhoto: z.any()
    .refine((file) => file?.length === 1, "La photo d'identité est requise")
    .refine((file) => file?.[0]?.size <= MAX_FILE_SIZE, "La taille maximale est de 5MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
      "Format accepté : .jpg, .jpeg, .png"
    ),
  insuranceAttestation: z.any()
    .refine((file) => file?.length === 1, "L'attestation d'assurance est requise")
    .refine((file) => file?.[0]?.size <= MAX_FILE_SIZE, "La taille maximale est de 5MB")
    .refine(
      (file) => ACCEPTED_DOC_TYPES.includes(file?.[0]?.type),
      "Format accepté : .pdf, .jpg, .jpeg, .png"
    ),
  civilLiabilityInsurance: z.any()
    .refine((file) => file?.length === 1, "L'attestation d'assurance automobile responsabilité civile est requise")
    .refine((file) => file?.[0]?.size <= MAX_FILE_SIZE, "La taille maximale est de 5MB")
    .refine(
      (file) => ACCEPTED_DOC_TYPES.includes(file?.[0]?.type),
      "Format accepté : .pdf, .jpg, .jpeg, .png"
    ),
  commercialRegister: z.any()
    .refine((file) => file?.length === 1, "L'extrait d'immatriculation est requis")
    .refine((file) => file?.[0]?.size <= MAX_FILE_SIZE, "La taille maximale est de 5MB")
    .refine(
      (file) => ACCEPTED_DOC_TYPES.includes(file?.[0]?.type),
      "Format accepté : .pdf, .jpg, .jpeg, .png"
    ),
  registrationCertificate: z.any()
    .refine((file) => file?.length === 1, "L'attestation d'inscription est requise")
    .refine((file) => file?.[0]?.size <= MAX_FILE_SIZE, "La taille maximale est de 5MB")
    .refine(
      (file) => ACCEPTED_DOC_TYPES.includes(file?.[0]?.type),
      "Format accepté : .pdf, .jpg, .jpeg, .png"
    ),
  bankDetails: z.any()
    .refine((file) => file?.length === 1, "Le RIB est requis")
    .refine((file) => file?.[0]?.size <= MAX_FILE_SIZE, "La taille maximale est de 5MB")
    .refine(
      (file) => ACCEPTED_DOC_TYPES.includes(file?.[0]?.type),
      "Format accepté : .pdf, .jpg, .jpeg, .png"
    ),
  vtcCard: z.any()
    .refine((file) => file?.length === 1, "La carte professionnelle VTC est requise")
    .refine((file) => file?.[0]?.size <= MAX_FILE_SIZE, "La taille maximale est de 5MB")
    .refine(
      (file) => ACCEPTED_DOC_TYPES.includes(file?.[0]?.type),
      "Format accepté : .pdf, .jpg, .jpeg, .png"
    ),
})

export default function BecomeDriver() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      vehicle: "",
      license: "",
      experience: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "Demande envoyée !",
      description: "Nous vous contacterons dans les plus brefs délais.",
    })
    form.reset()
  }

  return (
    <div 
      className="min-h-screen pt-16 md:pt-20 bg-cover bg-center bg-no-repeat bg-black/10 backdrop-blur-sm px-4 md:px-0"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1581092795360-fd1ca04f0952')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container mx-auto py-4 md:py-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 md:mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="w-fit flex items-center gap-2 bg-white/95"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Button>
          <h1 className="text-2xl md:text-4xl font-bold text-white">Devenir Chauffeur</h1>
        </div>
        <Card className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm p-4 md:p-8 rounded-lg shadow">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-lg md:text-xl font-semibold text-brand-burgundy">Informations personnelles</h2>
                
                <FormField
                  control={form.control}
                  name="profilePhoto"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel>Photo d'identité</FormLabel>
                      <FormControl>
                        <div className="flex flex-col items-center gap-4">
                          {value && value[0] && (
                            <img
                              src={URL.createObjectURL(value[0])}
                              alt="Preview"
                              className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg border"
                            />
                          )}
                          <div className="w-full">
                            <Input
                              type="file"
                              accept=".jpg,.jpeg,.png"
                              onChange={(e) => {
                                onChange(e.target.files);
                                if (e.target.files?.[0]) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    // Preview logic here if needed
                                  };
                                  reader.readAsDataURL(e.target.files[0]);
                                }
                              }}
                              {...field}
                              className="w-full text-sm md:text-base"
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <Input placeholder="Jean" {...field} className="text-sm md:text-base" />
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
                          <Input placeholder="Dupont" {...field} className="text-sm md:text-base" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="jean.dupont@example.com" {...field} className="text-sm md:text-base" />
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
                          <Input placeholder="06 12 34 56 78" {...field} className="text-sm md:text-base" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ville</FormLabel>
                        <FormControl>
                          <Input placeholder="Paris" {...field} className="text-sm md:text-base" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vehicle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de véhicule</FormLabel>
                        <FormControl>
                          <Input placeholder="Berline, SUV, Van..." {...field} className="text-sm md:text-base" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="license"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numéro de permis</FormLabel>
                      <FormControl>
                        <Input placeholder="12AB34567" {...field} className="text-sm md:text-base" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4 md:space-y-6">
                <h2 className="text-lg md:text-xl font-semibold text-brand-burgundy">Documents requis</h2>
                
                <div className="grid grid-cols-1 gap-3 md:gap-4">
                  <FormField
                    control={form.control}
                    name="insuranceAttestation"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        <FormLabel>Attestation d'assurance</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => onChange(e.target.files)}
                            {...field}
                            className="text-sm md:text-base"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="civilLiabilityInsurance"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        <FormLabel>Attestation d'assurance automobile responsabilité civile</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => onChange(e.target.files)}
                            {...field}
                            className="text-sm md:text-base"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="commercialRegister"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        <FormLabel>Extrait d'immatriculation (Registre du commerce)</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => onChange(e.target.files)}
                            {...field}
                            className="text-sm md:text-base"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="registrationCertificate"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        <FormLabel>Attestation d'inscription</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => onChange(e.target.files)}
                            {...field}
                            className="text-sm md:text-base"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bankDetails"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        <FormLabel>Relevé d'identité bancaire (RIB)</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => onChange(e.target.files)}
                            {...field}
                            className="text-sm md:text-base"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vtcCard"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        <FormLabel>Carte professionnelle VTC</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => onChange(e.target.files)}
                            {...field}
                            className="text-sm md:text-base"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

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
                      <FormLabel className="text-sm md:text-base">
                        J'ai de l'expérience en tant que chauffeur VTC
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-brand-burgundy hover:bg-brand-burgundy/90 text-sm md:text-base">
                Envoyer ma candidature
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  )
}
