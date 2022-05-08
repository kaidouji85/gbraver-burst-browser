// @flow

/**
 * HTML特殊文字をエスケープする
 * 
 * @param origin エスケープ前 
 * @return エスケープ結果
 */
export function escapeHTML(origin: string): string {
  return origin
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");
}