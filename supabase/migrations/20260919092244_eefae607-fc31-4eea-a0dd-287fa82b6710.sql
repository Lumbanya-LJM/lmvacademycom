CREATE TABLE public.handbook_purchases (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  email text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  payment_method text NOT NULL DEFAULT 'card',
  paddle_transaction_id text,
  environment text NOT NULL DEFAULT 'sandbox',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT INSERT ON public.handbook_purchases TO anon;
GRANT SELECT, INSERT, UPDATE ON public.handbook_purchases TO authenticated;
GRANT ALL ON public.handbook_purchases TO service_role;

ALTER TABLE public.handbook_purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can start a purchase"
ON public.handbook_purchases
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view purchases"
ON public.handbook_purchases
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update purchases"
ON public.handbook_purchases
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));