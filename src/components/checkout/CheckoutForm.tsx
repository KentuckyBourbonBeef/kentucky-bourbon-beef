import { FormField } from "./FormField";
import { OrderSummary } from "./OrderSummary";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  shippingAddress: string;
}

interface CheckoutFormProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  total: number;
}

export function CheckoutForm({
  formData,
  onInputChange,
  onSubmit,
  loading,
  total,
}: CheckoutFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-md mx-auto animate-fade-in">
      <FormField
        id="fullName"
        label="Full Name"
        value={formData.fullName}
        onChange={onInputChange}
        required
        disabled={loading}
      />

      <FormField
        id="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={onInputChange}
        required
        disabled={loading}
      />

      <FormField
        id="phone"
        label="Phone"
        type="tel"
        value={formData.phone}
        onChange={onInputChange}
        required
        disabled={loading}
      />

      <FormField
        id="shippingAddress"
        label="Shipping Address"
        value={formData.shippingAddress}
        onChange={onInputChange}
        required
        disabled={loading}
      />

      <OrderSummary total={total} loading={loading} />
    </form>
  );
}