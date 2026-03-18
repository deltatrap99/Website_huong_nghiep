/**
 * Quick Quiz: 30 câu hỏi chọn lọc từ bộ 88 câu đầy đủ.
 * Đảm bảo coverage:
 *   - MBTI: 10 câu (4 EI, 3 TF, 3 JP)
 *   - RIASEC: 12 câu (đủ 6 dimensions R/I/A/S/E/C)
 *   - Competency/Context: 8 câu (english, self_study, soft_skill, goal, career)
 */
export const QUICK_QUESTION_IDS: number[] = [
  // MBTI-Lite (10 câu)
  1,   // EI - Cuối tuần thích dành thời gian thế nào?
  2,   // TF - Khi quyết định việc quan trọng
  3,   // JP - Thích kiểu làm việc nào?
  5,   // TF - Bạn thân kể chuyện buồn
  7,   // EI - Học tập hiệu quả nhất khi
  9,   // JP - Phòng ngăn nắp hay bừa bộn
  10,  // EI - Khi gặp stress
  14,  // TF - Khi tranh luận
  18,  // JP - Quản lý thời gian
  25,  // EI - Thể hiện tình cảm

  // RIASEC Career (12 câu)
  31,  // R/I/A/S - Hoạt động hào hứng nhất
  32,  // R/I/A/S/E - CLB muốn tham gia
  34,  // R/I/S/E/C - Công việc lý tưởng
  36,  // R/I/A/E - YouTube hay xem
  38,  // R/I/A/S/E - Game thích chơi
  40,  // R/I/A/S - Tình huống thỏa mãn
  41,  // R/I/A/S/E - Mơ ước trở thành
  44,  // R/I/A/E - Kỹ năng muốn học
  46,  // R/I/A/E - Phim tài liệu hấp dẫn
  50,  // R/I/A/E - Trong nhóm bạn gọi là
  54,  // R/I/A/S/E - Dự án tốt nghiệp mơ ước
  59,  // R/I/A/S/E - Môi trường làm việc

  // Năng lực & Bối cảnh (8 câu)
  60,  // English - Trình độ tiếng Anh
  61,  // Self study - Khả năng tự học
  62,  // Soft skill - Kỹ năng mềm tự tin nhất
  65,  // Soft skill - Thuyết trình trước lớp
  69,  // English - Mục tiêu tiếng Anh
  75,  // Context/goal - Mục tiêu học tập
  80,  // Self study - Thói quen đọc sách
  85,  // Context/career - Ý tưởng ngành theo đuổi
];
