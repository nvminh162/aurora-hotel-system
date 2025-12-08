/**
 * Font Loader for jsPDF - Vietnamese Unicode Support
 * File này import các font đã convert để tự động đăng ký vào jsPDF
 * 
 * Đặt file này trong: src/features/font/font-loader.ts
 */

import { jsPDF } from 'jspdf';

// Import các font files - chúng sẽ TỰ ĐỘNG đăng ký font vào jsPDF
// thông qua jsPDF.API.events.push(['addFonts', ...])
import './Roboto-Bold-normal.js';
import './Roboto-Regular-normal.js';
import './Roboto-Italic-normal.js';
import './Roboto-BoldItalic-normal.js';

/**
 * Định nghĩa các font đã được đăng ký
 * Tên font phải khớp CHÍNH XÁC với tên trong file .js
 */
export const FONTS = {
  // Font Regular - Dùng cho text thường
  REGULAR: {
    name: 'Roboto-Regular',
    style: 'normal',
  },
  // Font Bold - Dùng cho tiêu đề, nhấn mạnh
  BOLD: {
    name: 'Roboto-Bold',
    style: 'normal',
  },
  // Font Italic - Dùng cho ghi chú, chú thích
  ITALIC: {
    name: 'Roboto-Italic',
    style: 'normal',
  },
  // Font Bold Italic - Dùng cho tiêu đề đặc biệt
  BOLD_ITALIC: {
    name: 'Roboto-BoldItalic',
    style: 'normal',
  },
} as const;

/**
 * Tạo jsPDF instance với font tiếng Việt đã được đăng ký tự động
 * 
 * @param options - Tùy chọn cấu hình PDF
 * @returns jsPDF instance với font tiếng Việt
 * 
 * @example
 * const doc = createVietnamesePDF({ orientation: 'landscape' });
 * setBoldFont(doc);
 * doc.text('Báo cáo Doanh thu', 20, 20);
 */
export const createVietnamesePDF = (options?: {
  orientation?: 'portrait' | 'landscape';
  unit?: 'pt' | 'mm' | 'cm' | 'in';
  format?: 'a3' | 'a4' | 'a5' | 'letter' | 'legal';
}): jsPDF => {
  // Tạo PDF instance
  const doc = new jsPDF({
    orientation: options?.orientation || 'portrait',
    unit: options?.unit || 'mm',
    format: options?.format || 'a4',
  });

  // Set font mặc định là Regular (font thường)
  doc.setFont(FONTS.REGULAR.name, FONTS.REGULAR.style);

  return doc;
};

/**
 * Set font Regular - Dùng cho text thường, nội dung chính
 * 
 * @param doc - jsPDF instance
 * 
 * @example
 * setRegularFont(doc);
 * doc.text('Nội dung báo cáo...', 20, 30);
 */
export const setRegularFont = (doc: jsPDF): void => {
  doc.setFont(FONTS.REGULAR.name, FONTS.REGULAR.style);
};

/**
 * Set font Bold - Dùng cho tiêu đề, header, nhấn mạnh
 * 
 * @param doc - jsPDF instance
 * 
 * @example
 * setBoldFont(doc);
 * doc.text('Báo cáo Tổng quan', 20, 20);
 */
export const setBoldFont = (doc: jsPDF): void => {
  doc.setFont(FONTS.BOLD.name, FONTS.BOLD.style);
};

/**
 * Set font Italic - Dùng cho ghi chú, chú thích, metadata
 * 
 * @param doc - jsPDF instance
 * 
 * @example
 * setItalicFont(doc);
 * doc.text('Thời gian: 01/12/2024 - 31/12/2024', 20, 50);
 */
export const setItalicFont = (doc: jsPDF): void => {
  doc.setFont(FONTS.ITALIC.name, FONTS.ITALIC.style);
};

/**
 * Set font Bold Italic - Dùng cho tiêu đề đặc biệt, cảnh báo quan trọng
 * 
 * @param doc - jsPDF instance
 * 
 * @example
 * setBoldItalicFont(doc);
 * doc.text('Lưu ý quan trọng', 20, 40);
 */
export const setBoldItalicFont = (doc: jsPDF): void => {
  doc.setFont(FONTS.BOLD_ITALIC.name, FONTS.BOLD_ITALIC.style);
};

/**
 * Helper function linh hoạt để set font dựa vào weight
 * 
 * @param doc - jsPDF instance
 * @param weight - Loại font cần set
 * 
 * @example
 * setFont(doc, 'bold');
 * doc.text('Tiêu đề', 20, 20);
 * 
 * setFont(doc, 'regular');
 * doc.text('Nội dung', 20, 30);
 */
export const setFont = (
  doc: jsPDF, 
  weight: 'regular' | 'bold' | 'italic' | 'bolditalic' = 'regular'
): void => {
  switch (weight) {
    case 'bold':
      setBoldFont(doc);
      break;
    case 'italic':
      setItalicFont(doc);
      break;
    case 'bolditalic':
      setBoldItalicFont(doc);
      break;
    default:
      setRegularFont(doc);
  }
};