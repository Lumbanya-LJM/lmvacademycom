ALTER TABLE public.moot_court_registrations ADD COLUMN IF NOT EXISTS payment_method text NOT NULL DEFAULT 'card';

CREATE POLICY "Admins can update registrations"
ON public.moot_court_registrations
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));