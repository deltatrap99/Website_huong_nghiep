'use client';

import { motion } from 'framer-motion';
import { RIASECScores } from '@/types/quiz';

const labels: Record<string, { name: string; color: string }> = {
  R: { name: 'Realistic', color: '#0EA5E9' },
  I: { name: 'Investigative', color: '#8B5CF6' },
  A: { name: 'Artistic', color: '#EC4899' },
  S: { name: 'Social', color: '#22C55E' },
  E: { name: 'Enterprising', color: '#F97316' },
  C: { name: 'Conventional', color: '#6366F1' },
};

export default function RIASECChart({ scores }: { scores: RIASECScores }) {
  const maxScore = Math.max(...Object.values(scores), 1);

  return (
    <div className="space-y-4">
      {Object.entries(scores).map(([key, value], i) => {
        const pct = (value / maxScore) * 100;
        const label = labels[key];
        return (
          <div key={key}>
            <div className="flex justify-between items-end mb-1.5">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: label.color }}
                />
                <span className="text-sm font-medium text-ge-gray-700">
                  {label.name}
                </span>
              </div>
              <span className="text-sm text-ge-gray-500 font-medium">
                {value}
              </span>
            </div>
            <div className="h-4 bg-ge-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: label.color }}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
