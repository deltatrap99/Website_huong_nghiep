import { ArchetypeResult } from '@/types/quiz';

export const archetypes: Record<string, ArchetypeResult> = {
  "R": {
    "code": "R",
    "name": "The Builder",
    "nameVi": "Người Xây Dựng",
    "color": "#0EA5E9",
    "gradient": "linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)",
    "icon": "Wrench",
    "description": "Bạn là người thực tế, thích làm việc với đôi tay và nhìn thấy kết quả rõ ràng. Bạn giỏi giải quyết vấn đề kỹ thuật và thích tạo ra những sản phẩm hữu ích.",
    "careers": [
      {
        "name": "Kỹ sư phần mềm",
        "description": "Xây dựng ứng dụng và hệ thống công nghệ",
        "detailedDescription": "Kỹ sư phần mềm thiết kế, phát triển và bảo trì các hệ thống phần mềm — từ ứng dụng di động, website đến hệ thống AI. Đây là ngành có nhu cầu nhân lực cực cao tại Việt Nam và toàn cầu, với mức lương hấp dẫn ngay từ khi mới ra trường.",
        "salary": "15-40 triệu/tháng (Junior), 40-80+ triệu (Senior)",
        "skills": [
          "Lập trình (Python, Java, JavaScript)",
          "Tư duy thuật toán",
          "Làm việc nhóm Agile/Scrum",
          "Tiếng Anh kỹ thuật"
        ],
        "icon": "Code"
      },
      {
        "name": "Kỹ sư cơ khí",
        "description": "Thiết kế và chế tạo máy móc",
        "detailedDescription": "Kỹ sư cơ khí làm việc với thiết kế, chế tạo và vận hành máy móc trong nhiều lĩnh vực: ô tô, hàng không, sản xuất, robot. Ngành này đặc biệt phù hợp với người thích tạo ra sản phẩm vật lý thật.",
        "salary": "12-25 triệu/tháng (Junior), 30-60+ triệu (Senior)",
        "skills": [
          "CAD/CAM (AutoCAD, SolidWorks)",
          "Vật liệu học",
          "Quy trình sản xuất",
          "Đọc bản vẽ kỹ thuật"
        ],
        "icon": "Cog"
      },
      {
        "name": "Kiến trúc sư",
        "description": "Thiết kế công trình và không gian sống",
        "detailedDescription": "Kiến trúc sư kết hợp nghệ thuật và kỹ thuật để thiết kế nhà ở, tòa nhà, khu đô thị. Bạn sẽ tạo ra những không gian sống đẹp, tiện nghi và bền vững cho cộng đồng.",
        "salary": "10-20 triệu/tháng (Junior), 25-50+ triệu (Senior)",
        "skills": [
          "Phần mềm 3D (SketchUp, Revit)",
          "Vẽ tay kiến trúc",
          "Quy hoạch đô thị",
          "Hiểu biết vật liệu xây dựng"
        ],
        "icon": "Building"
      },
      {
        "name": "Kỹ thuật viên điện tử",
        "description": "Sửa chữa và bảo trì thiết bị",
        "detailedDescription": "Kỹ thuật viên điện tử làm việc với các thiết bị điện tử, viễn thông và tự động hóa. Từ sửa chữa smartphone đến lắp đặt hệ thống IoT — ngành này luôn cần nhân lực có tay nghề cao.",
        "salary": "8-18 triệu/tháng (Junior), 20-40 triệu (Senior)",
        "skills": [
          "Đọc mạch điện",
          "Hàn mạch, lắp ráp",
          "Lập trình vi điều khiển",
          "An toàn điện"
        ],
        "icon": "Cpu"
      }
    ],
    "strengths": [
      {
        "title": "Tư duy thực tiễn",
        "description": "Bạn giỏi áp dụng kiến thức vào thực tế, không chỉ lý thuyết suông.",
        "howToLeverage": "Tham gia các dự án thực tế, hackathon, hoặc tự làm side project để phát huy thế mạnh này."
      },
      {
        "title": "Khéo tay, giỏi kỹ thuật",
        "description": "Bạn có năng khiếu tự nhiên trong việc thao tác, lắp ráp và sửa chữa.",
        "howToLeverage": "Tham gia CLB STEM/Robotics, tự chế tạo gadget hoặc mô hình để nâng cao kỹ năng."
      },
      {
        "title": "Kiên nhẫn và tỉ mỉ",
        "description": "Bạn không ngại đầu tư thời gian để hoàn thiện công việc.",
        "howToLeverage": "Áp dụng vào việc học qua phương pháp deliberate practice — luyện tập có chủ đích."
      },
      {
        "title": "Giải quyết vấn đề nhanh",
        "description": "Bạn nhanh chóng tìm ra nguyên nhân và đưa ra giải pháp hiệu quả.",
        "howToLeverage": "Thử sức với các bài toán logic, puzzle, hoặc debug code để rèn luyện thêm."
      }
    ],
    "improvements": [
      {
        "title": "Kỹ năng giao tiếp nhóm",
        "description": "Cần cải thiện khả năng trình bày ý tưởng và phối hợp với đồng đội.",
        "actions": [
          "Tham gia CLB hùng biện hoặc debate tại trường",
          "Tập thuyết trình 5 phút mỗi tuần về chủ đề yêu thích",
          "Chủ động chia sẻ ý kiến trong các buổi họp nhóm"
        ]
      },
      {
        "title": "Thuyết trình trước đám đông",
        "description": "Kỹ năng trình bày trước nhiều người sẽ giúp bạn thăng tiến nhanh hơn.",
        "actions": [
          "Bắt đầu với nhóm nhỏ 5-10 người rồi tăng dần",
          "Quay video bản thân thuyết trình để tự review",
          "Học kỹ thuật storytelling để nội dung hấp dẫn hơn"
        ]
      },
      {
        "title": "Tư duy sáng tạo mở rộng",
        "description": "Mở rộng góc nhìn ngoài phạm vi kỹ thuật để tạo ra giải pháp đột phá.",
        "actions": [
          "Đọc sách/blog về design thinking và innovation",
          "Tham gia workshop sáng tạo liên ngành",
          "Thử sketch ý tưởng trước khi code/xây dựng"
        ]
      }
    ],
    "learningPath": [
      {
        "order": 1,
        "title": "Nền tảng STEM",
        "description": "Củng cố Toán, Lý, Hóa cơ bản",
        "product": "HOCMAI",
        "icon": "BookOpen"
      },
      {
        "order": 2,
        "title": "Tiếng Anh kỹ thuật",
        "description": "Học tiếng Anh chuyên ngành",
        "product": "Easy IELTS",
        "icon": "Globe"
      },
      {
        "order": 3,
        "title": "Lập trình & Công nghệ",
        "description": "Bắt đầu với Python hoặc Arduino",
        "product": "ICANTECH",
        "icon": "Code"
      },
      {
        "order": 4,
        "title": "Thi đại học",
        "description": "Ôn luyện thi vào ngành Kỹ thuật",
        "product": "HOCMAI",
        "icon": "GraduationCap"
      }
    ]
  },
  "I": {
    "code": "I",
    "name": "The Analytical Mind",
    "nameVi": "Bộ Óc Phân Tích",
    "color": "#8B5CF6",
    "gradient": "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
    "icon": "Microscope",
    "description": "Bạn có tư duy logic sắc bén và đam mê khám phá. Bạn thích đào sâu vào vấn đề, nghiên cứu và tìm ra câu trả lời cho những câu hỏi khó.",
    "careers": [
      {
        "name": "Nhà nghiên cứu khoa học",
        "description": "Khám phá kiến thức mới cho nhân loại",
        "detailedDescription": "Nhà nghiên cứu khoa học làm việc tại các viện, trường đại học hoặc phòng R&D doanh nghiệp. Bạn sẽ tiến hành thí nghiệm, phân tích dữ liệu và công bố các phát hiện mới đóng góp cho khoa học.",
        "salary": "15-30 triệu/tháng (VN), $60-120K/năm (quốc tế)",
        "skills": [
          "Phương pháp nghiên cứu khoa học",
          "Thống kê & phân tích dữ liệu",
          "Viết báo khoa học tiếng Anh",
          "Tư duy phản biện"
        ],
        "icon": "FlaskConical"
      },
      {
        "name": "Bác sĩ",
        "description": "Chẩn đoán và điều trị bệnh",
        "detailedDescription": "Bác sĩ là nghề cao quý, đòi hỏi 6 năm đại học + 18 tháng thực hành. Bạn sẽ khám bệnh, chẩn đoán, điều trị và chăm sóc sức khỏe cho bệnh nhân. Thu nhập tăng dần rất tốt theo kinh nghiệm.",
        "salary": "10-20 triệu/tháng (mới ra trường), 30-100+ triệu (chuyên khoa)",
        "skills": [
          "Kiến thức y khoa chuyên sâu",
          "Kỹ năng giao tiếp với bệnh nhân",
          "Khả năng chịu áp lực cao",
          "Tiếng Anh y khoa"
        ],
        "icon": "Heart"
      },
      {
        "name": "Chuyên gia dữ liệu",
        "description": "Phân tích data để ra quyết định",
        "detailedDescription": "Data Scientist/Analyst thu thập, xử lý và phân tích dữ liệu lớn để giúp doanh nghiệp ra quyết định. Đây là nghề \"hot\" nhất thập kỷ với nhu cầu tuyển dụng rất cao.",
        "salary": "18-35 triệu/tháng (Junior), 40-80+ triệu (Senior)",
        "skills": [
          "Python, R, SQL",
          "Machine Learning cơ bản",
          "Trực quan hóa dữ liệu (Tableau, Power BI)",
          "Thống kê ứng dụng"
        ],
        "icon": "BarChart"
      },
      {
        "name": "Dược sĩ",
        "description": "Nghiên cứu và phát triển thuốc",
        "detailedDescription": "Dược sĩ làm việc trong bệnh viện, nhà thuốc hoặc công ty dược phẩm. Bạn nghiên cứu, sản xuất, kiểm tra chất lượng và tư vấn sử dụng thuốc an toàn cho người dân.",
        "salary": "10-18 triệu/tháng (nhà thuốc), 20-50 triệu (R&D)",
        "skills": [
          "Hóa dược",
          "Dược lý học",
          "Quy trình GMP",
          "Tư vấn sử dụng thuốc"
        ],
        "icon": "Pill"
      }
    ],
    "strengths": [
      {
        "title": "Tư duy logic xuất sắc",
        "description": "Bạn có khả năng suy luận chặt chẽ, nhìn ra mối liên hệ giữa các thông tin.",
        "howToLeverage": "Giải các bài toán olympiad, tham gia cuộc thi STEM để thử thách bản thân."
      },
      {
        "title": "Ham học hỏi, tò mò",
        "description": "Bạn luôn muốn tìm hiểu sâu hơn và đặt câu hỏi \"tại sao\".",
        "howToLeverage": "Đọc sách khoa học phổ thông, theo dõi kênh TED-Ed, Kurzgesagt để nuôi dưỡng sự tò mò."
      },
      {
        "title": "Phân tích thông tin tốt",
        "description": "Bạn giỏi tổng hợp dữ liệu từ nhiều nguồn để rút ra kết luận.",
        "howToLeverage": "Tập viết bài tổng hợp, review sách hoặc phân tích case study để rèn kỹ năng."
      },
      {
        "title": "Độc lập trong suy nghĩ",
        "description": "Bạn không dễ bị ảnh hưởng bởi đám đông, có chính kiến riêng.",
        "howToLeverage": "Viết blog chia sẻ quan điểm cá nhân, tham gia debate để rèn luyện tư duy phản biện."
      }
    ],
    "improvements": [
      {
        "title": "Kỹ năng làm việc nhóm",
        "description": "Cần học cách phối hợp và tin tưởng đồng đội hơn.",
        "actions": [
          "Chủ động nhận vai trò phối hợp trong project nhóm",
          "Học kỹ thuật active listening — lắng nghe trước khi phản biện",
          "Tham gia các hoạt động team-building ngoài trời"
        ]
      },
      {
        "title": "Đơn giản hóa vấn đề phức tạp",
        "description": "Khi giải thích, cần dùng ngôn ngữ dễ hiểu hơn cho người không chuyên.",
        "actions": [
          "Tập giải thích khái niệm khó cho bạn bè/em nhỏ",
          "Viết blog chia sẻ kiến thức bằng ngôn ngữ đơn giản",
          "Dùng hình ảnh, ví dụ thực tế khi trình bày"
        ]
      },
      {
        "title": "Ra quyết định nhanh hơn",
        "description": "Đừng để phân tích quá nhiều mà bỏ lỡ cơ hội hành động.",
        "actions": [
          "Đặt deadline cho mỗi quyết định (VD: 5 phút cho quyết định nhỏ)",
          "Áp dụng quy tắc 80/20: 80% thông tin là đủ để quyết định",
          "Chấp nhận rằng không cần hoàn hảo mới bắt đầu"
        ]
      }
    ],
    "learningPath": [
      {
        "order": 1,
        "title": "Nền tảng khoa học",
        "description": "Toán cao cấp, Lý, Sinh nâng cao",
        "product": "HOCMAI",
        "icon": "BookOpen"
      },
      {
        "order": 2,
        "title": "Tiếng Anh học thuật",
        "description": "IELTS Academic 6.5+",
        "product": "Easy IELTS",
        "icon": "Globe"
      },
      {
        "order": 3,
        "title": "Phương pháp nghiên cứu",
        "description": "Tư duy phản biện và nghiên cứu",
        "product": "FUNiX",
        "icon": "Search"
      },
      {
        "order": 4,
        "title": "Thi đại học/Du học",
        "description": "Ôn luyện thi vào top ngành STEM",
        "product": "HOCMAI",
        "icon": "GraduationCap"
      }
    ]
  },
  "A": {
    "code": "A",
    "name": "The Creative Thinker",
    "nameVi": "Nhà Sáng Tạo",
    "color": "#EC4899",
    "gradient": "linear-gradient(135deg, #EC4899 0%, #DB2777 100%)",
    "icon": "Palette",
    "description": "Bạn sở hữu trí tưởng tượng phong phú và khả năng sáng tạo vượt trội. Bạn thích thể hiện bản thân qua nghệ thuật, thiết kế và tạo ra những thứ đẹp đẽ.",
    "careers": [
      {
        "name": "Nhà thiết kế UI/UX",
        "description": "Thiết kế trải nghiệm số",
        "detailedDescription": "UI/UX Designer tạo ra giao diện đẹp và trải nghiệm mượt mà cho app, website. Bạn kết hợp nghệ thuật với tâm lý người dùng để thiết kế sản phẩm số mà hàng triệu người sử dụng mỗi ngày.",
        "salary": "12-25 triệu/tháng (Junior), 30-60+ triệu (Senior)",
        "skills": [
          "Figma, Adobe XD",
          "Design Thinking",
          "User Research",
          "Prototyping"
        ],
        "icon": "Figma"
      },
      {
        "name": "Content Creator",
        "description": "Sáng tạo nội dung đa nền tảng",
        "detailedDescription": "Content Creator tạo video, bài viết, podcast cho YouTube, TikTok, Instagram. Với sự bùng nổ của mạng xã hội, đây là ngành có thu nhập không giới hạn nếu bạn xây dựng được thương hiệu cá nhân.",
        "salary": "5-20 triệu/tháng (mới), 50-200+ triệu (influencer)",
        "skills": [
          "Quay/dựng video",
          "Storytelling",
          "Social Media Marketing",
          "Xây dựng thương hiệu cá nhân"
        ],
        "icon": "Video"
      },
      {
        "name": "Nhiếp ảnh gia",
        "description": "Kể chuyện qua hình ảnh",
        "detailedDescription": "Nhiếp ảnh gia sử dụng ánh sáng, góc máy và cảm xúc để kể câu chuyện qua hình ảnh. Từ chụp sự kiện, thời trang đến phóng sự — mỗi bức ảnh là một tác phẩm nghệ thuật.",
        "salary": "8-20 triệu/tháng (studio), 20-50+ triệu (freelance chuyên nghiệp)",
        "skills": [
          "Kỹ thuật chụp ảnh",
          "Lightroom, Photoshop",
          "Bố cục và ánh sáng",
          "Kỹ năng giao tiếp với khách"
        ],
        "icon": "Camera"
      },
      {
        "name": "Game Designer",
        "description": "Thiết kế game và thế giới ảo",
        "detailedDescription": "Game Designer tạo ra cơ chế gameplay, cốt truyện, level design cho game. Ngành công nghiệp game toàn cầu đang tăng trưởng vượt cả phim ảnh và âm nhạc cộng lại.",
        "salary": "15-30 triệu/tháng (Junior), 35-70+ triệu (Senior)",
        "skills": [
          "Unity, Unreal Engine",
          "Game Mechanics Design",
          "Narrative Design",
          "Lập trình cơ bản (C#, C++)"
        ],
        "icon": "Gamepad2"
      }
    ],
    "strengths": [
      {
        "title": "Sáng tạo không giới hạn",
        "description": "Bạn luôn có ý tưởng mới lạ và cách tiếp cận độc đáo.",
        "howToLeverage": "Ghi lại mọi ý tưởng vào sổ/app Notes, dành 30 phút/ngày để brainstorm tự do."
      },
      {
        "title": "Thẩm mỹ tốt",
        "description": "Bạn có con mắt nhìn cái đẹp và cảm nhận nghệ thuật tinh tế.",
        "howToLeverage": "Xây dựng moodboard trên Pinterest, phân tích thiết kế của các brand lớn mỗi tuần."
      },
      {
        "title": "Tư duy đột phá",
        "description": "Bạn không sợ phá vỡ khuôn mẫu và thử nghiệm cách làm mới.",
        "howToLeverage": "Tham gia cuộc thi sáng tạo, hackathon design để biến ý tưởng thành hiện thực."
      },
      {
        "title": "Nhạy cảm và tinh tế",
        "description": "Bạn cảm nhận được cảm xúc người khác và thể hiện qua tác phẩm.",
        "howToLeverage": "Viết nhật ký sáng tạo, dùng cảm xúc làm nguyên liệu cho tác phẩm nghệ thuật."
      }
    ],
    "improvements": [
      {
        "title": "Quản lý thời gian",
        "description": "Cần cân bằng giữa sáng tạo tự do và hoàn thành đúng deadline.",
        "actions": [
          "Sử dụng Pomodoro (25 phút tập trung + 5 phút nghỉ)",
          "Chia project lớn thành milestone nhỏ với deadline cụ thể",
          "Dùng app Notion hoặc Trello để track tiến độ"
        ]
      },
      {
        "title": "Kỷ luật trong công việc",
        "description": "Sáng tạo cần kỷ luật — những nghệ sĩ giỏi nhất đều có routine.",
        "actions": [
          "Tạo routine sáng tạo hàng ngày (VD: vẽ/viết 1 giờ mỗi sáng)",
          "Hoàn thành project trước khi bắt đầu project mới",
          "Đặt mục tiêu output cụ thể (VD: 1 tác phẩm/tuần)"
        ]
      },
      {
        "title": "Kỹ năng kinh doanh sáng tạo",
        "description": "Học cách biến tài năng thành thu nhập bền vững.",
        "actions": [
          "Tìm hiểu về personal branding trên mạng xã hội",
          "Học cơ bản về pricing, hợp đồng và quản lý tài chính",
          "Xây dựng portfolio online trên Behance/Dribbble"
        ]
      }
    ],
    "learningPath": [
      {
        "order": 1,
        "title": "Nền tảng thiết kế",
        "description": "Học các nguyên tắc thiết kế cơ bản",
        "product": "ICANTECH",
        "icon": "Palette"
      },
      {
        "order": 2,
        "title": "Công nghệ sáng tạo",
        "description": "Photoshop, Figma, Video Editing",
        "product": "ICANTECH",
        "icon": "Monitor"
      },
      {
        "order": 3,
        "title": "Tiếng Anh sáng tạo",
        "description": "Tiếng Anh cho Digital Creative",
        "product": "SpeakWell",
        "icon": "Globe"
      },
      {
        "order": 4,
        "title": "Portfolio & Career",
        "description": "Xây dựng portfolio chuyên nghiệp",
        "product": "FUNiX",
        "icon": "Briefcase"
      }
    ]
  },
  "S": {
    "code": "S",
    "name": "The Inspiring Communicator",
    "nameVi": "Người Truyền Cảm Hứng",
    "color": "#22C55E",
    "gradient": "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
    "icon": "Users",
    "description": "Bạn là người ấm áp, giỏi giao tiếp và có khả năng kết nối con người tuyệt vời. Bạn thích giúp đỡ người khác và tạo ra ảnh hưởng tích cực trong cộng đồng.",
    "careers": [
      {
        "name": "Giáo viên / Giảng viên",
        "description": "Truyền đạt kiến thức và truyền cảm hứng",
        "detailedDescription": "Giáo viên không chỉ dạy kiến thức mà còn truyền cảm hứng, định hướng tương lai cho thế hệ trẻ. Với giáo dục online phát triển, giáo viên giỏi có thể tiếp cận hàng nghìn học sinh.",
        "salary": "8-15 triệu/tháng (trường công), 15-40+ triệu (trường quốc tế/online)",
        "skills": [
          "Phương pháp giảng dạy hiện đại",
          "Tâm lý giáo dục",
          "Thiết kế bài giảng",
          "Kỹ năng thuyết trình"
        ],
        "icon": "GraduationCap"
      },
      {
        "name": "Chuyên viên tâm lý",
        "description": "Hỗ trợ sức khỏe tinh thần",
        "detailedDescription": "Chuyên viên tâm lý hỗ trợ mọi người vượt qua khó khăn tâm lý, stress, trầm cảm. Ngành sức khỏe tinh thần đang ngày càng được coi trọng tại Việt Nam.",
        "salary": "10-20 triệu/tháng (tổ chức), 20-50+ triệu (phòng khám riêng)",
        "skills": [
          "Tâm lý học lâm sàng",
          "Kỹ năng lắng nghe chủ động",
          "Phương pháp trị liệu (CBT, ACT)",
          "Đạo đức nghề nghiệp"
        ],
        "icon": "Heart"
      },
      {
        "name": "Nhân sự (HR)",
        "description": "Phát triển con người trong tổ chức",
        "detailedDescription": "HR Manager tuyển dụng, đào tạo và phát triển nhân viên. Bạn là cầu nối giữa công ty và người lao động, giúp mọi người phát huy tối đa năng lực.",
        "salary": "10-18 triệu/tháng (Junior), 25-50+ triệu (HR Manager)",
        "skills": [
          "Tuyển dụng & đánh giá năng lực",
          "Luật lao động",
          "Xây dựng văn hóa doanh nghiệp",
          "Kỹ năng coaching"
        ],
        "icon": "Users"
      },
      {
        "name": "Nhân viên xã hội",
        "description": "Giúp đỡ cộng đồng yếu thế",
        "detailedDescription": "Nhân viên xã hội làm việc với trẻ em, người cao tuổi, người khuyết tật và các nhóm yếu thế. Bạn kết nối họ với các nguồn lực hỗ trợ và bảo vệ quyền lợi của họ.",
        "salary": "8-15 triệu/tháng (NGO), 12-25 triệu (tổ chức quốc tế)",
        "skills": [
          "Công tác xã hội",
          "Quản lý case",
          "Tư vấn hỗ trợ",
          "Hiểu biết chính sách xã hội"
        ],
        "icon": "HandHeart"
      }
    ],
    "strengths": [
      {
        "title": "Đồng cảm cao",
        "description": "Bạn cảm nhận được cảm xúc người khác và biết cách chia sẻ.",
        "howToLeverage": "Dùng khả năng đồng cảm để xây dựng mối quan hệ sâu sắc, làm mentor cho bạn bè."
      },
      {
        "title": "Giao tiếp xuất sắc",
        "description": "Bạn diễn đạt rõ ràng, thuyết phục và tạo ấn tượng tốt.",
        "howToLeverage": "Tham gia MC sự kiện, dẫn dắt thảo luận nhóm hoặc bắt đầu kênh podcast."
      },
      {
        "title": "Kiên nhẫn và chân thành",
        "description": "Bạn sẵn sàng dành thời gian lắng nghe và hỗ trợ người khác.",
        "howToLeverage": "Làm tình nguyện viên tư vấn, tham gia các tổ chức từ thiện hoặc NGO."
      },
      {
        "title": "Khả năng lãnh đạo tinh thần",
        "description": "Bạn truyền cảm hứng và tạo động lực cho người xung quanh.",
        "howToLeverage": "Nhận vai trò class leader, trưởng nhóm hoạt động ngoại khóa để rèn luyện."
      }
    ],
    "improvements": [
      {
        "title": "Đặt ranh giới cá nhân",
        "description": "Cần học cách nói \"không\" để bảo vệ năng lượng bản thân.",
        "actions": [
          "Thực hành nói \"Mình cần suy nghĩ thêm\" trước khi đồng ý ngay",
          "Dành 30 phút/ngày cho riêng mình, không giúp ai",
          "Viết ra 3 ưu tiên mỗi ngày và chỉ tập trung vào đó"
        ]
      },
      {
        "title": "Tư duy chiến lược",
        "description": "Ngoài giúp người khác, cần nhìn bức tranh lớn và lập kế hoạch dài hạn.",
        "actions": [
          "Đọc sách về strategy và tư duy hệ thống",
          "Tập phân tích SWOT cho các quyết định quan trọng",
          "Lập mục tiêu 1 năm, 3 năm, 5 năm cho bản thân"
        ]
      },
      {
        "title": "Kỹ năng phân tích số liệu",
        "description": "Data giúp bạn đưa ra quyết định tốt hơn thay vì chỉ dựa vào cảm tính.",
        "actions": [
          "Học Excel/Google Sheets cơ bản",
          "Tập đọc báo cáo, biểu đồ và rút ra insight",
          "Thử khóa học Data Literacy trên Coursera/Khan Academy"
        ]
      }
    ],
    "learningPath": [
      {
        "order": 1,
        "title": "Kỹ năng mềm",
        "description": "Giao tiếp, thuyết trình, lãnh đạo",
        "product": "ICAN",
        "icon": "MessageCircle"
      },
      {
        "order": 2,
        "title": "Tiếng Anh giao tiếp",
        "description": "Speaking & Communication",
        "product": "SpeakWell",
        "icon": "Globe"
      },
      {
        "order": 3,
        "title": "Kiến thức chuyên ngành",
        "description": "Tâm lý học, Giáo dục học cơ bản",
        "product": "HOCMAI",
        "icon": "BookOpen"
      },
      {
        "order": 4,
        "title": "Thi đại học",
        "description": "Ôn luyện thi khối C, D",
        "product": "HOCMAI",
        "icon": "GraduationCap"
      }
    ]
  },
  "E": {
    "code": "E",
    "name": "The People Leader",
    "nameVi": "Nhà Lãnh Đạo",
    "color": "#F97316",
    "gradient": "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
    "icon": "TrendingUp",
    "description": "Bạn có năng lượng dồi dào, khả năng thuyết phục và bản lĩnh lãnh đạo. Bạn thích vận động, tổ chức và dẫn dắt người khác hướng tới mục tiêu chung.",
    "careers": [
      {
        "name": "Quản lý kinh doanh",
        "description": "Dẫn dắt đội ngũ, phát triển thị trường",
        "detailedDescription": "Business Manager quản lý đội sales, phát triển thị trường mới và đạt mục tiêu doanh thu. Bạn sẽ xây dựng chiến lược, huấn luyện nhân viên và đàm phán với đối tác.",
        "salary": "15-30 triệu/tháng (Junior), 40-100+ triệu (Director)",
        "skills": [
          "Quản lý đội ngũ",
          "Phân tích thị trường",
          "Đàm phán & bán hàng",
          "Lập & thực thi chiến lược"
        ],
        "icon": "TrendingUp"
      },
      {
        "name": "Marketing Manager",
        "description": "Chiến lược thương hiệu và truyền thông",
        "detailedDescription": "Marketing Manager xây dựng chiến lược thương hiệu, quảng cáo và truyền thông. Bạn sẽ làm việc với data, sáng tạo campaign và đo lường hiệu quả marketing.",
        "salary": "12-25 triệu/tháng (Junior), 30-70+ triệu (CMO)",
        "skills": [
          "Digital Marketing",
          "Phân tích data marketing",
          "Xây dựng thương hiệu",
          "Content Strategy"
        ],
        "icon": "Megaphone"
      },
      {
        "name": "Luật sư",
        "description": "Bảo vệ quyền lợi và đàm phán",
        "detailedDescription": "Luật sư tư vấn pháp luật, đại diện khách hàng trong tranh tụng và đàm phán hợp đồng. Ngành luật đòi hỏi khả năng phân tích, lập luận và truyền đạt mạnh mẽ.",
        "salary": "10-20 triệu/tháng (mới), 30-80+ triệu (partner)",
        "skills": [
          "Kiến thức pháp luật sâu rộng",
          "Kỹ năng tranh tụng",
          "Đàm phán hợp đồng",
          "Tư duy phản biện sắc bén"
        ],
        "icon": "Scale"
      },
      {
        "name": "Nhà khởi nghiệp",
        "description": "Xây dựng doanh nghiệp từ ý tưởng",
        "detailedDescription": "Entrepreneur biến ý tưởng thành doanh nghiệp thực. Bạn sẽ tìm vấn đề cần giải quyết, xây dựng sản phẩm, gọi vốn và phát triển đội ngũ từ con số 0.",
        "salary": "Không cố định — từ 0 đến hàng tỷ đồng/năm",
        "skills": [
          "Lean Startup methodology",
          "Gọi vốn & pitching",
          "Xây dựng MVP",
          "Leadership & vision"
        ],
        "icon": "Rocket"
      }
    ],
    "strengths": [
      {
        "title": "Lãnh đạo tự nhiên",
        "description": "Bạn tự nhiên thu hút và dẫn dắt người khác theo mình.",
        "howToLeverage": "Nhận vai trò trưởng nhóm, lớp trưởng hoặc khởi xướng dự án mới."
      },
      {
        "title": "Thuyết phục giỏi",
        "description": "Bạn biết cách trình bày ý tưởng để người khác đồng ý và hành động.",
        "howToLeverage": "Tham gia cuộc thi hùng biện, pitch ý tưởng hoặc bán hàng online."
      },
      {
        "title": "Quyết đoán",
        "description": "Bạn dám ra quyết định nhanh và chịu trách nhiệm với lựa chọn.",
        "howToLeverage": "Áp dụng vào việc học: quyết định ngành sớm, lập kế hoạch và thực thi ngay."
      },
      {
        "title": "Năng lượng tích cực",
        "description": "Bạn tạo ra bầu không khí sôi nổi và truyền động lực cho team.",
        "howToLeverage": "Làm MC sự kiện, tổ chức hoạt động ngoại khóa để lan tỏa năng lượng."
      }
    ],
    "improvements": [
      {
        "title": "Lắng nghe sâu",
        "description": "Cần kiên nhẫn lắng nghe ý kiến người khác trước khi đưa ra quyết định.",
        "actions": [
          "Thực hành nghe 2 phút trước khi phản hồi trong cuộc hội thoại",
          "Ghi chú ý kiến mọi người trong cuộc họp trước khi kết luận",
          "Hỏi \"Bạn nghĩ sao?\" ít nhất 3 lần trong mỗi buổi thảo luận"
        ]
      },
      {
        "title": "Kiên nhẫn với chi tiết",
        "description": "Đừng bỏ qua chi tiết nhỏ — chúng quyết định thành bại.",
        "actions": [
          "Tập review lại công việc 2 lần trước khi nộp",
          "Dùng checklist cho mọi task quan trọng",
          "Học cách ủy quyền những việc chi tiết cho người phù hợp"
        ]
      },
      {
        "title": "Quản lý rủi ro",
        "description": "Cần đánh giá rủi ro trước khi hành động thay vì chỉ lạc quan.",
        "actions": [
          "Luôn hỏi \"worst case là gì?\" trước mỗi quyết định lớn",
          "Lập plan B cho những dự án quan trọng",
          "Học cơ bản về quản trị rủi ro và tài chính cá nhân"
        ]
      }
    ],
    "learningPath": [
      {
        "order": 1,
        "title": "Kinh doanh cơ bản",
        "description": "Kinh tế vi/vĩ mô, Marketing",
        "product": "HOCMAI",
        "icon": "TrendingUp"
      },
      {
        "order": 2,
        "title": "Tiếng Anh thương mại",
        "description": "Business English & IELTS",
        "product": "Easy IELTS",
        "icon": "Globe"
      },
      {
        "order": 3,
        "title": "Kỹ năng lãnh đạo",
        "description": "Leadership, Teamwork, Negotiation",
        "product": "ICAN",
        "icon": "Award"
      },
      {
        "order": 4,
        "title": "Thi đại học",
        "description": "Ôn luyện thi khối A, D",
        "product": "HOCMAI",
        "icon": "GraduationCap"
      }
    ]
  },
  "C": {
    "code": "C",
    "name": "The Organizer",
    "nameVi": "Nhà Tổ Chức",
    "color": "#6366F1",
    "gradient": "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
    "icon": "ClipboardList",
    "description": "Bạn là người có tính tổ chức cao, yêu thích sự chính xác và hệ thống. Bạn giỏi quản lý thông tin, lập kế hoạch và đảm bảo mọi thứ vận hành trơn tru.",
    "careers": [
      {
        "name": "Kế toán / Kiểm toán",
        "description": "Quản lý tài chính doanh nghiệp",
        "detailedDescription": "Kế toán viên ghi chép, phân tích và báo cáo tài chính cho doanh nghiệp. Kiểm toán viên kiểm tra tính chính xác của báo cáo tài chính. Ngành này ổn định và có nhu cầu cao.",
        "salary": "8-15 triệu/tháng (Junior), 20-50+ triệu (Manager/CFO)",
        "skills": [
          "Kế toán tài chính & quản trị",
          "Phần mềm kế toán (SAP, MISA)",
          "Luật thuế Việt Nam",
          "Excel nâng cao"
        ],
        "icon": "Calculator"
      },
      {
        "name": "Quản lý dự án",
        "description": "Điều phối và theo dõi dự án",
        "detailedDescription": "Project Manager lập kế hoạch, phân bổ nguồn lực, theo dõi tiến độ và đảm bảo dự án hoàn thành đúng hạn. Đây là vai trò quan trọng trong mọi ngành công nghiệp.",
        "salary": "15-30 triệu/tháng (Junior PM), 35-70+ triệu (Senior PM)",
        "skills": [
          "Agile/Scrum/Waterfall",
          "Quản lý stakeholder",
          "Risk management",
          "MS Project, Jira"
        ],
        "icon": "KanbanSquare"
      },
      {
        "name": "Chuyên viên logistics",
        "description": "Tối ưu hóa chuỗi cung ứng",
        "detailedDescription": "Logistics Specialist quản lý vận chuyển, kho bãi và chuỗi cung ứng. Bạn đảm bảo hàng hóa đến đúng nơi, đúng lúc với chi phí tối ưu.",
        "salary": "10-18 triệu/tháng (Junior), 25-45+ triệu (Supply Chain Manager)",
        "skills": [
          "Quản lý chuỗi cung ứng",
          "ERP systems",
          "Phân tích dữ liệu logistics",
          "Đàm phán với nhà cung cấp"
        ],
        "icon": "Truck"
      },
      {
        "name": "Chuyên viên IT hệ thống",
        "description": "Quản trị hạ tầng công nghệ",
        "detailedDescription": "System Admin quản lý server, mạng, bảo mật và cơ sở hạ tầng IT cho doanh nghiệp. Đảm bảo hệ thống hoạt động 24/7 và dữ liệu được bảo vệ an toàn.",
        "salary": "12-22 triệu/tháng (Junior), 25-50+ triệu (IT Manager)",
        "skills": [
          "Linux/Windows Server",
          "Cloud (AWS, Azure)",
          "Cybersecurity cơ bản",
          "Networking"
        ],
        "icon": "Server"
      }
    ],
    "strengths": [
      {
        "title": "Tổ chức tuyệt vời",
        "description": "Bạn sắp xếp mọi thứ ngăn nắp, logic và dễ tìm.",
        "howToLeverage": "Dùng Notion/Google Calendar để tổ chức cuộc sống, chia sẻ template cho bạn bè."
      },
      {
        "title": "Chính xác và cẩn thận",
        "description": "Bạn ít mắc lỗi nhỏ và luôn double-check trước khi hoàn thành.",
        "howToLeverage": "Áp dụng vào học tập: review bài kỹ, không bỏ sót chi tiết trong bài thi."
      },
      {
        "title": "Đáng tin cậy",
        "description": "Mọi người tin tưởng giao việc cho bạn vì bạn luôn hoàn thành đúng hạn.",
        "howToLeverage": "Nhận vai trò thủ quỹ, quản lý tài liệu hoặc điều phối trong các hoạt động."
      },
      {
        "title": "Quản lý thời gian tốt",
        "description": "Bạn biết cách ưu tiên và phân bổ thời gian hiệu quả.",
        "howToLeverage": "Chia sẻ phương pháp quản lý thời gian cho bạn bè, xây dựng study plan cho cả nhóm."
      }
    ],
    "improvements": [
      {
        "title": "Linh hoạt hơn",
        "description": "Cần học cách thích nghi khi kế hoạch bị thay đổi đột ngột.",
        "actions": [
          "Tập \"yes, and...\" — chấp nhận thay đổi và tìm cách thích nghi",
          "Mỗi tuần thử 1 điều mới ngoài routine (quán cafe mới, đường đi mới)",
          "Tham gia các hoạt động improvisation hoặc brainstorm tự do"
        ]
      },
      {
        "title": "Chấp nhận thay đổi",
        "description": "Không phải lúc nào cũng cần hoàn hảo — done is better than perfect.",
        "actions": [
          "Áp dụng quy tắc 80/20: 80% hoàn chỉnh là đủ để bắt đầu",
          "Practice shipping: hoàn thành và nộp trước deadline 1 ngày",
          "Học từ failure: ghi nhận 3 bài học từ mỗi lần thất bại"
        ]
      },
      {
        "title": "Kỹ năng sáng tạo",
        "description": "Mở rộng tư duy sáng tạo để không bị giới hạn trong khuôn khổ.",
        "actions": [
          "Thử vẽ mind-map tự do 10 phút/ngày",
          "Đọc sách/blog về innovation, design thinking",
          "Tham gia workshop sáng tạo hoặc học một kỹ năng nghệ thuật"
        ]
      }
    ],
    "learningPath": [
      {
        "order": 1,
        "title": "Nền tảng kinh tế",
        "description": "Toán ứng dụng, Kinh tế cơ bản",
        "product": "HOCMAI",
        "icon": "Calculator"
      },
      {
        "order": 2,
        "title": "Tiếng Anh chuyên ngành",
        "description": "Business English cơ bản",
        "product": "Easy IELTS",
        "icon": "Globe"
      },
      {
        "order": 3,
        "title": "Công nghệ văn phòng",
        "description": "Excel nâng cao, ERP, SAP",
        "product": "FUNiX",
        "icon": "Monitor"
      },
      {
        "order": 4,
        "title": "Thi đại học",
        "description": "Ôn luyện thi khối A, D",
        "product": "HOCMAI",
        "icon": "GraduationCap"
      }
    ]
  }
};
