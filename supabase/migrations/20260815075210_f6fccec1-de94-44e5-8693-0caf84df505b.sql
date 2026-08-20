CREATE TYPE public.app_role AS ENUM ('admin', 'staff', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read their own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE TABLE public.project_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_id text NOT NULL DEFAULT 'PS-' || EXTRACT(YEAR FROM now())::text || '-' || LPAD(FLOOR(RANDOM() * 100000)::text, 5, '0'),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  user_type text NOT NULL DEFAULT 'individual',
  company text,
  website_url text,
  application_type text,
  project_type text NOT NULL,
  specific_requirement text,
  project_stage text,
  timeline text,
  budget text,
  deadline date,
  description text NOT NULL,
  additional_requirements text,
  help_required text,
  college_university text,
  course text,
  year_of_study text,
  brand text NOT NULL DEFAULT 'prosphere',
  priority text,
  testing_authorized boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.project_requests TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.project_requests TO authenticated;
GRANT ALL ON public.project_requests TO service_role;
ALTER TABLE public.project_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a project request" ON public.project_requests FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can read project requests" ON public.project_requests FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update project requests" ON public.project_requests FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete project requests" ON public.project_requests FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  service text,
  message text NOT NULL,
  attachment_path text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can send a contact message" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can read contact messages" ON public.contact_messages FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update contact messages" ON public.contact_messages FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete contact messages" ON public.contact_messages FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can read request attachments" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'request-attachments' AND public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.content_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL,
  title text NOT NULL,
  src text NOT NULL,
  type text NOT NULL DEFAULT 'image',
  category text,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.content_items TO authenticated;
GRANT ALL ON public.content_items TO service_role;
ALTER TABLE public.content_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active content" ON public.content_items FOR SELECT TO public USING (is_active = true);
CREATE POLICY "Admins can manage content" ON public.content_items FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));