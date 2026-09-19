import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Download, Loader2, LogOut, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Session } from "@supabase/supabase-js";

const LIBRARY_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/handbook-library`;

interface LibraryItem {
  id: string;
  product: string;
  label: string;
  created_at: string;
}

const MyHandbooks = () => {
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setAuthLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setAuthLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const loadLibrary = useCallback(async () => {
    setLoadingItems(true);
    try {
      const { data: { session: s } } = await supabase.auth.getSession();
      const res = await fetch(LIBRARY_URL, {
        headers: { Authorization: `Bearer ${s?.access_token ?? ""}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Could not load your handbooks");
      setItems(data.purchases ?? []);
    } catch (err) {
      toast({
        title: "Couldn't load your handbooks",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingItems(false);
    }
  }, [toast]);

  useEffect(() => {
    if (session) loadLibrary();
  }, [session, loadLibrary]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setSigningIn(true);
    const cleanEmail = email.trim().toLowerCase();
    const { error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });
    if (error) {
      const { error: signUpError } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: { emailRedirectTo: `${window.location.origin}/my-handbooks` },
      });
      if (signUpError) {
        toast({ title: "Sign in failed", description: signUpError.message, variant: "destructive" });
      } else {
        toast({
          title: "Account created",
          description: "If we ask you to confirm your email, click the link we sent you.",
        });
      }
    }
    setSigningIn(false);
  };

  const handleDownload = async (product: string) => {
    setDownloading(product);
    try {
      const { data: { session: s } } = await supabase.auth.getSession();
      const res = await fetch(LIBRARY_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${s?.access_token ?? ""}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data?.error ?? "Download unavailable");
      window.location.href = data.url;
    } catch (err) {
      toast({
        title: "Download unavailable",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setDownloading(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>My Handbooks | LMV Academy</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="section-padding">
          <div className="container-narrow mx-auto max-w-2xl">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>

            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
              My Handbooks
            </h1>
            <p className="font-body text-muted-foreground mb-8">
              Sign in with the email address you used to pay. Your handbooks stay here,
              ready to download any time.
            </p>

            {authLoading ? (
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            ) : !session ? (
              <form
                onSubmit={handleAuth}
                className="bg-background rounded-xl border border-border p-8 shadow-sm space-y-5"
              >
                <div>
                  <label htmlFor="acc-email" className="block font-body text-sm font-medium text-foreground mb-1.5">
                    Email address
                  </label>
                  <input
                    id="acc-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="the email you paid with"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div>
                  <label htmlFor="acc-password" className="block font-body text-sm font-medium text-foreground mb-1.5">
                    Password
                  </label>
                  <input
                    id="acc-password"
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="choose a password"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <button
                  type="submit"
                  disabled={signingIn}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60"
                >
                  {signingIn && <Loader2 className="w-4 h-4 animate-spin" />}
                  Sign in / create my account
                </button>
                <p className="font-body text-xs text-muted-foreground text-center">
                  First time here? We'll create your account with this email.
                </p>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-body text-sm text-muted-foreground">
                    Signed in as <strong className="text-foreground">{session.user.email}</strong>
                  </p>
                  <button
                    type="button"
                    onClick={() => supabase.auth.signOut()}
                    className="inline-flex items-center gap-1.5 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>

                {loadingItems ? (
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                ) : items.length === 0 ? (
                  <div className="bg-secondary/40 rounded-xl border border-border p-8 text-center">
                    <BookOpen className="w-8 h-8 text-primary mx-auto mb-4" />
                    <p className="font-body text-sm text-foreground mb-2">
                      No confirmed handbook payments on this email yet.
                    </p>
                    <p className="font-body text-sm text-muted-foreground mb-6">
                      If you paid by mobile money, your handbook appears here as soon as we
                      confirm your payment.
                    </p>
                    <Link
                      to="/research-handbook"
                      className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      Buy the Research Handbook
                    </Link>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="bg-background rounded-xl border border-border p-6 shadow-sm flex flex-wrap items-center justify-between gap-4"
                      >
                        <div>
                          <p className="font-heading text-base font-semibold text-foreground">
                            {item.label}
                          </p>
                          <p className="font-body text-xs text-muted-foreground mt-1">
                            Paid on {new Date(item.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDownload(item.product)}
                          disabled={downloading === item.product}
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60"
                        >
                          {downloading === item.product ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Download className="w-4 h-4" />
                          )}
                          Download PDF
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MyHandbooks;
