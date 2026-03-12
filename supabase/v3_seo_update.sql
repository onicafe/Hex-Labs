-- Phase 8 SEO System

create table if not exists public.seo_settings (
  id uuid default uuid_generate_v4() primary key,
  site_name text not null default 'Hex Labs',
  meta_title text not null default 'Hex Labs | Engenharia de Software',
  meta_description text not null default 'Desenvolvemos soluções de software premium e aplicativos móveis para revolucionar seu negócio.',
  keywords text not null default 'software, desenvolvimento, aplicativo, web, design',
  og_image text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.seo_settings enable row level security;

drop policy if exists "Public seo_settings are viewable by everyone." on public.seo_settings;
create policy "Public seo_settings are viewable by everyone." on public.seo_settings for select using (true);

drop policy if exists "Only authenticated users can manage seo_settings." on public.seo_settings;
create policy "Only authenticated users can manage seo_settings." on public.seo_settings for all using (auth.role() = 'authenticated');

-- Insert default row if empty
insert into public.seo_settings (site_name)
select 'Hex Labs'
where not exists (select 1 from public.seo_settings);
