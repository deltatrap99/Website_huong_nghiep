import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-ge-navy text-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src="https://education.galaxy.com.vn/images/img-glx-edu-small.png"
              alt="Galaxy Education"
              className="h-10 mb-4 brightness-200"
            />
            <p className="text-white/70 text-sm leading-relaxed">
              Quality Education for Everyone. Rút ngắn khoảng cách tiếp cận giáo dục chất lượng cho người Việt mọi độ tuổi.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-ge-yellow">
              Hướng nghiệp
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/quiz" className="text-white/70 text-sm hover:text-white transition-colors">
                  Làm trắc nghiệm
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/70 text-sm hover:text-white transition-colors">
                  Blog hướng nghiệp
                </Link>
              </li>
              <li>
                <Link href="/ambassador" className="text-white/70 text-sm hover:text-white transition-colors">
                  Kết nối Đại sứ
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-ge-yellow">
              Sản phẩm
            </h4>
            <ul className="space-y-2.5">
              {['HOCMAI', 'ICAN', 'ICANTECH', 'FUNiX', 'SpeakWell', 'Easy IELTS'].map((product) => (
                <li key={product}>
                  <span className="text-white/70 text-sm hover:text-white transition-colors cursor-pointer">
                    {product}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-ge-yellow">
              Liên hệ
            </h4>
            <ul className="space-y-2.5 text-white/70 text-sm">
              <li>Galaxy Education</li>
              <li>Thuộc Galaxy Entertainment & Education</li>
              <li>
                <a href="https://education.galaxy.com.vn" className="hover:text-white transition-colors">
                  education.galaxy.com.vn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Galaxy Education. Tất cả quyền được bảo lưu.
          </p>
          <p className="text-white/50 text-sm flex items-center gap-1">
            Made with <Heart size={14} className="text-ge-coral fill-ge-coral" /> by Galaxy EE
          </p>
        </div>
      </div>
    </footer>
  );
}
