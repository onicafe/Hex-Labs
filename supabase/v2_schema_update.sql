-- Phase 1 Schema Updates: Run this in your Supabase SQL Editor

-- 1. Add main_image to posts
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS main_image text;

-- 2. Create products table
create table if not exists public.products (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  tagline text not null,
  description text not null,
  features jsonb default '[]'::jsonb,
  icon text not null,
  image text not null,
  metrics jsonb default '[]'::jsonb,
  status text not null,
  site_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create trusted_brands table
create table if not exists public.trusted_brands (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  logo_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Enable RLS
alter table public.products enable row level security;
alter table public.trusted_brands enable row level security;

-- 5. Policies
-- Products
drop policy if exists "Public products are viewable by everyone." on public.products;
create policy "Public products are viewable by everyone." on public.products for select using (true);

drop policy if exists "Only authenticated users can manage products." on public.products;
create policy "Only authenticated users can manage products." on public.products for all using (auth.role() = 'authenticated');

-- Trusted Brands
drop policy if exists "Public brands are viewable by everyone." on public.trusted_brands;
create policy "Public brands are viewable by everyone." on public.trusted_brands for select using (true);

drop policy if exists "Only authenticated users can manage brands." on public.trusted_brands;
create policy "Only authenticated users can manage brands." on public.trusted_brands for all using (auth.role() = 'authenticated');

-- 6. Storage Bucket Setup for 'media'
insert into storage.buckets (id, name, public) 
values ('media', 'media', true)
on conflict (id) do nothing;

-- 7. Storage Policies for 'media' bucket
-- Allowed to be public read
create policy "Media is publicly accessible" on storage.objects for select using (bucket_id = 'media');

-- Only authenticated users can upload, update, delete
create policy "Authenticated users can upload media" on storage.objects for insert with check (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "Authenticated users can update media" on storage.objects for update using (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "Authenticated users can delete media" on storage.objects for delete using (bucket_id = 'media' and auth.role() = 'authenticated');
