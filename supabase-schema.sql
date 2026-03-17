-- =====================================================
-- SUPABASE SQL — Chạy trong Supabase SQL Editor
-- =====================================================
-- Vào: https://supabase.com/dashboard > Project > SQL Editor
-- Paste toàn bộ code dưới đây > Run
-- =====================================================

CREATE TABLE IF NOT EXISTS quiz_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  
  -- Quiz result data
  mbti_lite TEXT NOT NULL,
  riasec_primary TEXT NOT NULL,
  riasec_secondary TEXT NOT NULL,
  archetype_code TEXT NOT NULL,
  archetype_name_vi TEXT NOT NULL,
  archetype_name_en TEXT NOT NULL,
  
  -- RIASEC scores
  r_score INTEGER DEFAULT 0,
  i_score INTEGER DEFAULT 0,
  a_score INTEGER DEFAULT 0,
  s_score INTEGER DEFAULT 0,
  e_score INTEGER DEFAULT 0,
  c_score INTEGER DEFAULT 0,
  
  -- Competency scores
  english_score INTEGER DEFAULT 0,
  self_study_score INTEGER DEFAULT 0,
  soft_skill_score INTEGER DEFAULT 0,
  
  -- Lead score
  lead_score INTEGER DEFAULT 0,
  
  -- Text summaries
  careers TEXT DEFAULT '',
  strengths TEXT DEFAULT '',
  improvements TEXT DEFAULT '',
  
  -- Full result JSON for re-hydration
  result_json JSONB DEFAULT '{}'::jsonb
);

-- Enable Row Level Security
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- Allow anyone to INSERT (anonymous quiz submissions)
CREATE POLICY "Anyone can insert quiz results"
  ON quiz_results FOR INSERT
  WITH CHECK (true);

-- Allow anyone to SELECT (for admin dashboard - we use app-level auth)
CREATE POLICY "Anyone can read quiz results"
  ON quiz_results FOR SELECT
  USING (true);

-- Create index for fast queries
CREATE INDEX idx_quiz_results_created_at ON quiz_results(created_at DESC);
CREATE INDEX idx_quiz_results_archetype ON quiz_results(archetype_code);
