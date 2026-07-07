import mammoth from 'mammoth';
import { sanitizeHtml } from './sanitize';

/** .docx -> 安全 HTML（浏览器内解析，无需后端）。 */
export async function docxToHtml(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const { value } = await mammoth.convertToHtml({ arrayBuffer });
  return sanitizeHtml(value);
}
