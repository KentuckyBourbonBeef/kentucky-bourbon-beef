import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
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
          <h1 className="text-4xl font-serif mb-8">Privacy Policy</h1>
          
          <section className="mb-8">
            <h2>Information We Collect</h2>
            <p>When you use Kentucky Bourbon Beef, we collect information that you provide directly to us, including:</p>
            <ul>
              <li>Name and contact information</li>
              <li>Shipping and billing addresses</li>
              <li>Payment information</li>
              <li>Order history and preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and updates</li>
              <li>Provide customer support</li>
              <li>Improve our products and services</li>
              <li>Send marketing communications (with your consent)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>Information Sharing</h2>
            <p>We do not sell your personal information. We share your information only with:</p>
            <ul>
              <li>Shipping partners to deliver your orders</li>
              <li>Payment processors to handle transactions</li>
              <li>Service providers who assist our operations</li>
            </ul>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>If you have any questions about our privacy practices, please contact us at privacy@kybourbonbeef.com</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;