-- Hex Labs CMS - Supabase Schema

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Projects (Portfolio) Table
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  category text not null,
  year text not null,
  client text,
  industry text,
  description text not null,
  challenge text,
  solution text,
  services jsonb default '[]'::jsonb, -- Array of strings
  stats jsonb default '[]'::jsonb, -- Array of {label, value}
  show_gallery boolean default false,
  gallery jsonb default '[]'::jsonb, -- Array of image URLs
  main_image text,
  live_url text,
  news_url text,
  case_study_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Posts (Blog) Table
create table public.posts (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  content text not null, -- Can be HTML or JSON from TipTap
  excerpt text,
  cover_image text,
  author_id uuid references auth.users(id),
  status text check (status in ('draft', 'published')) default 'draft',
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Page Views (Analytics) Table
create table public.page_views (
  id uuid default uuid_generate_v4() primary key,
  path text not null,
  ip_geo text,
  device_type text,
  user_agent text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Setup Row Level Security (RLS)
alter table public.projects enable row level security;
alter table public.posts enable row level security;
alter table public.page_views enable row level security;

-- Policies for Projects
create policy "Public projects are viewable by everyone." on public.projects for select using (true);
create policy "Only authenticated users can insert/update/delete projects." on public.projects for all using (auth.role() = 'authenticated');

-- Policies for Posts
create policy "Published posts are viewable by everyone." on public.posts for select using (status = 'published');
create policy "Only authenticated users can insert/update/delete posts." on public.posts for all using (auth.role() = 'authenticated');

-- Policies for Page Views
create policy "Anyone can insert page views." on public.page_views for insert with check (true);
create policy "Only authenticated users can view analytics." on public.page_views for select using (auth.role() = 'authenticated');
