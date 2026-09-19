import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BookOpen, Check, Loader2, ArrowLeft, CreditCard, Smartphone, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { usePaddleCheckout } from "@/hooks/usePaddleCheckout";
import { useToast } from "@/hooks/use-toast";

const WHATSAPP_NUMBER = "260974534253";

const included = [
  "A step-by-step guide to moot court preparation",
  "Written and reviewed by experienced lawyers",
  "Templates for moot briefs you can use right away",
  "Tips on oral advocacy, legal argumentation and courtroom etiquette",
  "Instant PDF download after payment — yours to keep forever",
];

const Handbook = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mobile">("card");
  const [mobileRegistered, setMobileRegistered] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { openCheckout, loading: checkoutLoading } = usePaddleCheckout();
  const { toast } = useToast();

  const loading = submitting || checkoutLoading;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello LMV Academy, I'm ${fullName.trim() || "a student"}. I'd like to buy the Mooting Handbook (K350) via mobile money. Please share your agent code. My email: ${email.trim()}`
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
      const purchaseId = crypto.randomUUID();
      const { error } = await supabase.from("handbook_purchases").insert({
        id: purchaseId,
        full_name: fullName.trim(),
        email: email.trim().toLowerCase(),
        payment_method: paymentMethod === "mobile" ? "mobile_money" : "card",
      });

      if (error) {
        throw new Error(error.message || "Could not save purchase");
      }

      if (paymentMethod === "mobile") {
        setMobileRegistered(true);
        return;
      }

      await openCheckout({
        priceId: "handbook_full",
        quantity: 1,
        customerEmail: email.trim().toLowerCase(),
        customData: { purchaseId },
        successUrl: `${window.location.origin}/handbook/success?id=${purchaseId}`,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Something went wrong",
        description: "We couldn't start your purchase. Please try again or contact us on WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Mooting Handbook | Buy & Download</title>
        <meta
          name="description"
          content="Buy the Mooting Handbook for K350 / $18. Pay by card or mobile money and download your PDF instantly."
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
              {/* Product details */}
              <div>
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <BookOpen className="w-7 h-7 text-primary" />
                </div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Mooting Handbook
                </h1>
                <p className="font-body text-muted-foreground leading-relaxed mb-6">
                  Your essential digital study companion. Pay once and download the
                  full handbook as a PDF — instantly after payment.
                </p>

                <div className="bg-secondary/40 rounded-xl border border-border p-6 mb-6">
                  <p className="font-heading text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                    What you get
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
                <p className="font-body text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5" />
                  Digital PDF download — no shipping, no waiting.
                </p>
              </div>

              {/* Purchase form */}
              <div className="bg-background rounded-xl border border-border p-8 shadow-sm">
                <h2 className="font-heading text-xl font-semibold text-foreground mb-2">
                  Buy &amp; Download
                </h2>
                <p className="font-body text-sm text-muted-foreground mb-6">
                  Enter your details, choose how to pay, and get your handbook.
                </p>

                {mobileRegistered ? (
                  <div className="space-y-5">
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-5">
                      <h3 className="font-heading text-base font-semibold text-foreground mb-3">
                        Almost there, {fullName.trim().split(" ")[0]}!
                      </h3>
                      <ol className="list-decimal list-inside space-y-2 font-body text-sm text-foreground">
                        <li>Send <strong>K350</strong> via Airtel Money to agent code <strong className="text-primary">20319930</strong>.</li>
                        <li>Share your payment screenshot on WhatsApp — we'll send you the handbook once confirmed.</li>
                      </ol>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText("20319930");
                        toast({ title: "Agent code copied", description: "20319930 — paste it in your Airtel Money app." });
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-primary bg-primary/5 px-6 py-3 font-body text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
                    >
                      Copy agent code
                    </button>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      <Smartphone className="w-4 h-4" />
                      Send your payment proof on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => setMobileRegistered(false)}
                      className="w-full font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Back — I'd rather pay by card
                    </button>
                  </div>
                ) : (
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
                      <p className="block font-body text-sm font-medium text-foreground mb-2">
                        How would you like to pay?
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("card")}
                          className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 font-body text-sm font-medium transition-colors ${
                            paymentMethod === "card"
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border bg-background text-muted-foreground hover:border-primary/40"
                          }`}
                        >
                          <CreditCard className="w-4 h-4" />
                          Card
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("mobile")}
                          className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 font-body text-sm font-medium transition-colors ${
                            paymentMethod === "mobile"
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border bg-background text-muted-foreground hover:border-primary/40"
                          }`}
                        >
                          <Smartphone className="w-4 h-4" />
                          Mobile Money
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60"
                    >
                      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                      {paymentMethod === "card" ? "Buy the handbook — K350 / $18" : "Pay K350 with Mobile Money"}
                    </button>

                    <p className="font-body text-xs text-muted-foreground text-center">
                      {paymentMethod === "card"
                        ? "Secure payment. Your download unlocks immediately after payment."
                        : "You'll get our mobile money agent code and payment steps on the next screen."}
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Handbook;
