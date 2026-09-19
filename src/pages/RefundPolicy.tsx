import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "Refunds Before Your Programme Starts",
    body: "If you have paid for a programme such as Moot Court Sessions & Training and it has not yet started, you may request a full refund within 7 days of your payment. Email info@lmvacademy.com with your name and the email address you used to register.",
  },
  {
    title: "After Your Programme Starts",
    body: "Once you have attended a session or received programme materials, payments become non-refundable, except where required by law.",
  },
  {
    title: "Cancellations by LMV Academy",
    body: "If we cancel or indefinitely postpone a programme you have paid for, you will receive a full refund automatically — no request needed.",
  },
  {
    title: "How Refunds Are Processed",
    body: "Approved refunds are returned to your original payment method. Depending on your bank or card provider, funds typically arrive within 5–10 business days.",
  },
  {
    title: "Questions",
    body: "Email info@lmvacademy.com or WhatsApp +260 974 534 253 and include your registration details so we can help quickly.",
  },
];

const RefundPolicy = () => (
  <>
    <Helmet>
      <title>Refund Policy | LMV Academy</title>
      <meta name="description" content="Refund terms for Luminary Innovision Academy programmes, including Moot Court Sessions & Training." />
    </Helmet>
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="section-padding">
        <div className="container-narrow mx-auto max-w-3xl">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Refund Policy</h1>
          <p className="font-body text-sm text-muted-foreground mb-10">Last updated: September 2026</p>
          <div className="space-y-8">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="font-heading text-xl font-semibold text-foreground mb-2">{s.title}</h2>
                <p className="font-body text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  </>
);

export default RefundPolicy;
