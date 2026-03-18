-- Hướng Nghiệp Backend — Database Migration
-- Run this in Supabase SQL Editor

-- ==================================
-- 1. quiz_sessions
-- ==================================
CREATE TABLE IF NOT EXISTS quiz_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID DEFAULT NULL,
  mode TEXT NOT NULL DEFAULT 'full' CHECK (mode IN ('quick', 'full')),
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ DEFAULT NULL,
  answers_json JSONB NOT NULL DEFAULT '[]',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  ambassador_ref TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==================================
-- 2. quiz_results (replace existing table if needed)
-- ==================================
-- Drop the old table if it exists (from previous implementation)
-- WARNING: This will delete existing data. Skip if you want to keep it.
-- DROP TABLE IF EXISTS quiz_results;

CREATE TABLE IF NOT EXISTS quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES quiz_sessions(id) ON DELETE CASCADE,
  mbti_lite TEXT NOT NULL,
  riasec_primary CHAR(1) NOT NULL,
  riasec_secondary CHAR(1) NOT NULL,
  riasec_scores JSONB NOT NULL DEFAULT '{}',
  archetype_code TEXT NOT NULL,
  competency JSONB NOT NULL DEFAULT '{}',
  lead_score INTEGER DEFAULT 0,
  lead_tier TEXT DEFAULT 'cold' CHECK (lead_tier IN ('hot', 'warm', 'cold')),
  result_json JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==================================
-- 3. leads
-- ==================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES quiz_sessions(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  province TEXT,
  grade TEXT,
  lead_tier TEXT DEFAULT 'cold' CHECK (lead_tier IN ('hot', 'warm', 'cold')),
  ambassador_ref TEXT,
  contacted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==================================
-- 4. blog_posts (optional, Phase 4)
-- ==================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  image_url TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ==================================
-- Indexes
-- ==================================
CREATE INDEX IF NOT EXISTS idx_quiz_results_created_at ON quiz_results(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_results_archetype ON quiz_results(archetype_code);
CREATE INDEX IF NOT EXISTS idx_quiz_results_lead_tier ON quiz_results(lead_tier);
CREATE INDEX IF NOT EXISTS idx_quiz_results_session ON quiz_results(session_id);
CREATE INDEX IF NOT EXISTS idx_leads_tier ON leads(lead_tier);
CREATE INDEX IF NOT EXISTS idx_leads_contacted ON leads(contacted);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_mode ON quiz_sessions(mode);

-- ==================================
-- RLS Policies (Row Level Security)
-- ==================================
ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (for API routes)
CREATE POLICY "service_role_all_quiz_sessions" ON quiz_sessions
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "service_role_all_quiz_results" ON quiz_results
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "service_role_all_leads" ON leads
  FOR ALL USING (true) WITH CHECK (true);

-- Blog: public can read published posts
CREATE POLICY "public_read_published_blog" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "service_role_all_blog" ON blog_posts
  FOR ALL USING (true) WITH CHECK (true);
