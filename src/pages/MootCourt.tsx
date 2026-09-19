import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Gavel, Check, Loader2, ArrowLeft, CreditCard, Smartphone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { usePaddleCheckout } from "@/hooks/usePaddleCheckout";
import { useToast } from "@/hooks/use-toast";

const WHATSAPP_NUMBER = "260974534253";

const included = [
  "Full moot court training sessions with experienced practitioners",
  "Moot brief preparation guidance and templates",
  "Advocacy and legal argumentation skills coaching",
  "Case presentation and trial technique practice",
  "Personalized feedback on your courtroom performance",
  "Certificate of completion from LMV Academy",
];

const MootCourt = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mobile">("card");
  const [mobileRegistered, setMobileRegistered] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { openCheckout, loading: checkoutLoading } = usePaddleCheckout();
  const { toast } = useToast();

  const loading = submitting || checkoutLoading;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello LMV Academy, I'm ${fullName.trim() || "a student"}. I've registered for Moot Court Sessions & Training and I'd like to pay K350 via mobile money. Please share your agent code. My email: ${email.trim()}`
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      toast({
        title: "Missing details",
        description: "Please enter your full name and email address.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const registrationId = crypto.randomUUID();
      const { error } = await supabase
        .from("moot_court_registrations")
        .insert({
          id: registrationId,
          full_name: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim() || null,
          payment_method: paymentMethod === "mobile" ? "mobile_money" : "card",
        });

      if (error) {
        throw new Error(error.message || "Could not save registration");
      }

      if (paymentMethod === "mobile") {
        setMobileRegistered(true);
        return;
      }

      await openCheckout({
        priceId: "moot_court_full",
        quantity: 1,
        customerEmail: email.trim().toLowerCase(),
        customData: { registrationId },
        successUrl: `${window.location.origin}/moot-court/success`,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Something went wrong",
        description: "We couldn't start your registration. Please try again or contact us on WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Moot Court Registration | LMV Academy</title>
        <meta
          name="description"
          content="Register for LMV Academy's Moot Court Sessions & Training. Full package for K350 / $18 — brief preparation, advocacy coaching, and courtroom practice."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="section-padding">
          <div className="container-narrow mx-auto max-w-5xl">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>

            <div className="grid md:grid-cols-2 gap-10 items-start">
              {/* Package details */}
              <div>
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Gavel className="w-7 h-7 text-primary" />
                </div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Moot Court Sessions &amp; Training
                </h1>
                <p className="font-body text-muted-foreground leading-relaxed mb-6">
                  Register for the full moot court package. Build confidence in legal
                  argumentation, case presentation, and trial technique with hands-on
                  courtroom practice.
                </p>

                <div className="bg-secondary/40 rounded-xl border border-border p-6 mb-6">
                  <p className="font-heading text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                    What's included
                  </p>
                  <ul className="space-y-3">
                    {included.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="font-body text-sm text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="font-heading text-3xl font-bold text-foreground">K350</span>
                  <span className="font-body text-muted-foreground">/ $18 — one-time payment</span>
                </div>
              </div>

              {/* Registration form */}
              <div className="bg-background rounded-xl border border-border p-8 shadow-sm">
                <h2 className="font-heading text-xl font-semibold text-foreground mb-2">
                  Register &amp; Pay
                </h2>
                <p className="font-body text-sm text-muted-foreground mb-6">
                  Fill in your details, then complete the secure payment to confirm your spot.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="fullName" className="block font-body text-sm font-medium text-foreground mb-1.5">
                      Full name *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      placeholder="e.g. Nalishebo Sakala"
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-body text-sm font-medium text-foreground mb-1.5">
                      Email address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block font-body text-sm font-medium text-foreground mb-1.5">
                      Phone / WhatsApp (optional)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+260 ..."
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60"
                  >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    Start your training now!
                  </button>

                  <p className="font-body text-xs text-muted-foreground text-center">
                    Secure payment. You'll receive a confirmation email once your payment is complete.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MootCourt;
