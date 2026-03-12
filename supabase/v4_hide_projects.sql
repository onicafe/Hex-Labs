-- Phase 9: Project Hiding Functionality

-- Add is_hidden column to projects table if it doesn't exist
alter table public.projects 
add column if not exists is_hidden boolean default false not null;
