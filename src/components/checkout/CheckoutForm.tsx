import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <form onSubmit={onSubmit} className="space-y-6 max-w-md mx-auto">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={onInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={onInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="shippingAddress">Shipping Address</Label>
        <Input
          id="shippingAddress"
          name="shippingAddress"
          value={formData.shippingAddress}
          onChange={onInputChange}
          required
        />
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between text-lg font-semibold mb-4">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <Button
          type="submit"
          className="w-full bg-bourbon-600 hover:bg-bourbon-700"
          disabled={loading}
        >
          {loading ? "Processing..." : "Place Order"}
        </Button>
      </div>
    </form>
  );
}