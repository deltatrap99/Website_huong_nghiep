import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StickyMobileCTA from '@/components/ui/StickyMobileCTA';

export const metadata: Metadata = {
  title: 'Trắc nghiệm Hướng nghiệp Miễn phí | Galaxy Education',
  description:
    'Khám phá ngành nghề phù hợp với bạn qua bài trắc nghiệm hướng nghiệp 30 phút. Dựa trên framework HOLLAND RIASEC quốc tế. Miễn phí 100%.',
  openGraph: {
    title: 'Trắc nghiệm Hướng nghiệp Miễn phí | Galaxy Education',
    description:
      'Khám phá ngành nghề phù hợp trong 30 phút với framework HOLLAND RIASEC quốc tế.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-body antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
