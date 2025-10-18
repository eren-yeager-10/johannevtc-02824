
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface PaymentMethodCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  buttonClassName?: string;
  onPayment: () => void;
  disabled?: boolean;
}

export const PaymentMethodCard = ({
  icon: Icon,
  title,
  description,
  buttonText,
  buttonClassName = "bg-brand-blue hover:bg-brand-blue/90",
  onPayment,
  disabled = false,
}: PaymentMethodCardProps) => {
  return (
    <Card className={`cursor-pointer hover:shadow-lg transition-shadow ${disabled ? 'opacity-50' : ''}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={onPayment}
          className={`w-full ${buttonClassName}`}
          disabled={disabled}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};
