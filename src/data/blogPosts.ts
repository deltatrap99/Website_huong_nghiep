import { BlogPost } from '@/types/quiz';

export const blogPosts: BlogPost[] = [
  {
    slug: 'top-10-nganh-nghe-tuong-lai-2026',
    title: 'Top 10 ngành nghề có triển vọng nhất năm 2026',
    excerpt:
      'Khám phá những ngành nghề đang "hot" và có tiềm năng phát triển mạnh trong tương lai gần, giúp bạn định hướng đúng đắn.',
    category: 'Xu hướng ngành nghề',
    image: '/images/blog/top-careers.png',
    date: '2026-03-15',
    readTime: 5,
    featured: true,
  },
  {
    slug: 'ky-nang-mem-sinh-vien-can-co',
    title: '7 kỹ năng mềm sinh viên cần có trước khi ra trường',
    excerpt:
      'Không chỉ kiến thức chuyên môn, kỹ năng mềm đóng vai trò then chốt giúp bạn thành công trong công việc.',
    category: 'Kỹ năng',
    image: '/images/blog/soft-skills.png',
    date: '2026-03-10',
    readTime: 4,
  },
  {
    slug: 'riasec-la-gi-huong-nghiep',
    title: 'RIASEC là gì? Cách dùng Holland Code để chọn nghề phù hợp',
    excerpt:
      'Tìm hiểu framework RIASEC/Holland Code - công cụ hướng nghiệp được hàng triệu người sử dụng trên thế giới.',
    category: 'Hướng nghiệp theo ngành',
    image: '/images/blog/riasec.png',
    date: '2026-03-05',
    readTime: 6,
    featured: true,
  },
  {
    slug: 'du-hoc-hay-hoc-trong-nuoc',
    title: 'Du học hay học trong nước? So sánh chi tiết cho Gen Z',
    excerpt:
      'Phân tích ưu nhược điểm của cả hai con đường, giúp bạn đưa ra quyết định phù hợp với hoàn cảnh.',
    category: 'Định hướng học tập',
    image: '/images/blog/study-abroad.png',
    date: '2026-02-28',
    readTime: 7,
  },
  {
    slug: 'cau-chuyen-hoc-sinh-tim-duoc-huong-di',
    title: 'Câu chuyện: Từ "không biết học gì" đến sinh viên Y khoa',
    excerpt:
      'Hành trình hướng nghiệp của Minh Anh, từ một học sinh lớp 11 mông lung đến khi tìm được đam mê thật sự.',
    category: 'Câu chuyện thật',
    image: '/images/blog/student-story.png',
    date: '2026-02-20',
    readTime: 5,
  },
  {
    slug: 'hoc-lap-trinh-tu-dau',
    title: 'Lộ trình học lập trình từ zero cho học sinh cấp 3',
    excerpt:
      'Bạn muốn bắt đầu học lập trình nhưng chưa biết bắt đầu từ đâu? Đây là lộ trình chi tiết dành cho bạn.',
    category: 'Hướng nghiệp theo ngành',
    image: '/images/blog/learn-coding.png',
    date: '2026-02-15',
    readTime: 6,
  },
];

export const blogCategories = [
  'Tất cả',
  'Hướng nghiệp theo ngành',
  'Định hướng học tập',
  'Kỹ năng',
  'Câu chuyện thật',
];
