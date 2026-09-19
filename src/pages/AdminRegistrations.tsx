import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Loader2, LogOut, Users, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

interface Registration {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  status: string;
  environment: string;
  payment_method: string;
  created_at: string;
}

interface Enquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

interface Purchase {
  id: string;
  full_name: string;
  email: string;
  status: string;
  environment: string;
  payment_method: string;
  created_at: string;
}

const AdminRegistrations = () => {
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [markingPaid, setMarkingPaid] = useState<string | null>(null);

  const markAsPaid = async (id: string, table: "moot_court_registrations" | "handbook_purchases") => {
    setMarkingPaid(id);
    const { error } = await supabase
      .from(table)
      .update({ status: "paid" })
      .eq("id", id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
    } else if (table === "moot_court_registrations") {
      setRegistrations((prev) => prev.map((r) => (r.id === id ? { ...r, status: "paid" } : r)));
      toast({ title: "Marked as paid", description: "The registration is now confirmed." });
    } else {
      setPurchases((prev) => prev.map((p) => (p.id === id ? { ...p, status: "paid" } : p)));
      toast({ title: "Marked as paid", description: "The handbook purchase is now confirmed." });
    }
    setMarkingPaid(null);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setAuthLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setAuthLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    const load = async () => {
      setDataLoading(true);
      const [{ data: regs }, { data: enqs }] = await Promise.all([
        supabase.from("moot_court_registrations").select("*").order("created_at", { ascending: false }),
        supabase.from("contact_enquiries").select("*").order("created_at", { ascending: false }),
      ]);
      setRegistrations(regs ?? []);
      setEnquiries(enqs ?? []);
      setDataLoading(false);
    };
    load();
  }, [session]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSigningIn(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) {
      // If the account doesn't exist yet, create it
      const { error: signUpError } = await supabase.auth.signUp({ email: email.trim(), password });
      if (signUpError) {
        toast({ title: "Sign in failed", description: signUpError.message, variant: "destructive" });
      } else {
        toast({ title: "Account created", description: "Check your email to confirm, then sign in again." });
      }
    }
    setSigningIn(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("en-ZM", { dateStyle: "medium", timeStyle: "short" });

  return (
    <>
      <Helmet>
        <title>Admin | LMV Academy</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="min-h-screen bg-background section-padding">
        <div className="container-narrow mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-heading text-3xl font-bold text-foreground">Registrations & Enquiries</h1>
            {session && (
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4" />
                Sign out
              </Button>
            )}
          </div>

          {authLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : !session ? (
            <div className="max-w-md mx-auto bg-card rounded-2xl border border-border p-8">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-2">Staff sign in</h2>
              <p className="font-body text-sm text-muted-foreground mb-6">
                This area is restricted to LMV Academy staff.
              </p>
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label htmlFor="admin-email" className="block text-sm font-medium text-foreground mb-1">Email</label>
                  <Input id="admin-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-12" />
                </div>
                <div>
                  <label htmlFor="admin-password" className="block text-sm font-medium text-foreground mb-1">Password</label>
                  <Input id="admin-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="h-12" />
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={signingIn}>
                  {signingIn ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign in"}
                </Button>
              </form>
            </div>
          ) : dataLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-12">
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-5 h-5 text-primary" />
                  <h2 className="font-heading text-xl font-semibold text-foreground">
                    Moot Court Registrations ({registrations.length})
                  </h2>
                </div>
                {registrations.length === 0 ? (
                  <p className="font-body text-muted-foreground bg-card border border-border rounded-xl p-6">
                    No registrations visible. If you expected some, your account may not have staff access yet — contact the site administrator.
                  </p>
                ) : (
                  <div className="bg-card border border-border rounded-xl overflow-x-auto">
                    <table className="w-full text-sm font-body">
                      <thead>
                        <tr className="border-b border-border text-left text-muted-foreground">
                          <th className="p-4">Name</th>
                          <th className="p-4">Email</th>
                          <th className="p-4">Phone</th>
                          <th className="p-4">Payment</th>
                          <th className="p-4">Status</th>
                          <th className="p-4">Mode</th>
                          <th className="p-4">Registered</th>
                          <th className="p-4"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {registrations.map((r) => (
                          <tr key={r.id} className="border-b border-border last:border-0">
                            <td className="p-4 text-foreground font-medium">{r.full_name}</td>
                            <td className="p-4 text-muted-foreground">{r.email}</td>
                            <td className="p-4 text-muted-foreground">{r.phone ?? "—"}</td>
                            <td className="p-4 text-muted-foreground">{r.payment_method === "mobile_money" ? "Mobile Money" : "Card"}</td>
                            <td className="p-4">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${r.status === "paid" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`}>
                                {r.status}
                              </span>
                            </td>
                            <td className="p-4 text-muted-foreground">{r.environment}</td>
                            <td className="p-4 text-muted-foreground">{formatDate(r.created_at)}</td>
                            <td className="p-4">
                              {r.status !== "paid" && r.payment_method === "mobile_money" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  disabled={markingPaid === r.id}
                                  onClick={() => markAsPaid(r.id)}
                                >
                                  {markingPaid === r.id ? <Loader2 className="w-3 h-3 animate-spin" /> : "Mark paid"}
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-5 h-5 text-primary" />
                  <h2 className="font-heading text-xl font-semibold text-foreground">
                    Contact Enquiries ({enquiries.length})
                  </h2>
                </div>
                {enquiries.length === 0 ? (
                  <p className="font-body text-muted-foreground bg-card border border-border rounded-xl p-6">
                    No enquiries yet.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {enquiries.map((q) => (
                      <div key={q.id} className="bg-card border border-border rounded-xl p-6">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <p className="font-body font-semibold text-foreground">{q.name} <span className="font-normal text-muted-foreground">&lt;{q.email}&gt;</span></p>
                          <p className="font-body text-xs text-muted-foreground">{formatDate(q.created_at)}</p>
                        </div>
                        <p className="font-body text-sm text-muted-foreground whitespace-pre-wrap">{q.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminRegistrations;
