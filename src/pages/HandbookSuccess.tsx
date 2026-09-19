import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle, Loader2, Download, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const STATUS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/handbook-status`;

const HandbookSuccess = () => {
  const [searchParams] = useSearchParams();
  const purchaseId = searchParams.get("id");
  const isResearch = searchParams.get("product") === "research";
  const productName = isResearch ? "Research Handbook" : "Mooting Handbook";
  const downloadHref = isResearch ? "/research-handbook.pdf" : "/handbook.pdf";
  const downloadName = isResearch ? "Research-Handbook.pdf" : "Mooting-Handbook.pdf";
  const [status, setStatus] = useState<"checking" | "paid" | "pending">("checking");

  useEffect(() => {
    if (!purchaseId) {
      setStatus("pending");
      return;
    }
    let cancelled = false;
    let attempts = 0;

    const check = async () => {
      try {
        const res = await fetch(`${STATUS_URL}?id=${encodeURIComponent(purchaseId)}`);
        const data = await res.json();
        if (cancelled) return;
        if (data.status === "paid") {
          setStatus("paid");
          return;
        }
        setStatus("pending");
        attempts += 1;
        if (attempts < 15) setTimeout(check, 4000);
      } catch {
        if (!cancelled) {
          attempts += 1;
          if (attempts < 15) setTimeout(check, 4000);
          else setStatus("pending");
        }
      }
    };
    check();
    return () => {
      cancelled = true;
    };
  }, [purchaseId]);

  return (
    <>
      <Helmet>
        <title>{`Thank You | ${productName}`}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="section-padding">
          <div className="container-narrow mx-auto max-w-2xl text-center">
            {status === "checking" ? (
              <>
                <Loader2 className="w-14 h-14 text-primary animate-spin mx-auto mb-6" />
                <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
                  Confirming your payment…
                </h1>
                <p className="font-body text-muted-foreground">
                  This usually takes a few seconds. Please don't close this page.
                </p>
              </>
            ) : status === "paid" ? (
              <>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-9 h-9 text-primary" />
                </div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Payment confirmed!
                </h1>
                <p className="font-body text-muted-foreground mb-8">
                  Thank you for your purchase. Your handbook is ready — download it below.
                </p>
                <Link
                  to="/my-handbooks"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Go to my handbooks to download
                </Link>
                <p className="font-body text-xs text-muted-foreground mt-4">
                  Sign in with the email you paid with — your handbook stays in your
                  account so you can download it any time.
                </p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-9 h-9 text-primary" />
                </div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Thank you!
                </h1>
                <p className="font-body text-muted-foreground mb-8">
                  We're still confirming your payment. Once it's confirmed, your
                  download will appear on this page — you can refresh in a moment,
                  or contact us on WhatsApp if you need help.
                </p>
              </>
            )}

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-foreground transition-colors mt-10"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HandbookSuccess;
