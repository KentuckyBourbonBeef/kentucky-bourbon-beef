import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        
        <div className="prose prose-bourbon max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif mb-8">Terms of Service</h1>
          
          <section className="mb-8">
            <h2>Agreement to Terms</h2>
            <p>By accessing and placing an order with Kentucky Bourbon Beef, you confirm that you are in agreement with and bound by these terms of service.</p>
          </section>

          <section className="mb-8">
            <h2>Products and Pricing</h2>
            <p>All products are subject to availability. Prices are subject to change without notice. We reserve the right to discontinue any product at any time.</p>
          </section>

          <section className="mb-8">
            <h2>Shipping Policy</h2>
            <p>We ship our premium beef products using specialized cold shipping methods to ensure quality:</p>
            <ul>
              <li>Orders are shipped Monday through Wednesday to avoid weekend transit</li>
              <li>All products are packed with dry ice and insulation</li>
              <li>Standard shipping takes 2-3 business days</li>
              <li>Express overnight shipping is available for select areas</li>
              <li>Free shipping on orders over $200</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>Return Policy</h2>
            <p>We stand behind the quality of our products:</p>
            <ul>
              <li>If you're not satisfied with your order, contact us within 24 hours of delivery</li>
              <li>Products must be unopened and maintained at proper temperature</li>
              <li>We'll replace or refund any product that doesn't meet our quality standards</li>
              <li>Shipping costs for returns due to quality issues will be covered by us</li>
              <li>For food safety reasons, we cannot accept returns of opened products</li>
            </ul>
          </section>

          <section>
            <h2>Contact Information</h2>
            <p>For any questions or concerns about our terms, please contact us at support@kybourbonbeef.com</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;