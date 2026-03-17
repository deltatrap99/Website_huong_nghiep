import { QuizResult } from '@/types/quiz';

const SHEET_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL || '';

interface SheetPayload {
  name: string;
  email: string;
  phone: string;
  province: string;
  mbtiLite: string;
  riasecPrimary: string;
  riasecSecondary: string;
  archetypeCode: string;
  archetypeNameVi: string;
  archetypeNameEn: string;
  scores: Record<string, number>;
  competency: {
    english: number;
    self_study: number;
    soft_skill: number;
  };
  leadScore: number;
  careers: string;
  strengths: string;
  improvements: string;
}

export async function sendToGoogleSheet(
  result: QuizResult,
  leadInfo?: { name?: string; email?: string; phone?: string; province?: string }
): Promise<boolean> {
  if (!SHEET_URL) {
    console.warn('[GoogleSheet] No SHEET_URL configured. Skipping.');
    return false;
  }

  const payload: SheetPayload = {
    name: leadInfo?.name || '',
    email: leadInfo?.email || '',
    phone: leadInfo?.phone || '',
    province: leadInfo?.province || '',
    mbtiLite: result.mbtiLite,
    riasecPrimary: result.riasecPrimary,
    riasecSecondary: result.riasecSecondary,
    archetypeCode: result.archetype.code,
    archetypeNameVi: result.archetype.nameVi,
    archetypeNameEn: result.archetype.name,
    scores: { ...result.riasecScores },
    competency: result.competencyProfile,
    leadScore: result.leadScore,
    careers: result.archetype.careers.map((c) => c.name).join(', '),
    strengths: result.archetype.strengths.map((s) => s.title).join(', '),
    improvements: result.archetype.improvements.map((i) => i.title).join(', '),
  };

  try {
    await fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    console.log('[GoogleSheet] Data sent successfully');
    return true;
  } catch (err) {
    console.error('[GoogleSheet] Failed to send:', err);
    return false;
  }
}

// CSV Export utility for admin
export function exportResultsToCSV(
  results: { name: string; email: string; date: string; result: QuizResult }[]
): string {
  const headers = [
    'Ngày',
    'Họ tên',
    'Email',
    'MBTI-Lite',
    'RIASEC Primary',
    'RIASEC Secondary',
    'Archetype (VI)',
    'Archetype (EN)',
    'R', 'I', 'A', 'S', 'E', 'C',
    'English', 'Self Study', 'Soft Skill',
    'Lead Score',
    'Ngành nghề gợi ý',
  ];

  const rows = results.map((r) => [
    new Date(r.date).toLocaleString('vi-VN'),
    r.name,
    r.email,
    r.result.mbtiLite,
    r.result.riasecPrimary,
    r.result.riasecSecondary,
    r.result.archetype.nameVi,
    r.result.archetype.name,
    r.result.riasecScores.R,
    r.result.riasecScores.I,
    r.result.riasecScores.A,
    r.result.riasecScores.S,
    r.result.riasecScores.E,
    r.result.riasecScores.C,
    r.result.competencyProfile.english,
    r.result.competencyProfile.self_study,
    r.result.competencyProfile.soft_skill,
    r.result.leadScore,
    r.result.archetype.careers.map((c) => c.name).join(' | '),
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) =>
      row.map((cell) => {
        const str = String(cell);
        return str.includes(',') || str.includes('"') || str.includes('\n')
          ? `"${str.replace(/"/g, '""')}"`
          : str;
      }).join(',')
    ),
  ].join('\n');

  return csvContent;
}

export function downloadCSV(csv: string, filename: string) {
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
