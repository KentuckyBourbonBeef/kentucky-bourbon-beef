import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CheckoutForm } from "./checkout/CheckoutForm";

export function Checkout() {
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    shippingAddress: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <CheckoutForm
      formData={formData}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
      loading={loading}
      total={total}
    />
  );
}