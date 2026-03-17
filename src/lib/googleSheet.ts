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
    // Use hidden form + iframe to reliably POST to Google Apps Script
    // This bypasses CORS issues that plague fetch() with Apps Script redirects
    return new Promise((resolve) => {
      const iframe = document.createElement('iframe');
      iframe.name = 'ge-sheet-frame';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = SHEET_URL;
      form.target = 'ge-sheet-frame';

      // Add payload as hidden field
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'payload';
      input.value = JSON.stringify(payload);
      form.appendChild(input);

      document.body.appendChild(form);
      form.submit();

      // Clean up after a short delay
      setTimeout(() => {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
      }, 5000);

      console.log('[GoogleSheet] Data sent successfully via form POST');
      resolve(true);
    });
  } catch {
    console.error('[GoogleSheet] Failed to send');
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
