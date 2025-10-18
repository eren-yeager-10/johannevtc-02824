import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { parsePhoneNumberFromString, AsYouType, CountryCode } from 'libphonenumber-js';

type Country = {
  value: string;
  label: string;
  prefix: string;
  code: CountryCode;
};

const euCountries: Country[] = [
  { value: "fr", label: "France", prefix: "+33", code: "FR" },
  { value: "de", label: "Allemagne", prefix: "+49", code: "DE" },
  { value: "it", label: "Italie", prefix: "+39", code: "IT" },
  { value: "es", label: "Espagne", prefix: "+34", code: "ES" },
  { value: "be", label: "Belgique", prefix: "+32", code: "BE" },
  { value: "nl", label: "Pays-Bas", prefix: "+31", code: "NL" },
  { value: "pt", label: "Portugal", prefix: "+351", code: "PT" },
  { value: "ie", label: "Irlande", prefix: "+353", code: "IE" },
  { value: "lu", label: "Luxembourg", prefix: "+352", code: "LU" },
  { value: "at", label: "Autriche", prefix: "+43", code: "AT" },
  { value: "fi", label: "Finlande", prefix: "+358", code: "FI" },
  { value: "gr", label: "Grèce", prefix: "+30", code: "GR" },
  { value: "se", label: "Suède", prefix: "+46", code: "SE" },
  { value: "dk", label: "Danemark", prefix: "+45", code: "DK" },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

export function PhoneInput({ value, onChange, error }: PhoneInputProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState<Country>(euCountries[0]);
  const [phoneNumber, setPhoneNumber] = React.useState("");

  React.useEffect(() => {
    if (!phoneNumber) {
      onChange("");
      return;
    }

    const asYouType = new AsYouType({ defaultCountry: selectedCountry.code });
    const formattedNumber = asYouType.input(phoneNumber);
    const parsedNumber = parsePhoneNumberFromString(formattedNumber, { defaultCountry: selectedCountry.code });
    
    if (parsedNumber) {
      onChange(parsedNumber.format('E.164'));
    } else {
      onChange(selectedCountry.prefix + phoneNumber);
    }
  }, [selectedCountry, phoneNumber, onChange]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newNumber = e.target.value;
    
    // Enlever le préfixe s'il est présent
    if (newNumber.startsWith(selectedCountry.prefix)) {
      newNumber = newNumber.slice(selectedCountry.prefix.length);
    }
    
    // Nettoyer le numéro (garder uniquement les chiffres)
    newNumber = newNumber.replace(/[^\d]/g, '');
    
    // Formatage pour la France
    if (selectedCountry.code === 'FR') {
      const asYouType = new AsYouType({ defaultCountry: 'FR' });
      newNumber = asYouType.input(newNumber);
    }
    
    setPhoneNumber(newNumber);
  };

  return (
    <div className="flex gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[120px] justify-between"
          >
            {selectedCountry.prefix}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Rechercher un pays..." />
            <CommandEmpty>Aucun pays trouvé.</CommandEmpty>
            <CommandGroup>
              {euCountries.map((country) => (
                <CommandItem
                  key={country.value}
                  value={country.value}
                  onSelect={() => {
                    setSelectedCountry(country);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCountry.value === country.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {country.label} ({country.prefix})
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <Input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneChange}
        className={cn(error && "border-red-500")}
        placeholder="Numéro de téléphone"
      />
    </div>
  );
}