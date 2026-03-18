import HeroSection from '@/components/home/HeroSection';
import WhySection from '@/components/home/WhySection';
import MethodologySection from '@/components/home/MethodologySection';
import PreviewSection from '@/components/home/PreviewSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import BlogPreviewSection from '@/components/home/BlogPreviewSection';
import FinalCTASection from '@/components/home/FinalCTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhySection />
      <MethodologySection />
      <PreviewSection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <FinalCTASection />
    </>
  );
}
