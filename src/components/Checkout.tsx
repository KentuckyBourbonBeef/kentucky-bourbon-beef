import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export function Checkout() {
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    shippingAddress: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // Create or update customer record
      const { data: customerData, error: customerError } = await supabase
        .from("customers")
        .upsert({
          id: user.id,
          full_name: formData.fullName,
          shipping_address: formData.shippingAddress,
          phone: formData.phone,
        })
        .select()
        .single();

      if (customerError) throw customerError;

      // Create order
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_id: user.id,
          total_amount: total,
          shipping_address: formData.shippingAddress,
          status: "pending",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: orderData.id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_time: item.price,
      }));

      const { error: orderItemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (orderItemsError) throw orderItemsError;

      toast.success("Order placed successfully!");
      clearCart();
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        shippingAddress: "",
      });
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
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
          onChange={handleInputChange}
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
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="shippingAddress">Shipping Address</Label>
        <Input
          id="shippingAddress"
          name="shippingAddress"
          value={formData.shippingAddress}
          onChange={handleInputChange}
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